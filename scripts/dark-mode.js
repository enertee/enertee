const toggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Beim Laden prüfen, ob bereits eine Einstellung gespeichert ist
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
toggle.checked = savedTheme === 'dark';

// Event-Listener für den Switch
toggle.addEventListener('change', function() {
    if(this.checked) {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});