/* ==========================================================================
   Florin Salasan — Interactive Behaviors (Vanilla JS, Zero Dependencies)
   1. Theme Toggle + System Preference Detection
   2. Scroll-to-Top (CN Tower SVG & Mobile Button)
   3. Global Search Modal (Blog, Projects, Bookshelf)
   4. Projects Filtering & Sorting
   5. Bookshelf Filtering
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Theme Management
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function getEffectiveTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return darkMediaQuery.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      const sunIcon = themeToggleBtn.querySelector('.icon-sun');
      const moonIcon = themeToggleBtn.querySelector('.icon-moon');
      const label = themeToggleBtn.querySelector('.theme-label');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = theme === 'dark' ? 'inline-block' : 'none';
        moonIcon.style.display = theme === 'dark' ? 'none' : 'inline-block';
      }
      if (label) {
        label.textContent = theme === 'dark' ? 'Light' : 'Dark';
      }
    }
  }

  applyTheme(getEffectiveTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') || getEffectiveTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  darkMediaQuery.addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* ------------------------------------------------------------------------
     2. Scroll to Top (CN Tower & Mobile Button)
     ------------------------------------------------------------------------ */
  const scrollTopButtons = document.querySelectorAll('[data-scroll-top]');
  scrollTopButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* ------------------------------------------------------------------------
     3. Global Search Modal (Posts, Projects, Bookshelf)
     ------------------------------------------------------------------------ */
  const searchOpenBtn = document.getElementById('search-open');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchCloseBtn = document.getElementById('search-close');

  const searchDataEl = document.getElementById('site-search-data');
  let searchItems = [];
  if (searchDataEl) {
    try {
      searchItems = JSON.parse(searchDataEl.textContent);
    } catch (err) {
      console.error('Failed to parse search data:', err);
    }
  }

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('open');
    if (searchInput) {
      searchInput.value = '';
      renderSearchResults('');
      setTimeout(function () {
        searchInput.focus();
      }, 20);
    }
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  //Bounded Levenshtein distance for typo tolerance on words
  function editDistance(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 99;
    const dp = Array.from({ length: a.length + 1 }, function (_, i) {
      return i;
    });
    for (let j = 1; j <= b.length; j++) {
      let prev = dp[0];
      dp[0] = j;
      for (let i = 1; i <= a.length; i++) {
        const temp = dp[i];
        if (a[i - 1] === b[j - 1]) {
          dp[i] = prev;
        } else {
          dp[i] = 1 + Math.min(prev, dp[i], dp[i - 1]);
        }
        prev = temp;
      }
    }
    return dp[a.length];
  }

  // Fuzzy subsequence + word-boundary + typo-tolerant scorer (fzf-inspired)
  function fuzzyScoreField(pattern, text) {
    if (!pattern || !text) return 0;
    const p = pattern.toLowerCase();
    const t = text.toLowerCase();

    // 1. Exact substring match gets top priority
    const exactIdx = t.indexOf(p);
    if (exactIdx !== -1) {
      return 100 + (exactIdx === 0 ? 40 : Math.max(0, 25 - exactIdx));
    }

    // 2. Subsequence match (e.g. "wkout" -> "workout", "snipclip" -> "snip to clipboard")
    let pIdx = 0;
    let score = 0;
    let consecutive = 0;
    let firstMatchIdx = -1;

    for (let tIdx = 0; tIdx < t.length && pIdx < p.length; tIdx++) {
      if (t[tIdx] === p[pIdx]) {
        if (firstMatchIdx === -1) firstMatchIdx = tIdx;
        // Bonus for word boundary match
        const isBoundary = tIdx === 0 || /[\s\-_/.]/.test(t[tIdx - 1]);
        consecutive++;
        score += 10 + consecutive * 6 + (isBoundary ? 12 : 0);
        pIdx++;
      } else {
        consecutive = 0;
      }
    }

    if (pIdx === p.length) {
      // Penalize overly spread-out matches slightly
      const spreadPenalty = Math.min(25, Math.floor((t.length - p.length) * 0.2));
      return Math.max(15, score - spreadPenalty);
    }

    // 3. Typo tolerance on individual words (1 edit for >=4 chars, 2 edits for >=7 chars)
    if (p.length >= 4) {
      const words = t.split(/[\s\-_,.;:!?()[\]/]+/);
      const maxDist = p.length >= 7 ? 2 : 1;
      for (let i = 0; i < words.length; i++) {
        const w = words[i];
        if (!w) continue;
        const prefix = w.slice(0, p.length);
        const dist = Math.min(editDistance(p, w), editDistance(p, prefix));
        if (dist <= maxDist) {
          return 35 - dist * 10;
        }
      }
    }

    return 0;
  }

  function scoreSearchItem(query, item) {
    const tokens = query
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    if (tokens.length === 0) return 1;

    const title = item.title || '';
    const tags = (item.tags || []).join(' ');
    const category = item.category || '';
    const desc = item.description || '';
    const content = item.content || '';

    let totalScore = 0;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const titleScore = fuzzyScoreField(token, title) * 3.0;
      const tagScore = fuzzyScoreField(token, tags) * 2.2;
      const catScore = fuzzyScoreField(token, category) * 1.5;
      const descScore = fuzzyScoreField(token, desc) * 1.4;
      const contentScore = fuzzyScoreField(token, content) * 0.8;

      const bestTokenScore = Math.max(titleScore, tagScore, catScore, descScore, contentScore);
      if (bestTokenScore <= 0) {
        return 0; // All query tokens must fuzzy-match at least one field
      }
      totalScore += bestTokenScore;
    }

    return totalScore;
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    const q = (query || '').trim();

    let results;
    if (!q) {
      results = searchItems.slice(0, 8);
    } else {
      results = searchItems
        .map(function (item) {
          return { item: item, score: scoreSearchItem(q, item) };
        })
        .filter(function (entry) {
          return entry.score > 0;
        })
        .sort(function (a, b) {
          return b.score - a.score;
        })
        .map(function (entry) {
          return entry.item;
        });
    }

    if (results.length === 0) {
      searchResults.innerHTML =
        '<div class="search-empty">No matching posts, projects, or books found.</div>';
      return;
    }

    searchResults.innerHTML = results
      .map(function (item) {
        return (
          '<a class="search-result-item" href="' +
          escapeHtml(item.url) +
          '">' +
          '<div class="search-result-type">' +
          escapeHtml(item.category) +
          (item.meta ? ' · ' + escapeHtml(item.meta) : '') +
          '</div>' +
          '<div class="search-result-title">' +
          escapeHtml(item.title) +
          '</div>' +
          (item.description
            ? '<div class="search-result-desc">' + escapeHtml(item.description) + '</div>'
            : '') +
          '</a>'
        );
      })
      .join('');
  }

  if (searchOpenBtn) {
    searchOpenBtn.addEventListener('click', openSearch);
  }
  if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', closeSearch);
  }
  if (searchOverlay) {
    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      renderSearchResults(e.target.value);
    });
  }

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchOverlay && searchOverlay.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
    } else if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('open')) {
      closeSearch();
    }
  });

  /* ------------------------------------------------------------------------
     4. Projects Page Filtering & Sorting
     ------------------------------------------------------------------------ */
  const projectsGrid = document.getElementById('projects-grid');
  const projectFilterBtns = document.querySelectorAll('[data-project-filter]');
  const projectSortSelect = document.getElementById('project-sort');

  if (projectsGrid) {
    let activeTech = 'all';

    function updateProjectsView() {
      const cards = Array.from(projectsGrid.querySelectorAll('.project-card'));

      // Filter
      cards.forEach(function (card) {
        const techs = (card.getAttribute('data-tech') || '').toLowerCase().split(',');
        const matches = activeTech === 'all' || techs.includes(activeTech.toLowerCase());
        card.style.display = matches ? 'flex' : 'none';
      });

      // Sort
      if (projectSortSelect) {
        const sortDir = projectSortSelect.value;
        cards.sort(function (a, b) {
          const dateA = a.getAttribute('data-date') || '';
          const dateB = b.getAttribute('data-date') || '';
          return sortDir === 'oldest'
            ? dateA.localeCompare(dateB)
            : dateB.localeCompare(dateA);
        });
        cards.forEach(function (card) {
          projectsGrid.appendChild(card);
        });
      }
    }

    projectFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        projectFilterBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        activeTech = btn.getAttribute('data-project-filter') || 'all';
        updateProjectsView();
      });
    });

    if (projectSortSelect) {
      projectSortSelect.addEventListener('change', updateProjectsView);
    }
  }

  /* ------------------------------------------------------------------------
     5. Blog Page Multi-Select Tag Filtering
     ------------------------------------------------------------------------ */
  const blogList = document.getElementById('blog-list');
  const blogFilterBtns = document.querySelectorAll('[data-blog-filter]');
  const blogFilterClear = document.getElementById('blog-filter-clear');

  if (blogList && blogFilterBtns.length > 0) {
    const selectedBlogTags = new Set();
    const allBlogBtn = document.querySelector('[data-blog-filter="all"]');

    function updateBlogView() {
      const hasTags = selectedBlogTags.size > 0;
      if (allBlogBtn) {
        allBlogBtn.classList.toggle('active', !hasTags);
      }
      if (blogFilterClear) {
        blogFilterClear.style.display = hasTags ? 'inline-flex' : 'none';
      }
      blogFilterBtns.forEach(function (btn) {
        const tag = (btn.getAttribute('data-blog-filter') || '').toLowerCase();
        if (tag && tag !== 'all') {
          btn.classList.toggle('active', selectedBlogTags.has(tag));
        }
      });

      const items = blogList.querySelectorAll('.blog-item');
      items.forEach(function (item) {
        if (!hasTags) {
          item.style.display = 'flex';
          return;
        }
        const itemTags = (item.getAttribute('data-tags') || '')
          .toLowerCase()
          .split(',')
          .map(function (t) {
            return t.trim();
          })
          .filter(Boolean);
        const matches = Array.from(selectedBlogTags).some(function (t) {
          return itemTags.includes(t);
        });
        item.style.display = matches ? 'flex' : 'none';
      });
    }

    blogFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const tag = (btn.getAttribute('data-blog-filter') || 'all').toLowerCase();
        if (tag === 'all') {
          selectedBlogTags.clear();
        } else if (selectedBlogTags.has(tag)) {
          selectedBlogTags.delete(tag);
        } else {
          selectedBlogTags.add(tag);
        }
        updateBlogView();
      });
    });

    if (blogFilterClear) {
      blogFilterClear.addEventListener('click', function () {
        selectedBlogTags.clear();
        updateBlogView();
      });
    }
  }

  /* ------------------------------------------------------------------------
     6. Bookshelf Filtering & Sorting (Status + Multi-Tag Popover + Search + Sort)
     ------------------------------------------------------------------------ */
  const booksGrid = document.getElementById('books-grid');
  const bookFilterBtns = document.querySelectorAll('[data-book-status]');
  const bookSearchInput = document.getElementById('book-filter-input');
  const bookSortSelect = document.getElementById('book-sort');
  const bookTagDropdown = document.getElementById('book-tag-dropdown');
  const bookTagToggle = document.getElementById('book-tag-toggle');
  const bookTagToggleLabel = document.getElementById('book-tag-toggle-label');
  const bookTagPillsContainer = document.getElementById('book-tag-pills');
  const bookTagClearBtn = document.getElementById('book-tag-clear');
  const bookTagClearInline = document.getElementById('book-tag-clear-inline');

  if (booksGrid) {
    let activeStatus = 'all';
    let bookQuery = '';
    const selectedBookTags = new Set();

    function parseReadDate(str) {
      if (!str) return null;
      const s = str.trim();
      if (!s) return null;
      if (/^\d{4}$/.test(s)) {
        return new Date(parseInt(s, 10), 0, 1).getTime();
      }
      const ymMatch = s.match(/^(\d{4})[-/](\d{1,2})$/);
      if (ymMatch) {
        return new Date(parseInt(ymMatch[1], 10), parseInt(ymMatch[2], 10) - 1, 1).getTime();
      }
      const myMatch = s.match(/^(\d{1,2})[-/](\d{4})$/);
      if (myMatch) {
        return new Date(parseInt(myMatch[2], 10), parseInt(myMatch[1], 10) - 1, 1).getTime();
      }
      const isoMatch = s.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
      if (isoMatch) {
        return new Date(parseInt(isoMatch[1], 10), parseInt(isoMatch[2], 10) - 1, parseInt(isoMatch[3], 10)).getTime();
      }
      const parsed = Date.parse(s);
      if (!isNaN(parsed)) {
        return parsed;
      }
      const wordYearMatch = s.match(/^([a-zA-Z]+)[,\s]+(\d{4})$/);
      if (wordYearMatch) {
        const p = Date.parse(wordYearMatch[1] + ' 1, ' + wordYearMatch[2]);
        if (!isNaN(p)) return p;
      }
      return null;
    }

    function syncBookTagUI() {
      const count = selectedBookTags.size;
      const hasTags = count > 0;

      if (bookTagToggleLabel) {
        bookTagToggleLabel.textContent = hasTags
          ? count === 1
            ? '1 Tag Selected'
            : count + ' Tags Selected'
          : 'All Tags';
      }
      if (bookTagToggle) {
        bookTagToggle.classList.toggle('has-active', hasTags);
      }
      if (bookTagClearBtn) {
        bookTagClearBtn.style.display = hasTags ? 'inline-block' : 'none';
      }
      if (bookTagClearInline) {
        bookTagClearInline.style.display = hasTags ? 'inline-flex' : 'none';
      }
      if (bookTagPillsContainer) {
        const pills = bookTagPillsContainer.querySelectorAll('[data-book-tag]');
        pills.forEach(function (pill) {
          const t = (pill.getAttribute('data-book-tag') || '').toLowerCase();
          if (t === 'all') {
            pill.classList.toggle('active', !hasTags);
          } else {
            pill.classList.toggle('active', selectedBookTags.has(t));
          }
        });
      }
    }

    function updateBooksView() {
      const cards = Array.from(booksGrid.querySelectorAll('.book-card'));
      const hasTags = selectedBookTags.size > 0;
      syncBookTagUI();

      // Filter by shelf status, multi-select tags, and search input
      cards.forEach(function (card) {
        const status = (card.getAttribute('data-status') || '').toLowerCase();
        const text = (card.getAttribute('data-search') || '').toLowerCase();
        const cardTags = (card.getAttribute('data-tags') || '')
          .toLowerCase()
          .split(',')
          .map(function (t) {
            return t.trim();
          })
          .filter(Boolean);

        const statusMatch = activeStatus === 'all' || status === activeStatus;
        const tagMatch =
          !hasTags ||
          Array.from(selectedBookTags).some(function (t) {
            return cardTags.includes(t);
          });
        let queryMatch = true;
        if (bookQuery) {
          const tokens = bookQuery.split(/\s+/).filter(Boolean);
          queryMatch = tokens.every(function (t) {
            return fuzzyScoreField(t, text) > 0;
          });
        }
        card.style.display = statusMatch && tagMatch && queryMatch ? 'flex' : 'none';
      });

      // Sort
      if (bookSortSelect) {
        const sortVal = bookSortSelect.value;
        cards.sort(function (a, b) {
          if (sortVal === 'title-asc') {
            const titleA = a.getAttribute('data-title') || '';
            const titleB = b.getAttribute('data-title') || '';
            return titleA.localeCompare(titleB, undefined, { sensitivity: 'base' });
          }
          if (sortVal === 'title-desc') {
            const titleA = a.getAttribute('data-title') || '';
            const titleB = b.getAttribute('data-title') || '';
            return titleB.localeCompare(titleA, undefined, { sensitivity: 'base' });
          }
          if (sortVal === 'rating-desc' || sortVal === 'rating-asc') {
            const ratingA = parseInt(a.getAttribute('data-rating') || '0', 10);
            const ratingB = parseInt(b.getAttribute('data-rating') || '0', 10);
            // Always place rated books (> 0) above unrated books (0)
            if (ratingA > 0 && ratingB === 0) return -1;
            if (ratingB > 0 && ratingA === 0) return 1;
            if (ratingA > 0 && ratingB > 0 && ratingA !== ratingB) {
              return sortVal === 'rating-desc' ? ratingB - ratingA : ratingA - ratingB;
            }
          }
          if (sortVal === 'last-read' || sortVal === 'first-read') {
            const dateA = parseReadDate(a.getAttribute('data-date-read'));
            const dateB = parseReadDate(b.getAttribute('data-date-read'));
            if (dateA !== null && dateB !== null) {
              const diff = sortVal === 'last-read' ? dateB - dateA : dateA - dateB;
              if (diff !== 0) return diff;
              const orderA = parseInt(a.getAttribute('data-default-order') || '0', 10);
              const orderB = parseInt(b.getAttribute('data-default-order') || '0', 10);
              return orderA - orderB;
            }
            if (dateA !== null) return -1;
            if (dateB !== null) return 1;
            // Both missing a read date: fall back to default order
          }
          // Default / Custom file order as defined in books.toml
          const orderA = parseInt(a.getAttribute('data-default-order') || '0', 10);
          const orderB = parseInt(b.getAttribute('data-default-order') || '0', 10);
          return orderA - orderB;
        });

        cards.forEach(function (card) {
          booksGrid.appendChild(card);
        });
      }
    }

    bookFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        bookFilterBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        activeStatus = (btn.getAttribute('data-book-status') || 'all').toLowerCase();
        updateBooksView();
      });
    });

    // Populate tag pills inside the Bookshelf tag popover
    if (bookTagPillsContainer) {
      const tagMap = new Map();
      booksGrid.querySelectorAll('.book-card').forEach(function (card) {
        const raw = card.getAttribute('data-tags') || '';
        raw.split(',').forEach(function (t) {
          const clean = t.trim();
          if (clean && !tagMap.has(clean.toLowerCase())) {
            tagMap.set(clean.toLowerCase(), clean);
          }
        });
      });
      Array.from(tagMap.keys())
        .sort()
        .forEach(function (key) {
          const pill = document.createElement('button');
          pill.type = 'button';
          pill.className = 'filter-pill';
          pill.setAttribute('data-book-tag', key);
          pill.textContent = '#' + tagMap.get(key);
          bookTagPillsContainer.appendChild(pill);
        });

      bookTagPillsContainer.addEventListener('click', function (e) {
        const pill = e.target.closest('[data-book-tag]');
        if (!pill) return;
        const tag = (pill.getAttribute('data-book-tag') || 'all').toLowerCase();
        if (tag === 'all') {
          selectedBookTags.clear();
        } else if (selectedBookTags.has(tag)) {
          selectedBookTags.delete(tag);
        } else {
          selectedBookTags.add(tag);
        }
        updateBooksView();
      });
    }

    if (bookTagToggle && bookTagDropdown) {
      bookTagToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = bookTagDropdown.classList.toggle('open');
        bookTagToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      document.addEventListener('click', function (e) {
        if (!bookTagDropdown.contains(e.target)) {
          bookTagDropdown.classList.remove('open');
          bookTagToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    function clearBookTags() {
      selectedBookTags.clear();
      updateBooksView();
    }

    if (bookTagClearBtn) {
      bookTagClearBtn.addEventListener('click', clearBookTags);
    }
    if (bookTagClearInline) {
      bookTagClearInline.addEventListener('click', clearBookTags);
    }

    if (bookSortSelect) {
      bookSortSelect.addEventListener('change', updateBooksView);
    }

    if (bookSearchInput) {
      bookSearchInput.addEventListener('input', function (e) {
        bookQuery = (e.target.value || '').trim().toLowerCase();
        updateBooksView();
      });
    }

    // Apply initial sort & filter on page load (defaults to Last Read / Newest)
    updateBooksView();

    /* ----------------------------------------------------------------------
       7. Book Review & Notes Modal Popup
       ---------------------------------------------------------------------- */
    const reviewOverlay = document.getElementById('book-review-overlay');
    const reviewCloseBtn = document.getElementById('review-modal-close');
    const modalCover = document.getElementById('review-modal-cover');
    const modalTitle = document.getElementById('review-modal-title');
    const modalAuthor = document.getElementById('review-modal-author');
    const modalRating = document.getElementById('review-modal-rating');
    const modalBadges = document.getElementById('review-modal-badges');
    const modalBody = document.getElementById('review-modal-body');
    const modalFooter = document.getElementById('review-modal-footer');

    function closeReviewModal() {
      if (!reviewOverlay) return;
      reviewOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    function openReviewModal(card) {
      if (!reviewOverlay) return;
      const coverEl = card.querySelector('.book-cover');
      const titleEl = card.querySelector('.book-title');
      const authorEl = card.querySelector('.book-author');
      const ratingEl = card.querySelector('.book-rating');
      const badgesEl = card.querySelector('.book-meta-row');
      const tplEl = card.querySelector('.book-review-template');
      const rawTags = (card.getAttribute('data-tags') || '')
        .split(',')
        .map(function (t) {
          return t.trim();
        })
        .filter(Boolean);

      if (modalCover && coverEl) {
        modalCover.innerHTML = coverEl.innerHTML;
      }
      if (modalTitle && titleEl) {
        modalTitle.textContent = titleEl.textContent;
      }
      if (modalAuthor && authorEl) {
        modalAuthor.textContent = authorEl.textContent;
      }
      if (modalRating) {
        if (ratingEl) {
          modalRating.textContent = ratingEl.textContent;
          modalRating.style.display = 'block';
        } else {
          modalRating.style.display = 'none';
        }
      }
      if (modalBadges && badgesEl) {
        modalBadges.innerHTML = badgesEl.innerHTML;
      }
      if (modalBody && tplEl) {
        modalBody.innerHTML = tplEl.innerHTML;
        modalBody.scrollTop = 0;
      }
      if (modalFooter) {
        modalFooter.innerHTML = '';
        if (rawTags.length > 0) {
          const label = document.createElement('span');
          label.className = 'filter-label';
          label.textContent = 'Tags:';
          modalFooter.appendChild(label);

          rawTags.forEach(function (t) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'filter-pill';
            btn.textContent = '#' + t;
            btn.setAttribute('data-modal-tag', t.toLowerCase());
            if (selectedBookTags.has(t.toLowerCase())) {
              btn.classList.add('active');
            }
            modalFooter.appendChild(btn);
          });
          modalFooter.style.display = 'flex';
        } else {
          modalFooter.style.display = 'none';
        }
      }

      reviewOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    if (modalFooter) {
      modalFooter.addEventListener('click', function (e) {
        const tagBtn = e.target.closest('[data-modal-tag]');
        if (!tagBtn) return;
        const selectedTag = tagBtn.getAttribute('data-modal-tag');
        selectedBookTags.add(selectedTag);
        updateBooksView();
        closeReviewModal();
      });
    }

    booksGrid.addEventListener('click', function (e) {
      const btn = e.target.closest('.book-review-btn');
      if (!btn) return;
      const card = btn.closest('.book-card');
      if (card) {
        openReviewModal(card);
      }
    });

    if (reviewCloseBtn) {
      reviewCloseBtn.addEventListener('click', closeReviewModal);
    }

    if (reviewOverlay) {
      reviewOverlay.addEventListener('click', function (e) {
        if (e.target === reviewOverlay) {
          closeReviewModal();
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (reviewOverlay && reviewOverlay.classList.contains('open')) {
          closeReviewModal();
        }
        if (bookTagDropdown && bookTagDropdown.classList.contains('open')) {
          bookTagDropdown.classList.remove('open');
          if (bookTagToggle) bookTagToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }
})();
