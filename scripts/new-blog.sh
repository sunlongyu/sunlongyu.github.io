#!/usr/bin/env bash

set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "usage: $0 <blog-file-name>" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="$ROOT_DIR/site-src"
BLOG_NAME="$1"

if command -v hugo >/dev/null 2>&1; then
  HUGO_BIN="$(command -v hugo)"
else
  echo "error: hugo is not installed or not in PATH" >&2
  exit 1
fi

"$HUGO_BIN" new "blogs/${BLOG_NAME}.md" --source "$SOURCE_DIR"

echo "Created site-src/content/blogs/${BLOG_NAME}.md"
