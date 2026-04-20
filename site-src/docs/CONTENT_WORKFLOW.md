# Content Workflow

## Recommended file naming

- Blog file names: use lowercase kebab-case
- Example: `llm-pretraining-notes.md`
- Avoid spaces in new file names
- Avoid mixing uppercase and lowercase in directory names
- Keep `slug` aligned with the file name when possible

## Where to place files

- Blog posts: `content/blogs/`
- Blog images: `static/images/blogs/`
- Profile image: `assets/images/profile/`
- Social QR or icons: `static/images/social/`
- Music covers: `static/images/music/`

## Recommended new post flow

1. Create a file in `content/blogs/`
2. Copy the structure from `archetypes/blog.md`
3. Set `title`, `date`, `categories`, `tags`, `description`
4. Set `slug` to a stable lowercase kebab-case value
5. If you ever change a post URL, add the old path to `aliases`
6. If needed, put article images in `static/images/blogs/`
7. Commit and push to `main`

## Notes

- Existing older blog filenames were kept as-is to avoid unnecessary URL churn.
- New posts should follow the naming rule above.
