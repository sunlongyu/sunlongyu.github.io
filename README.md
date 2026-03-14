# sunlongyu.github.io

This repository is the only source of truth for the personal website.

## Project structure

- `hugo.toml`: main site config
- `content/plogs/`: Plogs page
- `content/blogs/`: blog posts
- `content/music/`: music page content
- `content/vlogs/`: vlog page content
- `static/`: files copied directly to the final site
- `assets/`: Hugo processed assets
- `layouts/`: custom templates and shortcodes
- `themes/hugo-goa/`: current theme source
- `docs/`: project notes and maintenance docs

## Common tasks

### Add a new blog post

Create a new Markdown file under `content/blogs/`.

### Update profile or site navigation

Edit `hugo.toml`.

### Update images or downloadable files

Put them in `static/`.

Suggested locations:

- article images: `static/images/blogs/`
- social images: `static/images/social/`
- profile image: `assets/images/profile/`

### Update page layout

Edit files in `layouts/` or `themes/hugo-goa/`.

## Publish workflow

1. Edit files in this repository.
2. Preview locally with `hugo server -D`.
3. Commit and push to `main`.
4. GitHub Actions deploys the site automatically.

## Rules

- Do not edit generated HTML manually.
- Do not commit `public/`.
- The old `hugo-main` repository is no longer part of the deployment flow.
- New post naming and content rules are in `docs/CONTENT_WORKFLOW.md`.
