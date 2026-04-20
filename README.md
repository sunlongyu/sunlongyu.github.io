# sunlongyu.github.io

仓库根目录保存 GitHub Pages 直接发布的静态文件。

为了方便后续继续新增和编辑文章，Hugo 源码已经放在 `site-src/` 下。日常维护只需要改源码目录，再运行脚本同步生成站点。

## 目录说明

- `site-src/content/`：页面和文章 Markdown 源文件
- `site-src/static/`：静态资源源文件
- `site-src/static/images/blogs/`：博客图片源文件
- `scripts/new-blog.sh`：新建博客草稿
- `scripts/build-site.sh`：重新生成并同步站点

## 常用流程

### 1. 新增文章

```bash
./scripts/new-blog.sh "文章文件名"
```

新文章会生成到 `site-src/content/blogs/`。

### 2. 编辑文章

修改对应的 Markdown 文件，例如：

```bash
site-src/content/blogs/计算机网络物理层.md
```

### 3. 添加文章图片

把图片放到与文章对应的目录，例如：

```bash
site-src/static/images/blogs/计算机网络物理层/
```

Markdown 中使用绝对路径引用：

```md
![配图说明](/images/blogs/计算机网络物理层/example.png)
```

### 4. 重新生成网站

```bash
./scripts/build-site.sh
```

脚本会：

- 从 `site-src/` 重新构建站点
- 把生成结果同步到仓库根目录
- 保留 `site-src/`、`scripts/` 等维护文件
- 自动补上 `.nojekyll`

## 环境要求

- 本地已安装 Hugo
- 当前站点已按 `site-src/hugo.toml` 配置为 `https://sunlongyu.github.io/`

建议使用 Hugo Extended 版本，避免后续主题或资源处理出现兼容问题。
