import home from './pages/home.js';
import create from './pages/create-recipe.js';
import details from './pages/detail.js';
import edit from './pages/edit-recipe.js';


const routes = {
    '/': home,
    '/create': create,
    '/details': details,
    '/edit': edit,
};

export function render() {
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

export function renderEditPage(id) {
    if (!id) {
        console.log('We couldn\'t route to the edit page:(');
        return;
    }
    location.hash = `#/edit?id=${id}`;
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
