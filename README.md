# sunlongyu.github.io

This repository is now the single source of truth for the personal website.

## What lives here

- `content/`: blog posts and page content
- `static/`: files copied directly to the final site
- `layouts/`: custom Hugo templates and shortcodes
- `themes/hugo-goa/`: the site theme
- `hugo.toml`: site configuration

## Update workflow

1. Edit content or site files in this repository.
2. Preview locally with `hugo server -D`.
3. Commit and push to `main`.
4. GitHub Actions builds the site and deploys it to GitHub Pages automatically.

## Important notes

- Do not edit generated HTML files manually.
- `public/` is a build output and should not be committed.
- After GitHub Pages is switched to `GitHub Actions` as the source, the old `hugo-main` repository is no longer needed.
