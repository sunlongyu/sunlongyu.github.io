// Insert custom javascript here.

// 音乐播放器功能
document.addEventListener('DOMContentLoaded', function() {
    // 音乐数据 - 您需要替换为真实的音乐文件URL或网易云音乐API
    const musicData = {
        1: {
            title: "夜空中最亮的星",
            artist: "SLY",
            // 注意：这里需要替换为实际的音频文件URL
            // 由于版权限制，网易云音乐不提供直接的音频文件链接
            audioUrl: "/audio/song1.mp3", // 您需要上传音频文件到static/audio/目录
            cover: "/images/music/cover1.jpg"
        },
        2: {
            title: "时光倒流",
            artist: "SLY",
            audioUrl: "/audio/song2.mp3",
            cover: "/images/music/cover2.jpg"
        },
        3: {
            title: "城市漫步",
            artist: "SLY",
            audioUrl: "/audio/song3.mp3",
            cover: "/images/music/cover3.jpg"
        }
    };

    // 创建音频播放器
    let currentAudio = null;
    let currentPlayingItem = null;

    // 获取所有音乐项目
    const musicItems = document.querySelectorAll('.music-item');

    musicItems.forEach(item => {
        const playBtn = item.querySelector('.play-btn');
        const songId = item.getAttribute('data-song-id');

        if (playBtn && songId && musicData[songId]) {
            playBtn.addEventListener('click', function(e) {
                e.preventDefault();
                togglePlay(songId, item);
            });
        }
    });

    function togglePlay(songId, itemElement) {
        const songData = musicData[songId];

        if (!songData) {
            console.error('Song data not found for ID:', songId);
            return;
        }

        // 如果当前有音乐在播放，先停止
        if (currentAudio && !currentAudio.paused) {
            if (currentPlayingItem === itemElement) {
                // 如果点击的是当前播放的歌曲，则暂停
                currentAudio.pause();
                updatePlayButton(currentPlayingItem, false);
                return;
            } else {
                // 如果点击的是其他歌曲，先停止当前播放
                currentAudio.pause();
                updatePlayButton(currentPlayingItem, false);
            }
        }

        // 创建新的音频对象
        currentAudio = new Audio(songData.audioUrl);
        currentPlayingItem = itemElement;

        // 设置音频事件监听器
        currentAudio.addEventListener('loadstart', function() {
            console.log('开始加载音频:', songData.title);
        });

        currentAudio.addEventListener('canplay', function() {
            console.log('音频可以播放:', songData.title);
        });

        currentAudio.addEventListener('error', function(e) {
            console.error('音频加载失败:', songData.title, e);
            alert('抱歉，音频文件加载失败。请检查文件是否存在或尝试访问网易云音乐链接。');
            updatePlayButton(currentPlayingItem, false);
        });

        currentAudio.addEventListener('ended', function() {
            updatePlayButton(currentPlayingItem, false);
            currentPlayingItem = null;
        });

        // 尝试播放音频
        currentAudio.play().then(() => {
            updatePlayButton(itemElement, true);
            console.log('开始播放:', songData.title);
        }).catch(error => {
            console.error('播放失败:', error);
            // 如果本地音频播放失败，提示用户访问网易云音乐
            const neteaseLink = itemElement.querySelector('.netease-link');
            if (neteaseLink) {
                if (confirm('本地音频播放失败，是否前往网易云音乐收听？')) {
                    window.open(neteaseLink.href, '_blank');
                }
            }
            updatePlayButton(itemElement, false);
        });
    }

    function updatePlayButton(itemElement, isPlaying) {
        const playBtn = itemElement.querySelector('.play-btn');
        if (playBtn) {
            if (isPlaying) {
                playBtn.classList.remove('fa-play');
                playBtn.classList.add('fa-pause');
                itemElement.classList.add('playing');
            } else {
                playBtn.classList.remove('fa-pause');
                playBtn.classList.add('fa-play');
                itemElement.classList.remove('playing');
            }
        }
    }

    // 添加播放状态的CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .music-item.playing {
            border-color: #667eea;
            background: linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%);
        }

        .music-item.playing .song-title {
            color: #667eea;
        }

        .music-item.playing .play-overlay {
            opacity: 1;
            background: rgba(102, 126, 234, 0.8);
        }
    `;
    document.head.appendChild(style);
});

// 网易云音乐外链播放器增强
document.addEventListener('DOMContentLoaded', function() {
    // 为网易云音乐iframe添加加载提示
    const iframes = document.querySelectorAll('iframe[src*="music.163.com"]');

    iframes.forEach(iframe => {
        // 创建加载提示
        const loadingDiv = document.createElement('div');
        loadingDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>正在加载网易云音乐播放器...</p>
            </div>
        `;
        loadingDiv.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #f8f9fa;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // 将iframe包装在相对定位的容器中
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        iframe.parentNode.insertBefore(wrapper, iframe);
        wrapper.appendChild(iframe);
        wrapper.appendChild(loadingDiv);

        // iframe加载完成后隐藏加载提示
        iframe.addEventListener('load', function() {
            loadingDiv.style.display = 'none';
        });

        // 设置超时，如果加载时间过长则显示错误信息
        setTimeout(() => {
            if (loadingDiv.style.display !== 'none') {
                loadingDiv.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: #999;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem; color: #ffc107;"></i>
                        <p>播放器加载时间较长，请耐心等待或直接访问网易云音乐</p>
                        <a href="https://music.163.com" target="_blank" style="color: #d33a31; text-decoration: none;">
                            <i class="fas fa-external-link-alt"></i> 前往网易云音乐
                        </a>
                    </div>
                `;
            }
        }, 10000); // 10秒超时
    });
});
