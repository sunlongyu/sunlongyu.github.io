# 网易云音乐外链播放器使用指南

## 🎵 如何获取网易云音乐外链代码

### 方法一：通过网易云音乐网页版

1. **打开网易云音乐网页版**
   - 访问 https://music.163.com
   - 登录您的账号

2. **找到您的歌曲**
   - 进入您的歌曲页面
   - 例如：https://music.163.com/#/song?id=2606387759

3. **获取外链代码**
   - 点击歌曲页面的"生成外链播放器"按钮
   - 或者点击分享按钮，选择"生成外链播放器"
   - 复制生成的 iframe 代码

### 方法二：手动构建外链URL

网易云音乐外链播放器的URL格式：
```
//music.163.com/outchain/player?type=类型&id=ID&auto=自动播放&height=高度
```

## 📋 参数说明

### type 参数（播放器类型）
- `type=0`：歌单播放器
- `type=1`：单曲播放器  
- `type=2`：专辑播放器

### id 参数
- 对应歌曲、专辑或歌单的ID
- 从URL中获取，例如：
  - 歌曲：`https://music.163.com/#/song?id=2606387759` → ID是 `2606387759`
  - 歌单：`https://music.163.com/#/playlist?id=123456` → ID是 `123456`

### auto 参数
- `auto=0`：不自动播放（推荐）
- `auto=1`：自动播放

### height 参数
- 播放器的高度（像素）
- 单曲播放器建议：`height=66` 或 `height=86`
- 歌单播放器建议：`height=430` 或更高

## 🔧 在您的网站中使用

### 单曲播放器示例
```html
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" 
        width="100%" height="86" 
        src="//music.163.com/outchain/player?type=2&id=2606387759&auto=0&height=66">
</iframe>
```

### 歌单播放器示例
```html
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" 
        width="100%" height="450" 
        src="//music.163.com/outchain/player?type=0&id=YOUR_PLAYLIST_ID&auto=0&height=430">
</iframe>
```

## 🎯 更新您的音乐页面

### 步骤1：获取您的歌曲ID
1. 打开您在网易云音乐的歌曲页面
2. 从URL中复制ID号
3. 例如：`https://music.163.com/song?id=2606387759` → ID是 `2606387759`

### 步骤2：更新代码
在 `content/Music/index.md` 中，将示例ID替换为您的真实ID：

```html
<!-- 将 YOUR_SONG_ID_2 替换为您的第二首歌的ID -->
<iframe src="//music.163.com/outchain/player?type=2&id=YOUR_SONG_ID_2&auto=0&height=66">
</iframe>

<!-- 将 YOUR_SONG_ID_3 替换为您的第三首歌的ID -->
<iframe src="//music.163.com/outchain/player?type=2&id=YOUR_SONG_ID_3&auto=0&height=66">
</iframe>
```

### 步骤3：创建歌单播放器（可选）
如果您有包含所有作品的歌单：
1. 创建一个公开的歌单
2. 获取歌单ID
3. 更新大播放器的代码

## ⚠️ 注意事项

### 版权和权限
- 只能为您拥有版权的原创作品生成外链
- 确保歌曲在网易云音乐上是公开可播放的
- 某些歌曲可能因版权限制无法生成外链

### 播放器限制
- 外链播放器可能受到网易云音乐政策变化的影响
- 建议同时提供直接链接到网易云音乐的选项
- 在某些网络环境下可能无法加载

### 技术建议
- 使用 `auto=0` 避免自动播放影响用户体验
- 为移动端优化播放器尺寸
- 提供加载失败时的备用方案

## 🚀 测试播放器

更新代码后：
1. 保存文件
2. 刷新网站页面
3. 检查播放器是否正常加载
4. 测试播放功能

## 🛠️ 故障排除

### 播放器无法加载
- 检查歌曲ID是否正确
- 确认歌曲在网易云音乐上是公开的
- 尝试不同的浏览器

### 播放器显示空白
- 检查网络连接
- 确认iframe代码格式正确
- 查看浏览器控制台的错误信息

### 无法播放
- 可能是版权限制
- 尝试使用直接链接到网易云音乐
- 联系网易云音乐客服

---

现在您的音乐页面应该能够正确显示和播放网易云音乐的内容了！🎵
