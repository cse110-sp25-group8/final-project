import { init, displayFilteredRecipes } from '../../display.js';

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

    const allRecipes=document.createElement('button');
    allRecipes.textContent='All'

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

    actions.append(allRecipes, shuffleBtn, addBtn,);
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


    const all = document.createElement('div');

    const ingredientFilterButton = document.createElement('button');
    ingredientFilterButton.className = 'btn-filter';
    ingredientFilterButton.textContent = label;
 

    const dropDown = document.createElement('div');
    dropDown.className = 'ingredient-dropdown';
    dropDown.style.display='none';

    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search Ingredients';
    searchBar.className = 'ingredient-search-bar';

    //list of ingredients 
    const resultsContainer = document.createElement('ul');
    resultsContainer.className='ingredient-results-container';
    resultsContainer.style.listStyle = 'none'; 

    dropDown.appendChild(searchBar);
    dropDown.appendChild(resultsContainer);

    // prevent clicks inside dropdown from closing it
    dropDown.addEventListener('click', (e) => {
        e.stopPropagation();
    });


    ingredientFilterButton.addEventListener('click', async function (event) {
        event.stopPropagation();

        if(dropDown.style.display ==='none'){
            
            dropDown.style.display='block';   

            const fromStorage= await getIngredients();

            resultsContainer.innerHTML='';


            for (const opt of fromStorage) {
                const option = document.createElement('input');
                option.type="checkbox";
                //unique id
                option.id=`option-${opt}`;
                option.value=opt;

                const label = document.createElement('label');
                label.htmlFor = option.id;
                label.textContent=opt;

                //monitor if checked off
                option.addEventListener('change', () => {
                    if (!option.checked) {
                        if (opcheckedOpts){
                            checkedOpts.remove(option);
                        }
                    }else if (option.checked){
                        checkedOpts.append(options)
                    }
                    displayFilteredRecipes(checkedOpts);
                })
                
                option.style.cursor='pointer';
                option.style.padding='8px';
                resultsContainer.appendChild(option);
                resultsContainer.appendChild(label);
            }

        }else{
            dropDown.style.display='none';
        }
    });

 

    searchBar.addEventListener('input', function (event) {
        renderResults(searchBar.value);
    });

    // TODO: render the ingredient results based on search
    function renderResults(searchTarget = '') {
        const searchValue = searchTarget.toLowerCase().trim();
        const items = resultsContainer.querySelectorAll('li');
        items.forEach((item) => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // TODO: handle the search
    searchBar.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const searchValue = searchBar.value.toLowerCase().trim();
            if (searchValue) {
                displayFilteredRecipes(searchValue);
                dropDown.style.display = 'none';
            }
        }
    });

    // get Ingredient tags from the localStorage->recipeIngredient.name
    async function getIngredients() {
        const recipeMetadata = localStorage.getItem('recipe_metadata');
        if (!recipeMetadata) {return [];}

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
                        {uniqueIngredients.add(
                            ingredient.name.trim().toLowerCase()
                        );} // right now it will store as lowercases
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

    all.appendChild(ingredientFilterButton);
    all.appendChild(dropDown);
    return all;
}
