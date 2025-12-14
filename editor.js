// 編輯器功能 - 使用 localStorage 儲存資料

// ==================== 刷題感想 ====================
let currentPostIndex = -1;
const DEFAULT_POSTS = [
    {
        title: 'LeetCode 初體驗',
        date: '2024.12',
        content: '開始接觸 LeetCode，從 Easy 題目開始練習，學習基礎的陣列和字串操作。',
        tags: ['LeetCode', 'Algorithm']
    },
    {
        title: '演算法思維培養',
        date: '2024.11',
        content: '學習如何分析問題，將複雜問題拆解成小步驟，逐步建立解題思維。',
        tags: ['思維訓練']
    }
];

function getPosts(category) {
    const saved = localStorage.getItem(`posts-${category}`);
    return saved ? JSON.parse(saved) : DEFAULT_POSTS;
}

function savePosts(category, posts) {
    localStorage.setItem(`posts-${category}`, JSON.stringify(posts));
}

function loadPosts(category) {
    const container = document.getElementById(`${category}-posts`);
    if (!container) return;

    const posts = getPosts(category);
    container.innerHTML = posts.map((post, index) => `
        <article class="blog-item">
            <div class="blog-date">${post.date}</div>
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div class="tags">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editPost('${category}', ${index})">✏️</button>
                <button class="delete-btn" onclick="deletePost('${category}', ${index})">🗑️</button>
            </div>
        </article>
    `).join('');
}

function addNewPost(category) {
    currentPostIndex = -1;
    document.getElementById('post-title').value = '';
    document.getElementById('post-date').value = '';
    document.getElementById('post-content').value = '';
    document.getElementById('post-tags').value = '';
    document.getElementById('edit-modal').classList.add('show');
    window.currentCategory = category;
}

function editPost(category, index) {
    const posts = getPosts(category);
    const post = posts[index];
    currentPostIndex = index;
    document.getElementById('post-title').value = post.title;
    document.getElementById('post-date').value = post.date;
    document.getElementById('post-content').value = post.content;
    document.getElementById('post-tags').value = post.tags.join(', ');
    document.getElementById('edit-modal').classList.add('show');
    window.currentCategory = category;
}

function savePost() {
    const category = window.currentCategory;
    const posts = getPosts(category);
    const newPost = {
        title: document.getElementById('post-title').value,
        date: document.getElementById('post-date').value,
        content: document.getElementById('post-content').value,
        tags: document.getElementById('post-tags').value.split(',').map(t => t.trim()).filter(t => t)
    };

    if (currentPostIndex === -1) {
        posts.unshift(newPost);
    } else {
        posts[currentPostIndex] = newPost;
    }

    savePosts(category, posts);
    closeModal();
    loadPosts(category);
}

function deletePost(category, index) {
    if (confirm('確定要刪除這篇文章嗎？')) {
        const posts = getPosts(category);
        posts.splice(index, 1);
        savePosts(category, posts);
        loadPosts(category);
    }
}

function closeModal() {
    document.getElementById('edit-modal').classList.remove('show');
}

// ==================== 語言學習 ====================
let currentLangIndex = -1;
const DEFAULT_LANGUAGES = [
    { name: 'Python', progress: 60, desc: '已學習：基礎語法、函數、列表、字典、檔案處理' },
    { name: 'JavaScript', progress: 40, desc: '已學習：變數、條件判斷、迴圈、DOM 操作' },
    { name: 'HTML/CSS', progress: 70, desc: '已學習：語義化標籤、Flexbox、Grid、響應式設計' },
    { name: 'C++', progress: 25, desc: '學習中：基礎語法、指標概念' }
];

function getLanguages() {
    const saved = localStorage.getItem('languages');
    return saved ? JSON.parse(saved) : DEFAULT_LANGUAGES;
}

function saveLanguages(languages) {
    localStorage.setItem('languages', JSON.stringify(languages));
}

