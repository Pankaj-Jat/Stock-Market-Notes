// Module data
const modules = [
    { id: 1, title: "Introduction to Stock Markets", file: "Module 1 - Introduction to Stock Markets.html" },
    { id: 2, title: "Technical Analysis", file: "Module 2 Technical Analysis.html" },
    { id: 3, title: "Fundamental Analysis", file: "Module 3 Fundamental Analysis.html" },
    { id: 4, title: "Futures Trading", file: "Module 4 Futures Trading.html" },
    { id: 5, title: "Options Theory", file: "Module 5 Options Theory.html" },
    { id: 6, title: "Options Strategies", file: "Module 6 Options Strategies.html" },
    { id: 7, title: "Markets & Taxation", file: "Module 7 Markets & Taxation.html" },
    { id: 8, title: "Currency and Commodity Futures", file: "Module 8 Currency and Commodity Futures.html" },
    { id: 9, title: "Risk Management & Trading Psychology", file: "Module 9 Risk Management & Trading Psychology.html" },
    { id: 10, title: "Personal Finance", file: "Module 10 Personal Finance.html" }
];

// DOM Elements
const moduleList = document.querySelector('.module-list');
const contentArea = document.getElementById('content-area');
const searchInput = document.getElementById('search');
const themeToggle = document.getElementById('theme-toggle');

// Initialize theme
let isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', isDarkMode);
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Create module links
function createModuleLinks(modulesToShow = modules) {
    moduleList.innerHTML = '';
    modulesToShow.forEach(module => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = module.title;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadModule(module);
            // Update active state
            document.querySelectorAll('.module-list a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
            
            // Hide sidebar for both desktop and mobile
            const sidebar = document.querySelector('.sidebar');
            const content = document.querySelector('.content');
            const backButton = document.querySelector('.mobile-back-btn');
            
            sidebar.classList.add('hidden');
            content.classList.add('sidebar-hidden');
            backButton.classList.add('visible');
        });
        moduleList.appendChild(link);
    });
}

// Add back button functionality
function addBackButton() {
    // Remove existing back button if any
    const existingButton = document.querySelector('.mobile-back-btn');
    if (existingButton) {
        existingButton.remove();
    }

    const contentArea = document.getElementById('content-area');
    const backButton = document.createElement('button');
    backButton.className = 'mobile-back-btn';
    backButton.innerHTML = '<i class="fas fa-bars"></i> Show Menu';
    
    backButton.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar');
        const content = document.querySelector('.content');
        sidebar.classList.remove('hidden');
        content.classList.remove('sidebar-hidden');
        backButton.classList.remove('visible');
    });
    
    document.body.appendChild(backButton);
    return backButton;
}

// Load module content
function loadModule(module) {
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    
    iframe.onerror = () => {
        contentArea.innerHTML = `
            <div class="error">
                <h2>Error loading module</h2>
                <p>Unable to load the module content. Please try again later.</p>
            </div>
        `;
    };

    iframe.src = module.file;
    contentArea.innerHTML = '';
    
    // Ensure back button exists
    let backButton = document.querySelector('.mobile-back-btn');
    if (!backButton) {
        backButton = addBackButton();
    }
    backButton.classList.add('visible');
    
    contentArea.appendChild(iframe);
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredModules = modules.filter(module => 
        module.title.toLowerCase().includes(searchTerm)
    );
    createModuleLinks(filteredModules);
});

// Handle window resize
window.addEventListener('resize', () => {
    const backButton = document.querySelector('.mobile-back-btn');
    if (backButton) {
        backButton.style.display = window.innerWidth <= 768 ? 'block' : 'none';
    }
});

// Initialize the page
createModuleLinks();
addBackButton(); // Add the back button on page load
