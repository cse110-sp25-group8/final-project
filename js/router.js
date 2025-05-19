import home from './pages/home.js';
import create from './pages/create-recipe.js';
import details from './pages/detail.js';

const routes = {
    '/': home,
    '/create': create,
    '/details': details,
}

// update path and page content according to route, if error "404 not found"
function render() {
    const path = location.hash.replace('#', '') || '/';
    const page = routes[path] || (() => '<h1>404 Not Found</h1>');
    const app = document.getElementById("app");
    app.innerHTML = page();
}
window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);