function loadLanguages() {
    const container = document.getElementById('languages-list');
    if (!container) return;

    const languages = getLanguages();
    container.innerHTML = languages.map((lang, index) => `
        <div class="progress-item">
            <div class="progress-header">
                <span class="lang-name">${lang.name}</span>
                <span class="progress-percent">${lang.progress}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${lang.progress}%;"></div>
            </div>
            <p class="progress-desc">${lang.desc}</p>
            <div class="item-actions">
                <button class="edit-btn" onclick="editLanguage(${index})">✏️</button>
                <button class="delete-btn" onclick="deleteLanguage(${index})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function addNewLanguage() {
    currentLangIndex = -1;
    document.getElementById('lang-name').value = '';
    document.getElementById('lang-progress').value = 50;
    document.getElementById('progress-value').textContent = '50%';
    document.getElementById('lang-desc').value = '';
    document.getElementById('lang-modal').classList.add('show');
}

function editLanguage(index) {
    const languages = getLanguages();
    const lang = languages[index];
    currentLangIndex = index;
    document.getElementById('lang-name').value = lang.name;
    document.getElementById('lang-progress').value = lang.progress;
    document.getElementById('progress-value').textContent = lang.progress + '%';
    document.getElementById('lang-desc').value = lang.desc;
    document.getElementById('lang-modal').classList.add('show');
}

function saveLanguage() {
    const languages = getLanguages();
    const newLang = {
        name: document.getElementById('lang-name').value,
        progress: parseInt(document.getElementById('lang-progress').value),
        desc: document.getElementById('lang-desc').value
    };

    if (currentLangIndex === -1) {
        languages.push(newLang);
    } else {
        languages[currentLangIndex] = newLang;
    }

    saveLanguages(languages);
    closeLangModal();
    loadLanguages();
}

function deleteLanguage(index) {
    if (confirm('確定要刪除這個語言嗎？')) {
        const languages = getLanguages();
        languages.splice(index, 1);
        saveLanguages(languages);
        loadLanguages();
    }
}

function closeLangModal() {
    document.getElementById('lang-modal').classList.remove('show');
}

// ==================== 學校課程 ====================
let currentCourseIndex = -1;
const DEFAULT_COURSES = [
    { name: 'CS50: Introduction to Computer Science | Harvard University', desc: '哈佛大學計算機科學導論，目前進度：第三週', status: 'in-progress' },
    { name: 'CS61A: Structure and Interpretation of Computer Programs | UC Berkeley', desc: '加州大學柏克萊分校程式設計課程，尚未開始', status: 'planned' },
    { name: 'CS61B: Data Structures | UC Berkeley', desc: '加州大學柏克萊分校資料結構課程，尚未開始', status: 'planned' }
];

function getCourses() {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : DEFAULT_COURSES;
}

function saveCourses(courses) {
    localStorage.setItem('courses', JSON.stringify(courses));
}

function loadCourses() {
    const container = document.getElementById('courses-list');
    if (!container) return;

    const courses = getCourses();
    const statusLabels = {
        'completed': '已完成',
        'in-progress': '進行中',
        'planned': '計畫中'
    };

    container.innerHTML = courses.map((course, index) => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>${course.name}</h3>
                <p>${course.desc}</p>
                <span class="status ${course.status}">${statusLabels[course.status]}</span>
                <div class="item-actions">
                    <button class="edit-btn" onclick="editCourse(${index})">✏️</button>
                    <button class="delete-btn" onclick="deleteCourse(${index})">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addNewCourse() {
    currentCourseIndex = -1;
    document.getElementById('course-name').value = '';
    document.getElementById('course-desc').value = '';
    document.getElementById('course-status').value = 'in-progress';
    document.getElementById('course-modal').classList.add('show');
}

function editCourse(index) {
    const courses = getCourses();
    const course = courses[index];
    currentCourseIndex = index;
    document.getElementById('course-name').value = course.name;
    document.getElementById('course-desc').value = course.desc;
    document.getElementById('course-status').value = course.status;
    document.getElementById('course-modal').classList.add('show');
}

function saveCourse() {
    const courses = getCourses();
    const newCourse = {
        name: document.getElementById('course-name').value,
        desc: document.getElementById('course-desc').value,
        status: document.getElementById('course-status').value
    };

    if (currentCourseIndex === -1) {
        courses.unshift(newCourse);
    } else {
        courses[currentCourseIndex] = newCourse;
    }

    saveCourses(courses);
    closeCourseModal();
    loadCourses();
}

function deleteCourse(index) {
    if (confirm('確定要刪除這個課程嗎？')) {
        const courses = getCourses();
        courses.splice(index, 1);
        saveCourses(courses);
        loadCourses();
    }
}

function closeCourseModal() {
    document.getElementById('course-modal').classList.remove('show');
}

// ==================== 專案 ====================
let currentProjectIndex = -1;
const DEFAULT_PROJECTS = [
    { icon: '🌐', name: '個人網站', desc: '使用 HTML、CSS、JavaScript 打造個人部落格，記錄學習歷程。', tags: ['HTML', 'CSS', 'JavaScript'], link: 'https://github.com/RobyCHANG/JUILIN-CHANG' },
    { icon: '🀄', name: '麻將計分器', desc: '使用 TypeScript 開發的麻將計分工具，方便記錄和計算分數。', tags: ['TypeScript', 'React'], link: 'https://robychang.github.io/mahjong-score/' },
    { icon: '📝', name: '待辦事項應用', desc: '練習專案：使用 JavaScript 實作簡單的待辦事項管理功能。', tags: ['JavaScript', 'LocalStorage'], link: '' }
];

function getProjects() {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
}

function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadProjects() {
    const container = document.getElementById('projects-list');
    if (!container) return;

    const projects = getProjects();
    container.innerHTML = projects.map((project, index) => `
        <div class="project-item">
            <div class="project-icon">${project.icon}</div>
            <h3>${project.name}</h3>
            <p>${project.desc}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">查看專案 →</a>` : ''}
            <div class="item-actions">
                <button class="edit-btn" onclick="editProject(${index})">✏️</button>
                <button class="delete-btn" onclick="deleteProject(${index})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function addNewProject() {
    currentProjectIndex = -1;
    document.getElementById('project-icon').value = '';
    document.getElementById('project-name').value = '';
    document.getElementById('project-desc').value = '';
    document.getElementById('project-tags').value = '';
    document.getElementById('project-link').value = '';
    document.getElementById('project-modal').classList.add('show');
}

function editProject(index) {
    const projects = getProjects();
    const project = projects[index];
    currentProjectIndex = index;
    document.getElementById('project-icon').value = project.icon;
    document.getElementById('project-name').value = project.name;
    document.getElementById('project-desc').value = project.desc;
    document.getElementById('project-tags').value = project.tags.join(', ');
    document.getElementById('project-link').value = project.link || '';
    document.getElementById('project-modal').classList.add('show');
}

function saveProject() {
    const projects = getProjects();
    const newProject = {
        icon: document.getElementById('project-icon').value || '📁',
        name: document.getElementById('project-name').value,
        desc: document.getElementById('project-desc').value,
        tags: document.getElementById('project-tags').value.split(',').map(t => t.trim()).filter(t => t),
        link: document.getElementById('project-link').value
    };

    if (currentProjectIndex === -1) {
        projects.unshift(newProject);
    } else {
        projects[currentProjectIndex] = newProject;
    }

    saveProjects(projects);
    closeProjectModal();
    loadProjects();
}

function deleteProject(index) {
    if (confirm('確定要刪除這個專案嗎？')) {
        const projects = getProjects();
        projects.splice(index, 1);
        saveProjects(projects);
        loadProjects();
    }
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.remove('show');
}

// 點擊彈窗外部關閉
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});
