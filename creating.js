 import { RecipeStore } from './js/database/RecipeStore.js';

const RECIPE_STORE = new RecipeStore();

function init() {
    //populate main with recipe from local storage
    console.log('[init] running...');
    handleCreate();
}

function handleCreate() {
    const form = document.getElementsByClassName('parent')[0];

    console.log(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let formData = new FormData(form);

        // Populating Card Object
        let cardObject = {};
        for (const [key, value] of formData) {
            cardObject[key] = value;
        }

        // Calculate totalTime metric
        let totalTime = parseInt(formData.get('cookTime'), 10) + parseInt(formData.get('prepTime'), 10);
        cardObject['totalTime'] = totalTime;

        const recipeCard = document.createElement('recipe-card');
        recipeCard.data = cardObject;

        // let storedCards = getFromStorage();
        // storedCards.push(cardObject);
        // localStorage.setItem('recipe', JSON.stringify(storedCards));
        // console.log("Running addRecipe ==> IndexedDB...");
        const currentId = await RECIPE_STORE.addRecipe(cardObject);
        // console.log("Current recipe ID = ", currentId);
        
        location.hash = '#/';   
    });


}

export { init };


