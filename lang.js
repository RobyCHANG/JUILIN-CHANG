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

    // 更新選擇器顯示
    const selectedLang = document.getElementById('selected-lang');
    if (selectedLang) {
        selectedLang.textContent = lang === 'zh' ? '繁體中文' : 'English';
    }

    // 更新 HTML lang 屬性
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';

    // 儲存語言偏好
    localStorage.setItem('preferredLanguage', lang);
}

// ==================== 自定義下拉選單 ====================
function toggleDropdown() {
    const dropdown = document.getElementById('lang-dropdown');
    dropdown.classList.toggle('open');
}

function selectLanguage(lang) {
    switchLanguage(lang);
    toggleDropdown();
}

// 點擊其他地方關閉下拉選單
document.addEventListener('click', function (e) {
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

// ==================== 開發者模式 ====================
let clickCount = 0;
let clickTimer = null;
const CLICK_THRESHOLD = 5;
const CLICK_TIMEOUT = 2000;

function initDevMode() {
    const isDevMode = localStorage.getItem('devMode') === 'true';
    if (isDevMode) {
        document.body.classList.add('dev-mode');
        showDevModeIndicator();
    }

    const title = document.querySelector('h1');
    if (title) {
        title.style.cursor = 'default';
        title.addEventListener('click', handleTitleClick);
    }
}

function handleTitleClick() {
    clickCount++;

    if (clickTimer) clearTimeout(clickTimer);

    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, CLICK_TIMEOUT);

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
    if (document.getElementById('dev-indicator')) return;

    const indicator = document.createElement('div');
    indicator.id = 'dev-indicator';
    indicator.innerHTML = '🛠️ DEV';
    indicator.title = '點擊退出開發者模式';
    indicator.onclick = () => {
        if (confirm('確定要退出開發者模式嗎？')) {
            toggleDevMode();
        }
    };
    document.body.appendChild(indicator);
}

function hideDevModeIndicator() {
    const indicator = document.getElementById('dev-indicator');
    if (indicator) indicator.remove();
}

function showToast(message, type = 'info') {
    const oldToast = document.getElementById('toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('preferredLanguage') || 'zh';
    switchLanguage(savedLang);
    initDevMode();
});
