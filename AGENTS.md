# AGENTS.md

## Repository purpose

This repository is the source-only Hugo project for `sunlongyu.github.io`.

## Source of truth

- Hugo source lives under `site-src/`
- Project docs live under `docs/`
- Helper scripts live under `scripts/`

Do not treat repository-root HTML, CSS, or generated assets as editable source. Generated output belongs in `_site/` and should stay uncommitted.

## Most common edit paths

- Site config: `site-src/hugo.toml`
- Blog posts: `site-src/content/blogs/`
- Plogs pages: `site-src/content/plogs/`
- Music page: `site-src/content/music/index.md`
- Vlogs page: `site-src/content/vlogs/index.md`
- Static assets: `site-src/static/`
- Custom templates: `site-src/layouts/`
- Theme internals: `site-src/themes/hugo-goa/`

## Build and publish

- Local build: `./scripts/build-site.sh`
- Local preview: `hugo server --source site-src -D`
- Deploy: push to `main`, GitHub Actions builds and deploys Pages

## Project-specific rules

- `Plogs` images use `cover.jpg` only as the card cover; it must not appear again inside the city gallery.
- `HEIC` and `DNG` travel photos should be rendered through the macOS Quick Look pipeline before conversion when direct conversion causes black frames.
- `China` now displays cities directly on the country page, even though static images may still be organized by province folders underneath `site-src/static/images/plogs/china/`.
- Keep onboarding and handoff notes updated in `docs/CURRENT_STATE.md`.
