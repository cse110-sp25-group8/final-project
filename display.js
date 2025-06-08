// Need to change from localStorage to IndexDB
import { getAllMetadata } from './js/database/localStorageService.js';

let recipes=[];

/**
 * Initializes the recipe view by loading metadata and displaying recipes.
 */
function init() {
    // let recipes = getFromStorage();
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
    console.log('main elem: ', mainSection);
    console.log(recipes);

    let cardGrid=mainSection.querySelector('.card-grid');

    //if card grid doesn't exsist, create it
    if(!cardGrid){
        cardGrid = document.createElement('div');
        cardGrid.classList.add('card-grid');
        mainSection.appendChild(cardGrid);

    }else{
        //clear current recipes to show filtered ones/all
        cardGrid.innerHTML='';
    }

    // Populate main with recipies from local storage
    recipes.forEach((recipe) => {
        const addition = document.createElement('recipe-card');
        addition.data = recipe;
        console.log(addition.data);
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

    displayRecipes(filtered);
    

}

/**
 * (Unused) Gets recipe data from localStorage.
 * 
 * @returns {Array<Object>} Array of recipes or empty array if none found.
 */
function getFromStorage() {
    const cards = JSON.parse(localStorage.getItem('recipe'));

    if (cards === null) {
        return [];
    } else {
        return cards;
    }
}

export { init, displayFilteredRecipes };
