#!/usr/bin/env python3
"""
Automatically fetches ISBNs and book cover images for entries in
`content/bookshelf/books.toml`, saving images locally to `static/images/books/`
so the static site loads them instantly with zero external requests.

Usage:
  python3 scripts/fetch_covers.py
  python3 scripts/fetch_covers.py --book "Animal Farm" --alternatives
  python3 scripts/fetch_covers.py --book "Animal Farm" --isbn 9780451526342
"""

from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
import re
import sys
import tomllib
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
BOOKS_TOML = ROOT_DIR / "content" / "bookshelf" / "books.toml"
COVERS_DIR = ROOT_DIR / "static" / "images" / "books"
USER_AGENT = "FlorinPortfolioBookFetcher/1.0 (https://florinsalasan.dev)"


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug or "book"


def http_get_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=12) as resp:
        return json.loads(resp.read().decode("utf-8"))


def download_image(url: str, dest: Path) -> bool:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = resp.read()
            # Open Library returns a 1x1 transparent GIF (< 1000 bytes) when a cover is missing
            if len(data) < 1000:
                return False
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
            return True
    except (urllib.error.URLError, TimeoutError):
        return False


def pick_best_isbn(isbn_list: list[str]) -> str:
    if not isbn_list:
        return ""
    for prefix in ("9780", "9781", "978"):
        for code in isbn_list:
            clean = re.sub(r"[^0-9X]", "", code.upper())
            if len(clean) == 13 and clean.startswith(prefix):
                return clean
    for code in isbn_list:
        clean = re.sub(r"[^0-9X]", "", code.upper())
        if len(clean) in (10, 13):
            return clean
    return isbn_list[0]


def search_openlibrary(title: str, author: str) -> list[dict]:
    """
    Queries Open Library and returns ranked candidate dicts with
    {'title', 'author', 'isbn', 'cover_id', 'cover_url', 'fallback_cover_url', 'year'}.
    """
    params = urllib.parse.urlencode(
        {
            "title": title,
            "author": author.split("&")[0].strip(),
            "limit": 8,
            "fields": "title,author_name,isbn,cover_i,first_publish_year,language,edition_count",
        }
    )
    url = f"https://openlibrary.org/search.json?{params}"
    try:
        data = http_get_json(url)
    except Exception as exc:
        print(f"  [!] Open Library search failed for '{title}': {exc}", file=sys.stderr)
        return []

    candidates = []
    norm_title = re.sub(r"[^a-z0-9]", "", title.lower())
    for doc in data.get("docs", []):
        cover_id = doc.get("cover_i")
        isbns = doc.get("isbn", [])
        best_isbn = pick_best_isbn(isbns)
        if not cover_id and not best_isbn:
            continue

        doc_title = doc.get("title", "")
        norm_doc_title = re.sub(r"[^a-z0-9]", "", doc_title.lower())
        exact_title = norm_doc_title == norm_title or norm_doc_title.startswith(norm_title)
        langs = doc.get("language", [])
        has_eng = ("eng" in langs) or not langs
        editions = doc.get("edition_count", 0)

        score = (
            (100 if cover_id else 0)
            + (50 if exact_title else 0)
            + (25 if has_eng else 0)
            + min(editions, 50)
        )

        id_cover_url = (
            f"https://covers.openlibrary.org/b/id/{cover_id}-L.jpg"
            if cover_id
            else ""
        )
        isbn_cover_url = (
            f"https://covers.openlibrary.org/b/isbn/{best_isbn}-L.jpg"
            if best_isbn
            else ""
        )
        candidates.append(
            {
                "score": score,
                "title": doc_title,
                "author": ", ".join(doc.get("author_name", [])[:2]),
                "isbn": best_isbn,
                "cover_id": cover_id,
                "cover_url": id_cover_url or isbn_cover_url,
                "fallback_cover_url": isbn_cover_url if id_cover_url else "",
                "year": doc.get("first_publish_year", ""),
            }
        )

    candidates.sort(key=lambda c: c["score"], reverse=True)
    return candidates


def update_toml_block(raw_toml: str, title: str, isbn: str, cover_path: str) -> str:
    """
    Updates or inserts `isbn` and `cover` inside the matching `[[books]]` block
    while preserving all comments, ordering, and multiline strings.
    """
    blocks = re.split(r"(?=^\[\[books\]\])", raw_toml, flags=re.MULTILINE)
    updated_blocks = []

    title_pattern = re.compile(
        r'^title\s*=\s*"' + re.escape(title) + r'"', flags=re.MULTILINE
    )

    for block in blocks:
        if not block.startswith("[[books]]") or not title_pattern.search(block):
            updated_blocks.append(block)
            continue

        if isbn:
            if re.search(r"^isbn\s*=", block, flags=re.MULTILINE):
                block = re.sub(
                    r'^isbn\s*=\s*"[^"]*"',
                    f'isbn = "{isbn}"',
                    block,
                    count=1,
                    flags=re.MULTILINE,
                )
            else:
                if re.search(r"^cover\s*=", block, flags=re.MULTILINE):
                    block = re.sub(
                        r"^(cover\s*=)",
                        f'isbn = "{isbn}"\n\\1',
                        block,
                        count=1,
                        flags=re.MULTILINE,
                    )
                else:
                    block = re.sub(
                        r'^(author\s*=\s*"[^"]*"\n)',
                        f'\\1isbn = "{isbn}"\n',
                        block,
                        count=1,
                        flags=re.MULTILINE,
                    )

        if cover_path:
            if re.search(r"^cover\s*=", block, flags=re.MULTILINE):
                block = re.sub(
                    r'^cover\s*=\s*"[^"]*"',
                    f'cover = "{cover_path}"',
                    block,
                    count=1,
                    flags=re.MULTILINE,
                )
            else:
                block = re.sub(
                    r'^(author\s*=\s*"[^"]*"\n)',
                    f'\\1cover = "{cover_path}"\n',
                    block,
                    count=1,
                    flags=re.MULTILINE,
                )

        updated_blocks.append(block)

    return "".join(updated_blocks)


