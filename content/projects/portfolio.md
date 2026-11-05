+++
title = "Personal Portfolio & Chronicle"
date = 2024-08-20
description = "This site! Originally prototyped with Next.js and TypeScript, now rebuilt from the ground up with Zola, Tera templates, and vanilla CSS."

[taxonomies]
technologies = ["Zola", "Rust", "HTML/CSS", "Markdown"]

[extra]
status = "Completed"
git_link = "https://github.com/florinsalasan/another-portfolio"
live_link = "https://florinsalasan.dev"
cover_image = "/images/low-res-portfolio.jpg"
gallery = [
  { src = "/images/low-res-portfolio.jpg", caption = "Earlier version of the portfolio layout" }
]
+++

## My Personal Portfolio Site

### Moving from TypeScript/Next.js to Zola

Originally, this portfolio was built with Next.js, Tailwind CSS, and TypeScript. While that stack worked as a starting point, I realized I did not enjoy writing or reading TypeScript and verbose JSX for what is fundamentally a personal publication, project showcase, and reading log.

Rebuilding the site with **[Zola](https://www.getzola.org/)** (a fast, single-binary Rust static site generator) brought the joy back to maintaining my personal corner of the web:
- **Zero TypeScript or Node runtime:** Pure Markdown content, clean Tera templates, and modern semantic CSS variables.
- **Editorial aesthetic:** Designed around warm paper tones in light mode and deep espresso in dark mode, with automatic system preference detection.
- **Interactive CN Tower:** Preserved the clickable Toronto CN Tower illustration on the right margin to smoothly scroll back to the top of any page.
- **Built-in Search & Filtering:** Instant filtering across projects, blog tags, and my personal [Bookshelf](/bookshelf/).

### Background on the Original Version

When I first built the site, I looked through sites showcased on [t3.gg](https://create.t3.gg/en/t3-collection) and found [Josh's personal site](https://imjosh.dev) to use as inspiration. From there, I added a Projects showcase, tag filtering, a Bookshelf section, and project detail pages with screenshot galleries.
