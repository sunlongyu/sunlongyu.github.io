#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="$ROOT_DIR/site-src"
TMP_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

if command -v hugo >/dev/null 2>&1; then
  HUGO_BIN="$(command -v hugo)"
else
  echo "error: hugo is not installed or not in PATH" >&2
  exit 1
fi

"$HUGO_BIN" --source "$SOURCE_DIR" --destination "$TMP_DIR" "$@"

rsync -a --delete \
  --exclude '.git/' \
  --exclude '.github/' \
  --exclude '.gitignore' \
  --exclude '.nojekyll' \
  --exclude '.DS_Store' \
  --exclude 'README.md' \
  --exclude 'scripts/' \
  --exclude 'site-src/' \
  "$TMP_DIR"/ "$ROOT_DIR"/

touch "$ROOT_DIR/.nojekyll"

echo "Site rebuilt into $ROOT_DIR"
