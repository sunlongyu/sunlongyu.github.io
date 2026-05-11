# Current State

## Project mode

The repository is now source-only.

- Edit source in `site-src/`
- Build output goes to `_site/`
- GitHub Pages deploys from GitHub Actions
- Generated HTML is not committed

## Core directories

- `site-src/content/blogs/`: blog markdown
- `site-src/content/plogs/`: plogs content tree
- `site-src/content/music/index.md`: music page
- `site-src/content/vlogs/index.md`: vlogs page
- `site-src/static/images/`: site images
- `site-src/layouts/`: custom templates

## Plogs structure

General rule:

- `country -> city -> photos`

Implementation detail:

- most countries follow `site-src/content/plogs/<country>/<city>/`
- `China` still stores image files by province path under `site-src/static/images/plogs/china/...`
- but the `China` page is rendered as a flat city directory on the frontend

## Current plogs regions

- `China`
- `South Korea`
- `Thailand`
- `Malaysia`
- `Singapore`
- `Indonesia`

## Indonesia cities

- `Bali`
- `Nusa Penida`
- `Surabaya`

## Photo processing rule

- ordinary `jpg/png`: compress directly
- `heic/dng`: prefer Quick Look render first, then convert to web `jpg`
- keep `cover.jpg` for the city card
- do not show `cover.jpg` again inside the city gallery

## Current blog state

- live blog source is under `site-src/content/blogs/`
- Waline integration points exist in templates, but `serverURL` is still empty in `site-src/hugo.toml`
- CSDN migration is not fully automated because public article detail pages are anti-bot protected

## Notes for next machine

1. Clone the repository.
2. Work from the repository root.
3. Read `README.md`, `AGENTS.md`, and this file first.
4. Edit only `site-src/` unless you are intentionally updating scripts, docs, or workflows.
