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
/**
 * @typedef {Object} routes
 * @property {Function} '/' Route to home page
 * @property {Function} '/create' Route to create a recipe page
 * @property {Function} '/details' Route to viewing a recipe page
 */

/**
 * This function renders the home page and reroutes to the correct pages through the URL
 */
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

/**
 * This function reroutes to the details page(viewing the recipe).
 * @param {string} id 
 * @returns {null} returns nothing if recipe id is invalid
 */
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
