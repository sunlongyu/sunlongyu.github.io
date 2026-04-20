# Project Structure

## What to edit

- Site config: `hugo.toml`
- Blog posts: `content/blogs/`
- Plogs page: `content/plogs/index.md`
- Music page: `content/music/index.md`
- Vlog page: `content/vlogs/index.md`
- Static files: `static/`
- Custom templates: `layouts/`

## What not to touch unless needed

- `themes/hugo-goa/`: theme internals
- `.github/workflows/hugo.yaml`: deployment workflow

## Update steps

1. Edit content.
2. Run `hugo server -D` locally if you want preview.
3. Commit to `main`.
4. Wait for GitHub Actions to deploy.

## Current publishing model

- Single repository: `sunlongyu.github.io`
- Single active branch: `main`
- GitHub Pages is deployed from GitHub Actions
