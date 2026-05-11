# Project Structure

## Repository model

This repository is source-only.

- Hugo source lives in `site-src/`
- Project documentation lives in `docs/`
- Helper scripts live in `scripts/`
- GitHub Pages deploys from `.github/workflows/pages.yml`
- Pages CMS is configured in `.pages.yml`

Generated output is built into `_site/` and must stay uncommitted.

## Main source paths

- Site config: `site-src/hugo.toml`
- Home intro content: `site-src/content/_index.md`
- Blog posts: `site-src/content/blogs/`
- Plogs pages: `site-src/content/plogs/`
- Music page: `site-src/content/music/index.md`
- Vlogs page: `site-src/content/vlogs/index.md`
- Static assets: `site-src/static/`
- Custom templates: `site-src/layouts/`
- Theme internals: `site-src/themes/hugo-goa/`

## Supporting paths

- Build script: `scripts/build-site.sh`
- New blog helper: `scripts/new-blog.sh`
- Handoff notes: `docs/CURRENT_STATE.md`
- Content rules: `docs/CONTENT_WORKFLOW.md`

## What not to edit casually

- `_site/`: generated build output
- `site-src/themes/hugo-goa/`: edit only when layout or theme behavior really needs to change
- `.github/workflows/pages.yml`: deployment logic
- `.pages.yml`: CMS behavior

## Build and deploy

1. Edit source files under `site-src/`.
2. Preview locally with `hugo server --source site-src -D` if Hugo is installed.
3. Build locally with `./scripts/build-site.sh` if needed.
4. Commit and push to `main`.
5. GitHub Actions builds and deploys Pages.
