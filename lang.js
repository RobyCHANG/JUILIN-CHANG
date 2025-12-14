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

// 頁面載入時檢查儲存的語言偏好
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'zh';
    const select = document.getElementById('language-select');
    if (select) {
        select.value = savedLang;
    }
    switchLanguage(savedLang);
});
