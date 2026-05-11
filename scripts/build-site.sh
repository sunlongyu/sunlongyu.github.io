#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="$ROOT_DIR/site-src"
OUTPUT_DIR="$ROOT_DIR/_site"

if command -v hugo >/dev/null 2>&1; then
  HUGO_BIN="$(command -v hugo)"
else
  echo "error: hugo is not installed or not in PATH" >&2
  exit 1
fi

python3 "$ROOT_DIR/scripts/localize_blog_images.py"

rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

"$HUGO_BIN" --source "$SOURCE_DIR" --destination "$OUTPUT_DIR" "$@"

touch "$OUTPUT_DIR/.nojekyll"

echo "Site built into $OUTPUT_DIR"
