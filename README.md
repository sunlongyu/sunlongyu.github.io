# sunlongyu.github.io

This repository is a source-only Hugo project for the personal website.

## Layout

- `site-src/`: Hugo source of truth
- `docs/`: maintenance notes, handoff docs, and workflow guidance
- `scripts/`: local helper scripts
- `.github/workflows/pages.yml`: GitHub Pages deployment
- `.pages.yml`: Pages CMS configuration

Everything under the old root-level published site structure has been removed. Generated output is now built into `_site/` and is not committed.

## Daily workflow

### Edit content

- blog posts: `site-src/content/blogs/`
- plogs pages: `site-src/content/plogs/`
- music page: `site-src/content/music/index.md`
- vlogs page: `site-src/content/vlogs/index.md`
- static assets: `site-src/static/`

### Create a new blog post

```bash
./scripts/new-blog.sh "your-post-name"
```

### Build the site locally

```bash
./scripts/build-site.sh
```

This generates a local `_site/` folder at the repository root.

### Preview locally

```bash
hugo server --source site-src -D
```

### Publish

Commit and push to `main`. GitHub Actions builds from `site-src/` and deploys to GitHub Pages.

## Important rules

- Do not manually edit generated HTML.
- Do not commit `_site/` or `public/`.
- Keep project notes in `docs/`, not in `site-src/`.
- For current project status and onboarding, start with `docs/CURRENT_STATE.md`.
