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

        const cookTime = parseInt(formData.get('cookTime'), 10);
        const calories = parseInt(formData.get("calories"), 10);
        let   prepTime = parseInt(formData.get('prepTime'), 10);

        // INPUT VALIDATOR        
        if (isNaN(prepTime)) {
            formData.set("prepTime", 0);
            prepTime = 0;
        }
        let isConditionMet = true;
        if (isNaN(cookTime))
        {
            alert("Cook time cannot be blank.");
            isConditionMet = false;
        }
        if (cookTime <= 0 || !Number.isInteger(cookTime)) {
            alert("Cook time must be strictly positive whole numbers.");
            isConditionMet = false;
        }
        if (prepTime < 0 || !Number.isInteger(prepTime))
        {
            alert("Prep time must be strictly positive whole numbers.");
            isConditionMet = false;
        }
        if (!isNaN(calories)) {
            if (calories < 0 || !Number.isInteger(calories)) {
                alert("Calories must be strictly positive whole numbers.");
                isConditionMet = false;
            }
        }

        // console.log(cookTime);
        // console.log(prepTime);
        // console.log(calories);

        if (!isConditionMet)
            return;

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