def process_one_book(
    book: dict, force: bool, override_isbn: str | None
) -> tuple[str, str, str] | None:
    title = book.get("title", "").strip()
    author = book.get("author", "").strip()
    existing_isbn = book.get("isbn", "").strip()
    existing_cover = book.get("cover", "").strip()

    slug = slugify(title)
    local_rel_path = f"/images/books/{slug}.jpg"
    local_abs_path = COVERS_DIR / f"{slug}.jpg"

    if existing_cover.startswith(("http://", "https://")) and not override_isbn:
        if download_image(existing_cover, local_abs_path):
            print(f"[+] Downloaded custom cover URL for '{title}' -> {local_rel_path}")
            return (title, existing_isbn, local_rel_path)
        return None

    if (
        not force
        and not override_isbn
        and existing_cover == local_rel_path
        and local_abs_path.exists()
        and existing_isbn
    ):
        return None

    target_isbn = override_isbn or existing_isbn
    downloaded = local_abs_path.exists() and not force and not override_isbn

    if target_isbn and (override_isbn or not downloaded):
        isbn_cover_url = f"https://covers.openlibrary.org/b/isbn/{target_isbn}-L.jpg?default=false"
        if download_image(isbn_cover_url, local_abs_path):
            downloaded = True
            print(f"[+] '{title}': downloaded cover via ISBN {target_isbn}")

    if not downloaded or not target_isbn:
        candidates = search_openlibrary(title, author)
        for cand in candidates:
            if not target_isbn and cand["isbn"]:
                target_isbn = cand["isbn"]
            if not downloaded and cand["cover_url"]:
                if download_image(cand["cover_url"] + "?default=false", local_abs_path):
                    downloaded = True
                    print(
                        f"[+] '{title}': downloaded cover (ISBN: {target_isbn or 'N/A'}) -> {local_rel_path}"
                    )
                    break
                if cand.get("fallback_cover_url") and download_image(
                    cand["fallback_cover_url"] + "?default=false", local_abs_path
                ):
                    downloaded = True
                    print(
                        f"[+] '{title}': downloaded fallback cover (ISBN: {target_isbn or 'N/A'}) -> {local_rel_path}"
                    )
                    break

    final_cover = local_rel_path if (downloaded or local_abs_path.exists()) else existing_cover
    if target_isbn != existing_isbn or final_cover != existing_cover:
        return (title, target_isbn, final_cover)
    return None


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Auto-fetch ISBNs and download local cover images for books.toml"
    )
    parser.add_argument(
        "--book",
        help="Target a single book by title (case-insensitive substring match)",
    )
    parser.add_argument(
        "--isbn",
        help="Override and download cover for a specific ISBN (use with --book)",
    )
    parser.add_argument(
        "--alternatives",
        action="store_true",
        help="List candidate editions/covers found on Open Library without modifying files",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Re-fetch covers even if a local cover already exists",
    )
    args = parser.parse_args()

    if not BOOKS_TOML.exists():
        print(f"Error: {BOOKS_TOML} not found.", file=sys.stderr)
        return 1

    raw_toml = BOOKS_TOML.read_text(encoding="utf-8")
    parsed = tomllib.loads(raw_toml)
    books = parsed.get("books", [])

    target_books = [
        b
        for b in books
        if not args.book or args.book.lower() in b.get("title", "").lower()
    ]

    if args.alternatives:
        for book in target_books:
            title = book.get("title", "").strip()
            author = book.get("author", "").strip()
            print(f"\nCandidates for '{title}' by {author}:")
            candidates = search_openlibrary(title, author)
            for idx, c in enumerate(candidates[:6], start=1):
                print(
                    f"  {idx}. {c['title']} ({c['year']}) — ISBN: {c['isbn'] or 'N/A'} "
                    f"| Cover: {c['cover_url']}"
                )
        return 0

    modified = False
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [
            pool.submit(process_one_book, book, args.force, args.isbn)
            for book in target_books
        ]
        for fut in as_completed(futures):
            res = fut.result()
            if res:
                title, isbn, cover_path = res
                raw_toml = update_toml_block(raw_toml, title, isbn, cover_path)
                modified = True

    if modified:
        BOOKS_TOML.write_text(raw_toml, encoding="utf-8")
        print("\n[✓] Updated content/bookshelf/books.toml")
    else:
        print("\n[✓] All book covers and ISBNs are up to date.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
