import { getAllMetadata, filterMetadata } from './js/database/localStorageService.js';

let recipes = [];

/**
 * Initializes the recipe view by loading metadata and displaying recipes.
 */
function init() {
    recipes = getAllMetadata();
    displayRecipes(recipes);
}

/**
 * Renders recipe cards in the main section.
 * 
 * @param {Array<Object>} recipes - Array of recipe metadata objects.
 */
function displayRecipes(recipes){

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




/**
 * Filters and displays recipes that include a specific ingredient.
 * 
 * @param {string} ingredient - Ingredient to filter recipes by.
 */
function displayFilteredRecipes(ingredient){
    const filtered=recipes.filter(recipe=>
        recipe.recipeIngredient && recipe.recipeIngredient.some(x => x.name.toLowerCase() === ingredient.toLowerCase())
    );
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

/**
 * (Unused) Gets recipe data from localStorage.
 * 
 * @returns {Array<Object>} Array of recipes or empty array if none found.
 */
function getFromStorage() {
    const cards = JSON.parse(localStorage.getItem('recipe'));
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
