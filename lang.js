// 語言切換功能
function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-zh][data-en]');
    elements.forEach(el => {
        if (lang === 'zh') {
            el.textContent = el.getAttribute('data-zh');
        } else if (lang === 'en') {
            el.textContent = el.getAttribute('data-en');
        }
    });

    // 更新 HTML lang 屬性
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';

    // 儲存語言偏好
    localStorage.setItem('preferredLanguage', lang);
}

// ==================== 開發者模式 ====================
let clickCount = 0;
let clickTimer = null;
const CLICK_THRESHOLD = 5;
const CLICK_TIMEOUT = 2000; // 2秒內要點擊5次

function initDevMode() {
    // 檢查是否已經是開發者模式
    const isDevMode = localStorage.getItem('devMode') === 'true';
    if (isDevMode) {
        document.body.classList.add('dev-mode');
        showDevModeIndicator();
    }

    // 綁定標題點擊事件
    const title = document.querySelector('h1');
    if (title) {
        title.style.cursor = 'default';
        title.addEventListener('click', handleTitleClick);
    }
}

function handleTitleClick() {
    clickCount++;

    // 重置計時器
    if (clickTimer) {
        clearTimeout(clickTimer);
    }

    // 設置超時重置
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, CLICK_TIMEOUT);

    // 達到門檻
    if (clickCount >= CLICK_THRESHOLD) {
        toggleDevMode();
        clickCount = 0;
        clearTimeout(clickTimer);
    }
}

function toggleDevMode() {
    const isDevMode = document.body.classList.toggle('dev-mode');
    localStorage.setItem('devMode', isDevMode);

    if (isDevMode) {
        showDevModeIndicator();
        showToast('🔓 開發者模式已啟用', 'success');
    } else {
        hideDevModeIndicator();
        showToast('🔒 開發者模式已關閉', 'info');
    }
}

function showDevModeIndicator() {
    // 如果已存在則不重複創建
    if (document.getElementById('dev-indicator')) return;

    const indicator = document.createElement('div');
    indicator.id = 'dev-indicator';
    indicator.innerHTML = '🛠️ DEV';
    indicator.title = '點擊標題5次可退出開發者模式';
    indicator.onclick = () => {
        if (confirm('確定要退出開發者模式嗎？')) {
            toggleDevMode();
        }
    };
    document.body.appendChild(indicator);
}

function hideDevModeIndicator() {
    const indicator = document.getElementById('dev-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function showToast(message, type = 'info') {
    // 移除舊的 toast
    const oldToast = document.getElementById('toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // 動畫顯示
    setTimeout(() => toast.classList.add('show'), 10);

    // 3秒後消失
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function () {
    // 語言設定
    const savedLang = localStorage.getItem('preferredLanguage') || 'zh';
    const select = document.getElementById('language-select');
    if (select) {
        select.value = savedLang;
    }
    switchLanguage(savedLang);

    // 開發者模式
    initDevMode();
});
