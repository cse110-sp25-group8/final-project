 import { RecipeStore } from './js/database/RecipeStore.js';

const RECIPE_STORE = new RecipeStore();

function init() {
    //populate main with recipe from local storage
    console.log('[init] running...');
    handleCreate();
}

function handleCreate() {
    const INSTRUCTIONS_KEY = 'recipeInstructions';
    const TOTAL_TIME_KEY = 'totalTime';

    const form = document.getElementsByClassName('parent')[0];

    console.log(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let formData = new FormData(form);

        // Populating Card Object
        let cardObject = {};
        for (const [key, value] of formData) {
            // Handle recipe steps to be an array
            if (key.startsWith('step')) {
                const instructionObject = { text: value };
                if (!Array.isArray(cardObject[INSTRUCTIONS_KEY])) {
                    cardObject[INSTRUCTIONS_KEY] = [];
                } 
                cardObject[INSTRUCTIONS_KEY].push(instructionObject);
            } else {
                cardObject[key] = value;
            }
        }

        // Calculate totalTime metric
        let totalTime = parseInt(formData.get('cookTime'), 10) + parseInt(formData.get('prepTime'), 10);
        cardObject[TOTAL_TIME_KEY] = totalTime;

        const recipeCard = document.createElement('recipe-card');
        recipeCard.data = cardObject;

        const currentId = await RECIPE_STORE.addRecipe(cardObject);
        
        location.hash = '#/';   
    });


}

export { init };


