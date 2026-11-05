# florinsalasan.dev — Personal Portfolio, Chronicle & Bookshelf

Personal portfolio, blog, project showcase, and bookshelf built with **[Zola](https://www.getzola.org/)** — 100% free of TypeScript and Node.js runtime bloat.

## Stack & Features

- **Static Site Generator:** [Zola](https://www.getzola.org/) (Rust single binary, Tera templates)
- **Styling:** Modern vanilla CSS (`static/css/style.css`) with an editorial / newspaper aesthetic and automatic dark/light theme detection (`prefers-color-scheme`) + persistent toggle
- **Interactive CN Tower:** Clickable Toronto CN Tower SVG in the right margin that smoothly scrolls back to the top of any page
- **Global Search (`⌘K` / `Ctrl+K`):** Instant client-side search across blog dispatches, projects, and bookshelf reviews
- **Projects Showcase:** Technology tag filters, newest/oldest sorting, and dedicated project write-ups with screenshot galleries
- **Bookshelf:** Git-backed reading log (`content/bookshelf/books.toml`) with reading status tabs (*Finished*, *Reading*, *Want to Read*), star ratings, and expandable book reviews

---

## Local Development

1. Run the local development server with live reload:
   ```bash
   zola serve
   ```
   Open [http://127.0.0.1:1111](http://127.0.0.1:1111) in your browser.

2. Build the static production site into `public/`:
   ```bash
   zola build
   ```

---

## Adding Content

### 1. Add a Book to the Bookshelf
Edit `content/bookshelf/books.toml` and append a new `[[books]]` entry:
```toml
[[books]]
title = "The Pragmatic Programmer"
author = "Andrew Hunt & David Thomas"
status = "Finished" # "Finished" | "Reading" | "Want to Read"
date_read = "2026"
rating = 5 # 1 to 5
cover = "" # Optional path in /images/... or leave empty for typographic cover
tags = ["software", "craft"]
summary = "Short one-sentence summary shown on the card."
review = """
Your full markdown thoughts, notes, and takeaways go here.
"""
```

### 2. Write a Blog Post
Create a new Markdown file in `content/blog/my-new-post.md`:
```markdown
+++
title = "My New Post"
date = 2026-11-01
description = "A concise summary of the post."

[taxonomies]
tags = ["programming", "rust"]
+++

Write your post in standard Markdown here!
```

### 3. Add or Update a Project
Create a Markdown file in `content/projects/my-project.md`:
```markdown
+++
title = "Project Title"
date = 2026-11-01
description = "Short summary shown on the project card."

[taxonomies]
technologies = ["Rust", "C", "Linux"]

[extra]
status = "In Progress" # "Completed" | "In Progress" | "Planned"
git_link = "https://github.com/florinsalasan/..."
live_link = ""
cover_image = "/images/my-project.jpg"
gallery = [
  { src = "/images/screenshot1.png", caption = "Main interface" }
]
+++

Full project write-up and architecture details go here.
```

---

## Deploying on Cloudflare Pages

Since `florinsalasan.dev` uses Cloudflare as its registrar and DNS provider, deploying on **Cloudflare Pages** is free and takes under two minutes:

1. In the Cloudflare Dashboard, go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git** and select `another-portfolio`.
2. Configure the build settings:
   - **Framework preset:** `Zola` (or `None`)
   - **Build command:** `zola build`
   - **Build output directory:** `public`
   - **Root directory:** `/`
   - **Environment variables:** Add `ZOLA_VERSION` = `0.23.6` (or `0.22.1`)
3. Under **Custom domains**, add `florinsalasan.dev`. Cloudflare will automatically configure the DNS records and SSL certificate.
