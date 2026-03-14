Use this structure for `Plogs` photos:

```text
static/images/plogs/
  south-korea/
    seoul/
      .gitkeep
    busan/
      .gitkeep
  malaysia/
    kuala-lumpur/
      .gitkeep
  singapore/
    singapore/
      .gitkeep
  thailand/
    bangkok/
      .gitkeep
    phuket/
      .gitkeep
  china/
    hong-kong/
      .gitkeep
    macau/
      .gitkeep
    guangzhou/
      .gitkeep
    kunming/
      .gitkeep
    dali/
      .gitkeep
    lijiang/
      .gitkeep
    xishuangbanna/
      .gitkeep
    puer/
      .gitkeep
    haikou/
      .gitkeep
    weizhou-island/
      .gitkeep
    zhoushan/
      .gitkeep
```

Recommended next step inside each city folder:

```text
static/images/plogs/china/guangzhou/campus-walk-2026-03/
  cover.jpg
  01.jpg
  02.jpg
  03.jpg
```

Album naming rule:
- `YYYY-MM-short-title`
- keep filenames simple: `cover.jpg`, `01.jpg`, `02.jpg`

This lets us build `Plogs` by region first, then by album.
