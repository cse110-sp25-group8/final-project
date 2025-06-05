// Need to change from localStorage to IndexDB
import { getAllMetadata } from './js/database/localStorageService.js';

let recipes=[];

function init() {
    // let recipes = getFromStorage();
    recipes = getAllMetadata();
    displayRecipes(recipes);
   
}

function displayRecipes(recipes){
    const mainSection = document.querySelector('main');
    console.log('main elem: ', mainSection);
    console.log(recipes);

    let cardGrid=mainSection.querySelector('.card-grid');

    //if card grid doesn't exist, create it
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

//todo: 
function displayFilteredRecipes(ingredients){
    filteredRecipes=[];
    for(x in ingredients){
       
    }
    const filtered=recipes.filter(recipe=>
        recipe.recipeIngredient && recipe.recipeIngredient.some(x => x.name.toLowerCase() === ingredient.toLowerCase())
    );

    displayRecipes(filtered);
    
}

export { init, displayFilteredRecipes };
