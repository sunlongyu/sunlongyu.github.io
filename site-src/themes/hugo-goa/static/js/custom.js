// Insert custom javascript here.

// 音乐播放器功能
document.addEventListener('DOMContentLoaded', function() {
    let currentPlayingItem = null;

    const musicItems = document.querySelectorAll('.music-item');
    if (!musicItems.length) {
        return;
    }

    const getItemIframe = (item) => item.querySelector('.netease-player-inline iframe');
    const withAutoplay = (src) => {
        if (!src) {
            return '';
        }
        if (src.includes('auto=0')) {
            return src.replace('auto=0', 'auto=1');
        }
        if (src.includes('auto=1')) {
            return src;
        }
        return src.includes('?') ? `${src}&auto=1` : `${src}?auto=1`;
    };

    const withPausedState = (src) => {
        if (!src) {
            return '';
        }
        if (src.includes('auto=1')) {
            return src.replace('auto=1', 'auto=0');
        }
        return src;
    };

    musicItems.forEach((item) => {
        const iframe = getItemIframe(item);
        if (!iframe) {
            return;
        }

        const initialSrc = iframe.getAttribute('src') || '';
        iframe.dataset.playerSrc = withPausedState(initialSrc);
    });

    function stopItem(itemElement) {
        if (!itemElement) {
            return;
        }

        const iframe = getItemIframe(itemElement);
        if (iframe) {
            iframe.setAttribute('src', iframe.dataset.playerSrc || '');
        }
        updatePlayButton(itemElement, false);
    }

    function stopOtherItems(exceptItem = null) {
        musicItems.forEach((item) => {
            if (item !== exceptItem) {
                stopItem(item);
            }
        });
    }

    musicItems.forEach(item => {
        const playBtn = item.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                togglePlay(item);
            });
        }
    });

    function togglePlay(itemElement) {
        const iframe = getItemIframe(itemElement);
        if (!iframe) {
            return;
        }

        const nextSrc = withAutoplay(iframe.dataset.playerSrc || iframe.getAttribute('src') || '');

        if (currentPlayingItem === itemElement) {
            stopItem(itemElement);
            currentPlayingItem = null;
            return;
        }

        stopOtherItems(itemElement);
        iframe.setAttribute('src', nextSrc);
        currentPlayingItem = itemElement;
        updatePlayButton(itemElement, true);
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

// 博客收藏功能
(() => {
    const FAVORITES_KEY = 'sly-blog-favorites';

    function readFavorites() {
        try {
            const raw = window.localStorage.getItem(FAVORITES_KEY);
            if (!raw) {
                return [];
            }
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
        } catch (error) {
            console.error('Failed to read favorites from localStorage:', error);
            return [];
        }
    }

    function writeFavorites(favorites) {
        try {
            window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.error('Failed to write favorites to localStorage:', error);
        }
    }

    function getFavorites() {
        return readFavorites();
    }

    function isFavorited(id) {
        return getFavorites().includes(id);
    }

    function updateButtonState(button, active) {
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');

        const label = button.querySelector('.favorite-label');
        if (label) {
            const singleMode = button.classList.contains('blog-favorite-button-single');
            label.textContent = active ? (singleMode ? '已收藏本文' : '已收藏') : (singleMode ? '收藏本文' : '收藏');
        }
    }

    function syncButtons() {
        const favorites = new Set(getFavorites());
        document.querySelectorAll('[data-favorite-button]').forEach((button) => {
            const favoriteId = button.getAttribute('data-favorite-id');
            updateButtonState(button, favoriteId ? favorites.has(favoriteId) : false);
        });
    }

    function toggleFavorite(id) {
        const favorites = new Set(getFavorites());
        if (favorites.has(id)) {
            favorites.delete(id);
        } else {
            favorites.add(id);
        }
        writeFavorites(Array.from(favorites));
        syncButtons();
        document.dispatchEvent(new CustomEvent('blog-favorites-change', {
            detail: {
                favorites: Array.from(favorites)
            }
        }));
        return favorites.has(id);
    }

    function bindButtons(root = document) {
        root.querySelectorAll('[data-favorite-button]').forEach((button) => {
            if (button.dataset.favoriteBound === 'true') {
                return;
            }

            button.dataset.favoriteBound = 'true';
            button.addEventListener('click', () => {
                const favoriteId = button.getAttribute('data-favorite-id');
                if (!favoriteId) {
                    return;
                }
                toggleFavorite(favoriteId);
            });
        });

        syncButtons();
    }

    document.addEventListener('DOMContentLoaded', () => {
        bindButtons(document);
    });

    window.addEventListener('storage', (event) => {
        if (event.key === FAVORITES_KEY) {
            syncButtons();
            document.dispatchEvent(new CustomEvent('blog-favorites-change', {
                detail: {
                    favorites: getFavorites()
                }
            }));
        }
    });

    window.BlogFavorites = {
        bindButtons,
        getFavorites,
        isFavorited,
        toggleFavorite
    };
})();
