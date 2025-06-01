import { init } from '../../display.js';

export default function () {
    requestAnimationFrame(() => {
        init();
    });

    // Mobile search and icon row
    const headerSearch = document.querySelector('.top-nav .search-bar');
    const searchClone = headerSearch.cloneNode(true);

    const mobileSearchActions = document.createElement('div');
    mobileSearchActions.className = 'mobile-search-actions';
    mobileSearchActions.appendChild(searchClone);

    // small icons
    const mobileActions = document.createElement('div');
    mobileActions.className = 'mobile-actions';

    const shuffleIcon = document.createElement('button');
    shuffleIcon.id = 'shuffle-icon';
    shuffleIcon.textContent = '🔀';

    const addIcon = document.createElement('button');
    addIcon.id = 'add-icon';
    addIcon.textContent = '➕';

    mobileActions.append(shuffleIcon, addIcon);
    mobileSearchActions.appendChild(mobileActions);

    const siteHeader = document.querySelector('.site-header');
    siteHeader.insertAdjacentElement('afterend', mobileSearchActions);

    const section = document.createElement('section');
    section.className = 'sub-nav';

    const filters = document.createElement('ul');
    filters.className = 'filters';

    const mealFilter = createFilter('filter1', 'Meal', [
        'Breakfast',
        'Lunch',
        'Dinner',
        'Dessert',
        'Snack',
        'Beverage',
    ]);
    const cuisineFilter = createFilter('filter2', 'Cuisine', [
        'African',
        'Asian',
        'European',
        'Latin American',
        'Middle Eastern',
        'North American',
    ]);
    const timeFilter = createFilter('filter3', 'Estimated Time', [
        'Under 30 minutes',
        'Under 1 Hour',
        'Over 1 Hour',
    ]);
    const ingredientsFilter = createIngredientFilter('filter4', 'Ingredients');

    filters.append(mealFilter, cuisineFilter, timeFilter, ingredientsFilter);
    section.append(filters);

    // main for card grid
    const main = document.createElement('main');
    section.appendChild(main);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const shuffleBtn = document.createElement('button');
    shuffleBtn.className = 'btn-shuffle';
    shuffleBtn.textContent = 'Shuffle';
    shuffleBtn.addEventListener('click', () => {
        // put shuffleing logic here
    });

    const addBtn = document.createElement('button');
    addBtn.className = 'btn-add';
    addBtn.textContent = 'Add Recipe Card';
    addBtn.addEventListener('click', () => {
        location.hash = '#/create';
    });

    actions.append(shuffleBtn, addBtn);
    section.append(actions);

    // mobile icons have same functionality as "normal" action buttons
    shuffleIcon.addEventListener('click', () => shuffleBtn.click());
    addIcon.addEventListener('click', () => addBtn.click());

    return section;
}

function createFilter(name, label, options) {
    const li = document.createElement('li');
    const select = document.createElement('select');
    select.className = 'btn-filter';
    select.name = name;

    const defaultOption = document.createElement('option');
    defaultOption.disabled = false;
    defaultOption.selected = true;
    defaultOption.textContent = label;
    defaultOption.value = '';
    select.appendChild(defaultOption);

    for (const opt of options) {
        const option = document.createElement('option');
        option.textContent = opt;
        option.value = opt;
        select.appendChild(option);
    }

    li.appendChild(select);
    return li;
}

function createIngredientFilter(name, label) {
    const li = document.createElement('li');

    const ingredientFilterContainer = document.createElement('button');
    ingredientFilterContainer.className = 'btn-filter';
    ingredientFilterContainer.textContent = label;
    ingredientFilterContainer.name = name; // don't need this, but heals my OCD:)

    const dropDown = document.createElement('div');
    dropDown.className = 'ingredient-dropdown';

    // prevent clicks inside dropdown from closing it
    dropDown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search Ingredients';
    searchBar.className = 'ingredient-search-bar';

    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'ingredient-results-container';

    // TODO: Toggle dropdown when the users click the button
    ingredientFilterContainer.addEventListener('click', function (event) {
        event.stopPropagation();
        // TODO
    });

    searchBar.addEventListener('input', function (event) {
        renderResults(searchBar.value);
    });

    // TODO: render the ingredient results based on search
    function renderResults(searchTarget = '') {
        // TODO
    }

    // TODO: handle the search
    searchBar.addEventListener('keypress', function (event) {
        // TODO
    });

    // get Ingredient tags from the localStorage->recipeIngredient.name
    async function getIngredients() {
        const recipeMetadata = localStorage.getItem('recipe_metadata');
        if (!recipeMetadata) return [];

        try {
            const recipes = JSON.parse(recipeMetadata);
            const uniqueIngredients = new Set();
            recipes.forEach((recipe) => {
                if (
                    recipe.recipeIngredient &&
                    Array.isArray(
                        recipe.recipeIngredient && recipe.recipeIngredient
                    )
                ) {
                    recipe.recipeIngredient.forEach((ingredient) => {
                        if (
                            ingredient &&
                            ingredient.name &&
                            typeof ingredient.name === 'string' &&
                            ingredient.name.trim() !== ''
                        )
                            uniqueIngredients.add(
                                ingredient.name.trim().toLowerCase()
                            ); // right now it will store as lowercases
                    });
                }
            });
            return Array.from(uniqueIngredients).sort();
        } catch (error) {
            console.error(
                'Error parsing recipe metadata for Ingredients filter',
                error
            );
            return [];
        }
    }

    // close dropdown on clicking anything outside of the box container
    document.addEventListener('click', () => {
        dropDown.style.display = 'none';
    });

    dropDown.appendChild(searchBar);
    dropDown.appendChild(resultsContainer);
    li.appendChild(ingredientFilterContainer);
    return li;
}
