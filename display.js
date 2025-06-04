// Need to change from localStorage to IndexDB
import { getAllMetadata } from './js/database/localStorageService.js';

function init() {
    // let recipes = getFromStorage();
    const recipes = getAllMetadata();
    const mainSection = document.querySelector('main');
    console.log('main elem: ', mainSection);
    console.log(recipes);

    const cardGrid = document.createElement('div');
    cardGrid.classList.add('card-grid');

    // Populate main with recipies from local storage
    recipes.forEach((recipe) => {
        const addition = document.createElement('recipe-card');
        addition.data = recipe;
        console.log(addition.data);

        cardGrid.appendChild(addition);
    });

    mainSection.appendChild(cardGrid);

}

function getFromStorage() {
    const cards = JSON.parse(localStorage.getItem('recipe'));

    if (cards === null) {
        return [];
    } else {
        return cards;
    }
}

export { init };
