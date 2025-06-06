import home from './pages/home.js';
import create from './pages/create-recipe.js';
import details from './pages/detail.js';

const routes = {
    '/': home,
    '/create': create,
    '/details': details,
};

function render() {
    const hash = location.hash.replace('#', '') || '/';
    const path = hash.split('?')[0];
    const page =
        routes[path] ||
        (() => {
            const error = document.createElement('h1');
            error.textContent = '404 Not Found';
            return error;
        });

    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(page());
}

export function renderCardDetails(id) {
    if (!id) {
        console.log('We couldn\'t route to the recipe:(');
        return;
    }
    location.hash = `#/details?id=${id}`;
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
