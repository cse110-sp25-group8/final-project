document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("darkmode-toggle");
    if (!toggle) return;

    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
        toggle.checked = true;
    }
    else 
    {
        toggle.checked = false;
    }

    toggle.addEventListener("change", () => {
        const theme = toggle.checked ? "dark" : "light";
        localStorage.setItem("theme", theme);
    });
});