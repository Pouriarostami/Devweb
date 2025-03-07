// Initialize data in localStorage if it doesn't exist
function initializeData() {
    if (!localStorage.getItem('customers')) {
        localStorage.setItem('customers', JSON.stringify([]));
    }
    if (!localStorage.getItem('reminders')) {
        localStorage.setItem('reminders', JSON.stringify([]));
    }
    if (!localStorage.getItem('contracts')) {
        localStorage.setItem('contracts', JSON.stringify([]));
    }
    if (!localStorage.getItem('expenses')) {
        localStorage.setItem('expenses', JSON.stringify([]));
    }
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'default');
    }
}

// Update date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    
    // Convert to Persian date using Intl
    const persianDate = new Intl.DateTimeFormat('fa-IR', options).format(now);
    
    document.getElementById('date-time').textContent = persianDate;
}

// Format number with commas
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Set current year in footer
function setCurrentYear() {
    const year = new Date().getFullYear();
    const persianYear = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date());
    document.getElementById('current-year').textContent = persianYear;
}

// Theme switcher functionality
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeOptions = document.querySelector('.theme-options');
    const themeOptionBtns = document.querySelectorAll('.theme-option');
    
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'default';
    if (savedTheme !== 'default') {
        document.body.classList.add(`theme-${savedTheme}`);
    }
    
    themeToggle.addEventListener('click', () => {
        themeOptions.classList.toggle('show');
    });
    
    themeOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            
            // Remove all theme classes
            document.body.classList.remove('theme-blue', 'theme-green', 'theme-purple');
            
            // Add selected theme class if not default
            if (theme !== 'default') {
                document.body.classList.add(`theme-${theme}`);
            }
            
            // Save theme preference
            localStorage.setItem('theme', theme);
            
            // Hide theme options
            themeOptions.classList.remove('show');
        });
    });
    
    // Close theme options when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeToggle.contains(e.target) && !themeOptions.contains(e.target)) {
            themeOptions.classList.remove('show');
        }
    });
}

// Modal functionality
function initModals() {
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close');
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    setCurrentYear();
    initThemeSwitcher();
    initModals();
});

// Get data from localStorage
function getCustomers() {
    return JSON.parse(localStorage.getItem('customers') || '[]');
}

function getReminders() {
    return JSON.parse(localStorage.getItem('reminders') || '[]');
}

function getContracts() {
    return JSON.parse(localStorage.getItem('contracts') || '[]');
}

function getExpenses() {
    return JSON.parse(localStorage.getItem('expenses') || '[]');
}

// Save data to localStorage
function saveCustomers(customers) {
    localStorage.setItem('customers', JSON.stringify(customers));
}

function saveReminders(reminders) {
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

function saveContracts(contracts) {
    localStorage.setItem('contracts', JSON.stringify(contracts));
}

function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Format date to Persian
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR').format(date);
}

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Check if a date is today
function isToday(dateString) {
    const today = getTodayDate();
    return dateString === today;
}

// Check if a date is in the future
function isFuture(dateString) {
    const today = new Date(getTodayDate());
    const date = new Date(dateString);
    return date > today;
}

// Check if a date is in the past
function isPast(dateString) {
    const today = new Date(getTodayDate());
    const date = new Date(dateString);
    return date < today;
}

