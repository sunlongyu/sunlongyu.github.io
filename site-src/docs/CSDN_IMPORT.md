# CSDN Import Workflow

## Scope

This site can absorb selected CSDN columns into Hugo posts under `content/blogs/`.

Recommended columns for migration:

- `LLM`
- `development`
- `software engineering`
- `computer network`
- `DS`
- `OS`

## Constraint

CSDN public article detail pages are currently guarded by anti-bot checks. That means:

- article list metadata can be collected automatically
- full article bodies cannot be reliably pulled server-side with a simple script

The reliable workflow is to export your own article Markdown in the browser, then import it here.

## Recommended Folder Staging

Create a local staging folder outside the repo first:

```text
~/Downloads/csdn-export/
  llm/
  development/
  software-engineering/
  computer-network/
  ds/
  os/
```

Put one Markdown file per article into the matching folder.

## Front Matter Standard

Each imported article should end up like this:

```toml
+++
title = "Article title"
date = 2025-03-04T00:00:00+08:00
draft = false
categories = ["LLM"]
tags = ["RAG", "Prompt Engineering"]
description = "One sentence summary"
slug = "article-slug"
aliases = []
csdn_url = "https://blog.csdn.net/..."
csdn_views = 888
csdn_likes = 21
csdn_comments = 0
csdn_favorites = 11
+++
```

## Import Rule

- `categories` should match one of the selected columns
- keep filenames in lowercase kebab-case
- download remote article images into this repo instead of hotlinking
- store blog images under `static/images/blogs/`
- preserve `csdn_url` for source traceability
- preserve the original CSDN metrics in the `csdn_*` fields

## What Is Already Supported By The Theme

The blog templates now render:

- archived CSDN metrics from `csdn_views`, `csdn_likes`, `csdn_comments`, `csdn_favorites`
- live Waline pageviews when `params.waline.serverURL` is configured
- Waline comments and reactions on blog detail pages

## Practical Migration Strategy

1. Export 3 to 5 articles from one column first.
2. Normalize the Markdown and image links.
3. Confirm Hugo rendering is clean.
4. Batch-import the rest of that column.
5. Repeat for the remaining columns.
