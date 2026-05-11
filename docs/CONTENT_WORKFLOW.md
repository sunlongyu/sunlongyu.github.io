# Content Workflow

## Scope

All editable website content lives under `site-src/`.

## Recommended naming

- Blog file names: lowercase kebab-case
- Example: `llm-pretraining-notes.md`
- Keep `slug` aligned with the file name when possible
- Avoid spaces and mixed case in new file or folder names

## Content locations

- Home intro: `site-src/content/_index.md`
- Blog posts: `site-src/content/blogs/`
- Blog images: `site-src/static/images/blogs/`
- Plogs pages: `site-src/content/plogs/`
- Plogs images: `site-src/static/images/plogs/`
- Profile image: `site-src/assets/images/profile/`
- Social images: `site-src/static/images/social/`
- Music covers: `site-src/static/images/music/`

## New blog post flow

1. Create a file in `site-src/content/blogs/`.
2. Copy the structure from `site-src/archetypes/blog.md`.
3. Set `title`, `date`, `description`, `column`, `categories`, and `tags`.
4. Set `slug` to a stable lowercase kebab-case value.
5. If a URL changes, add the old path to `aliases`.
6. Put article images in `site-src/static/images/blogs/`.
7. Commit and push to `main`.

## Plogs workflow

- Route model: `country -> city -> photos`
- Frontend special case: `China` currently renders as a flat city list
- Put each city cover in the same folder as `cover.jpg`
- Do not expect `cover.jpg` to appear inside the city gallery; it is filtered out on purpose

## Homepage workflow

- Homepage intro text lives in `site-src/content/_index.md`
- Do not put long homepage intro text back into `site-src/hugo.toml`

## Notes

- Existing older blog filenames were kept where changing them would create unnecessary URL churn.
- Pages CMS edits blog posts through `.pages.yml` and writes directly into `site-src/content/blogs/`.
