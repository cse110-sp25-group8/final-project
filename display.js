import { getAllMetadata, filterMetadata } from './js/database/localStorageService.js';

let recipes = [];

function init() {
    recipes = getAllMetadata();
    displayRecipes(recipes);
}

function displayRecipes(recipes) {
    const mainSection = document.querySelector('main');

    let cardGrid = mainSection.querySelector('.card-grid');

    //if card grid doesn't exist, create it
    if (!cardGrid) {
        cardGrid = document.createElement('div');
        cardGrid.classList.add('card-grid');
        mainSection.appendChild(cardGrid);
    } else {
        //clear current recipes to show filtered ones/all
        cardGrid.innerHTML = '';
    }

    // Populate main with recipes from local storage
    recipes.forEach((recipe) => {
        const addition = document.createElement('recipe-card');
        addition.data = recipe;
        cardGrid.appendChild(addition);
    });
}

function FilterByMealType(type) {
    if (type == 'Meal') {
        return displayRecipes(recipes);
    }

    const filtered = filterMetadata({ recipeCategory: type });
    displayRecipes(filtered);
}

function FilterByCuisine(cuisine) {
    if (cuisine === 'Cuisine') {
        return displayRecipes(recipes);
    }

    const filtered = filterMetadata({ recipeCuisine: cuisine });
    displayRecipes(filtered);
}

function FilterByTime(mins) {
    if (mins == 'Estimated Time') {
        return displayRecipes(recipes);
    }

    const filtered = filterMetadata({ timeRange: mins });
    displayRecipes(filtered);
}

function FilterByFavorite() {
    const filtered = filterMetadata({ isFavorite: true });
    displayRecipes(filtered);
}

function displayFilteredRecipes(ingredients) {
    if (!ingredients || ingredients.length == 0) {
        displayRecipes(recipes);
        return;
    }

    const filtered = filterMetadata({ recipeIngredient: ingredients });
    displayRecipes(filtered);
}

export {
    init,
    displayFilteredRecipes,
    FilterByMealType,
    FilterByCuisine,
    FilterByTime,
    FilterByFavorite,
};
