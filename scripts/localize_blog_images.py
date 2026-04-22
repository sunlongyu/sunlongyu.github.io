#!/usr/bin/env python3

from __future__ import annotations

import hashlib
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "site-src" / "content" / "blogs"
STATIC_DIR = ROOT / "site-src" / "static" / "images" / "blogs"
IMAGE_RE = re.compile(r"!\[(?P<alt>[^\]]*)\]\((?P<url>https?://[^)\s]+)\)")
DATE_RE = re.compile(
    r"^(?P<prefix>date\s*=\s*['\"])(?P<value>\d{4}-\d{2}-\d{2}T\d{2}:\d{2})(?P<suffix>['\"])\s*$",
    re.MULTILINE,
)
TARGET_HOST = "i-blog.csdnimg.cn"
TARGET_PATH_FRAGMENT = "/blog_migrate/"
DEFAULT_TZ = "+08:00"


def is_target_url(url: str) -> bool:
    parsed = urllib.parse.urlparse(url)
    return parsed.netloc == TARGET_HOST and TARGET_PATH_FRAGMENT in parsed.path


def build_target_path(post_path: Path, url: str, index: int) -> tuple[Path, str]:
    parsed = urllib.parse.urlparse(url)
    ext = Path(parsed.path).suffix or ".png"
    digest = hashlib.sha1(url.encode("utf-8")).hexdigest()[:10]
    file_name = f"image-{index:02d}-{digest}{ext}"
    folder = STATIC_DIR / post_path.stem
    relative_url = f"/images/blogs/{post_path.stem}/{file_name}"
    return folder / file_name, relative_url


def download(url: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists() and destination.stat().st_size > 0:
        return

    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0",
            "Referer": "https://blog.csdn.net/",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        data = response.read()

    destination.write_bytes(data)


def process_post(post_path: Path) -> tuple[bool, int, int]:
    content = post_path.read_text(encoding="utf-8")
    replacements: dict[str, str] = {}
    changed = False
    image_rewrites = 0
    date_rewrites = 0

    for match_index, match in enumerate(IMAGE_RE.finditer(content), start=1):
        url = match.group("url")
        if not is_target_url(url):
            continue

        if url not in replacements:
            destination, local_url = build_target_path(post_path, url, match_index)
            download(url, destination)
            replacements[url] = local_url

        original = match.group(0)
        rewritten = f"![{match.group('alt')}]({replacements[url]})"
        if original != rewritten:
            content = content.replace(original, rewritten)
            changed = True
            image_rewrites += 1

    original_date_matches = DATE_RE.findall(content)
    normalized = DATE_RE.sub(
        lambda match: f"{match.group('prefix')}{match.group('value')}:00{DEFAULT_TZ}{match.group('suffix')}",
        content,
    )
    if normalized != content:
        content = normalized
        changed = True
        date_rewrites += len(original_date_matches)

    if changed:
        post_path.write_text(content, encoding="utf-8")

    return changed, image_rewrites, date_rewrites


def main() -> int:
    total_posts = 0
    total_image_rewrites = 0
    total_date_rewrites = 0

    for post_path in sorted(BLOG_DIR.glob("*.md")):
        changed, image_rewrites, date_rewrites = process_post(post_path)
        if changed:
            total_posts += 1
            total_image_rewrites += image_rewrites
            total_date_rewrites += date_rewrites
            print(
                f"prepared {post_path.relative_to(ROOT)} "
                f"(images: {image_rewrites}, dates: {date_rewrites})"
            )

    if total_posts == 0:
        print("no blog source normalization needed")
    else:
        print(
            f"prepared {total_posts} post(s) "
            f"(images: {total_image_rewrites}, dates: {total_date_rewrites})"
        )

    return 0


if __name__ == "__main__":
    sys.exit(main())
