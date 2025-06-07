// Need to change from localStorage to IndexDB
import { getAllMetadata } from './js/database/localStorageService.js';

let recipes = [];

function init() {
    // let recipes = getFromStorage();
    recipes = getAllMetadata();
    displayRecipes(recipes);
}

function displayRecipes(recipes) {
    console.log(recipes);
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
        console.log(addition.data);
        cardGrid.appendChild(addition);
    });
}

function FilterByMealType(type){
    if (type=="Meal"){
        return displayRecipes(recipes);
    }

    const filtered=recipes.filter(
        (recipe) =>
            recipe.recipeCategory && 
            recipe.recipeCategory.toLowerCase()==type.toLowerCase()
    );
   
    displayRecipes(filtered);
}

function FilterByCuisine(cuisine){
    console.log(cuisine);
    if(cuisine==="Cuisine"){
        console.log(cuisine);
        return displayRecipes(recipes);
    }

    const filtered=recipes.filter(
        (recipe) =>
            recipe.recipeCuisine && 
            recipe.recipeCuisine.toLowerCase()==cuisine.toLowerCase()
    );
   
    displayRecipes(filtered);
}

function FilterByTime(mins){
    if(mins=="Estimated Time"){
        displayRecipes(recipes);
    }

    console.log(mins);
    let filtered=[];

    if (mins=="Under 30 minutes"){
        filtered=recipes.filter(
        (recipe) =>
            recipe.totalTime && 
            parseInt(recipe.totalTime)<30
        );
    }else if (mins=="Under 1 Hour"){
        filtered=recipes.filter(
        (recipe) =>
            recipe.totalTime && 
            parseInt(recipe.totalTime)<60
        );
    }else if (mins=="Over 1 Hour"){
        console.log("here")
        filtered=recipes.filter(
        (recipe) =>
            recipe.totalTime && 
            parseInt(recipe.totalTime)>60
        );
    }
   
    console.log("After", filtered);
    displayRecipes(filtered);
}


function displayFilteredRecipes(ingredients) {

    if (!ingredients || ingredients.length == 0) {
        displayRecipes(recipes);
        return;
    }

    const filtered = recipes.filter(
        (recipe) =>
            recipe.recipeIngredient &&
            ingredients.some((ingredient) =>
                recipe.recipeIngredient.some(
                    (x) => x.name.toLowerCase() == ingredient.toLowerCase()
                )
            )
    );

    displayRecipes(filtered);
}

export { init, displayFilteredRecipes, FilterByMealType, FilterByCuisine, FilterByTime };
