import { RecipeStore } from './js/database/RecipeStore.js';

const RECIPE_STORE = new RecipeStore();

/**
 * Initializes the recipe creation page and sets up form handling.
 */

function init() {
    //populate main with recipe from local storage
    console.log('[init] running...');
    handleCreate();
}

/**
 * Handles form submission, builds recipe object, and saves it to storage.
 */
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
                const instructionObject = { text: value };
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

            } else if (key === 'image') {
                const doesRecipeExist = Number(formData.get('recipeId'));
                const imageFile = formData.get('image');

                if (doesRecipeExist) {
                    if (imageFile && imageFile.name) {
                        // use new image 
                        cardObject.image = value;
                    } else {
                        // get old image
                        const oldImage = await RECIPE_STORE.getRecipeImageURL(doesRecipeExist);
                        cardObject.image = oldImage;
                    }
                } else {
                    cardObject.image = value;
                }
            }

            else {
                cardObject[key] = value;
            }
        }

        // Calculate totalTime metric
        let totalTime = parseInt(formData.get('cookTime'), 10) + parseInt(formData.get('prepTime'), 10);
        cardObject[TOTAL_TIME_KEY] = totalTime;

        const recipeCard = document.createElement('recipe-card');
        console.log('SETTING RECIPE CARD ELEMENT =');
        console.log(cardObject);
        recipeCard.data = cardObject;

        const recipeId = Number(formData.get('recipeId'));
        console.log(recipeId);
        if (recipeId) {
            // Update existing recipe
            console.log(">>>>>>>>> Editing recipe <<<<<<<<<<");
            console.log(cardObject);
            await RECIPE_STORE.updateRecipe(recipeId, cardObject);
            console.log(">>>>>>>>> FINISH editing recipe <<<<<<<<<<");
        } else {
            // Add new recipe
            console.log(">>> Adding recipe");
            await RECIPE_STORE.addRecipe(cardObject);
        }

        console.log("AFTER COLLECTING FORM DATA");
        console.log(cardObject);

        location.hash = '#/';
    });


}

export { init };


