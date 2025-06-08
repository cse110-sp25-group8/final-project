/**
 * Sets up the dark mode toggle switch on page load.
 * Saves the selected theme in localStorage and restores it on reload.
 */

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('darkmode-toggle');
    if (!toggle) {
        return;
    }

    // Load saved theme preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        toggle.checked = true;
    } else {
        toggle.checked = false;
    }
 
    // Update theme when toggle changes
    toggle.addEventListener('change', () => {
        const theme = toggle.checked ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
});