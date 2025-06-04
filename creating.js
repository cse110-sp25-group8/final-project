import { RecipeStore } from './js/database/RecipeStore.js';

const RECIPE_STORE = new RecipeStore();

function init() {
    //populate main with recipe from local storage
    console.log('[init] running...');
    handleCreate();
}

function handleCreate() {
    const INSTRUCTIONS_KEY = 'recipeInstructions';
    const INGREDIENTS_KEY = 'recipeIngredient';
    const TOTAL_TIME_KEY = 'totalTime';

    const form = document.getElementsByClassName('parent')[0];

    console.log(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let formData = new FormData(form);

        // Populating Card Object
        let cardObject = {};
        let currentIngredient = { 
            quantity: '', 
            units: 0,
            name: ''     
        };

        cardObject[INGREDIENTS_KEY] = [];
        cardObject[INSTRUCTIONS_KEY] = [];
        for (const [key, value] of formData) {
            // Handle recipe steps to be an array
            if (key.startsWith('step')) {
                const instructionObject = { text : value };
                cardObject[INSTRUCTIONS_KEY].push(instructionObject);
            } else if (key.startsWith('ingredient')) {
                // We will know we have THREE input fields for ingredients
                const [prefix, suffix] = key.split('-');
                if (suffix === 'quantity') {
                    currentIngredient = { quantity: '', units: '', name: '' };
                    currentIngredient.quantity = value;
                } else if (suffix === 'unit') {
                    currentIngredient.units = value;
                } else if (suffix === 'name') {
                    currentIngredient.name = value;
                    cardObject[INGREDIENTS_KEY].push(currentIngredient);
                }
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
        console.log(cardObject);
        
        location.hash = '#/';   
    });


}

export { init };


