# Waline Setup

## What This Adds

The site templates are ready for Waline, but Waline is disabled until `params.waline.serverURL` is filled in.

Once enabled, the site can show:

- blog post pageviews
- blog comments
- reaction counts that can act as like / favorite buttons
- a tiny home-page visitor counter

## Required Step

Deploy a Waline server first. This site is static GitHub Pages, so metrics and comments need an external backend.

Official references:

- [Waline](https://waline.js.org/)
- [Get Started](https://waline.js.org/guide/get-started/)
- [Server Deploy](https://waline.js.org/guide/get-started/server/)

## Enable In This Repo

Open `hugo.toml` and fill:

```toml
[params.waline]
serverURL = "https://your-waline-server.example.com"
lang = "zh-CN"
placeholder = "写下你的评论"
login = "enable"
avatar = "mp"
requiredMeta = ["nick", "mail"]
reaction = [
  "https://unpkg.com/@waline/emojis@1.1.0/weibo/heart.png",
  "https://unpkg.com/@waline/emojis@1.1.0/weibo/star.png",
  "https://unpkg.com/@waline/emojis@1.1.0/weibo/like.png"
]
```

## Current Mapping

- pageview = 阅读量
- reaction heart / star / like = 点赞 / 收藏的近似替代
- comment list = 评论

There is no exact built-in CSDN-style "收藏" counter in the current site stack, so the star reaction is used as the closest equivalent.
