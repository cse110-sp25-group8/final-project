import { RecipeStore } from './js/database/RecipeStore.js';

const RECIPE_STORE = new RecipeStore();

function init() {
    //populate main with recipe from local storage
    console.log('[init] running...');
    handleCreate();
}

// function getFromStorage() {
//     const cards = JSON.parse(localStorage.getItem('recipe'));

//     if (cards === null) {
//         return [];
//     } else {
//         return cards;
//     }
// }

function handleCreate() {
    const form = document.getElementsByClassName('parent')[0];

    console.log(form);

    form.addEventListener('submit', async (e) => {
        // e.preventDefault();

        console.log('running');

        let formData = new FormData(form);
        console.log('form:', formData.get('Text'));

        let cardObject = {};
        for (const [key, value] of formData) {
            console.log("Hello world");
            cardObject[key] = value;
        }
        console.log(cardObject);

        const recipeCard = document.createElement('recipe-card');
        recipeCard.data = cardObject;

        // let storedCards = getFromStorage();
        // storedCards.push(cardObject);
        // localStorage.setItem('recipe', JSON.stringify(storedCards));
        console.log("Running addRecipe ==> IndexedDB...");
        const currentId = await RECIPE_STORE.addRecipe(cardObject);
        console.log("Current recipe ID = ", currentId);
        
        location.hash = '#/';
    });


}

export { init };


