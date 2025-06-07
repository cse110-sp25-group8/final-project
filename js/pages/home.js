import { init, displayFilteredRecipes, FilterByMealType, FilterByCuisine, FilterByTime} from '../../display.js';

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

    const selectedMeal=mealFilter.querySelector('select');

    selectedMeal.addEventListener('change', (e) =>{
        const currMeal=e.target.value;
        if(currMeal==''){
            init();
        }else{
            FilterByMealType(currMeal);
        }
       
       
    })

    const cuisineFilter = createFilter('filter2', 'Cuisine', [
        'African',
        'Asian',
        'European',
        'Latin American',
        'Middle Eastern',
        'North American',
    ]);

    const selectedCuisine=cuisineFilter.querySelector('select');

    selectedCuisine.addEventListener('change', (e) =>{
        const currCuisine=e.target.value;
        if(currCuisine==''){
            init();
        }else{
            FilterByCuisine(currCuisine);
        }
    })
    const timeFilter = createFilter('filter3', 'Estimated Time', [
        'Under 30 minutes',
        'Under 1 Hour',
        'Over 1 Hour',
    ]);
    
    const time=timeFilter.querySelector('select');

    time.addEventListener('change', (e) =>{
        const currTime=e.target.value;
        if(currTime==''){
            init();
        }else{
            FilterByTime(currTime);
        }
    })

    const ingredientsFilter = createIngredientFilter('filter4', 'Ingredients');


    filters.append(mealFilter, cuisineFilter, timeFilter, ingredientsFilter);
    section.append(filters);

    // main for card grid
    const main = document.createElement('main');
    section.appendChild(main);

    const actions = document.createElement('div');
    actions.className = 'actions';


    const addBtn = document.createElement('button');
    addBtn.className = 'btn-add';
    addBtn.textContent = 'Add Recipe Card';
    addBtn.addEventListener('click', () => {
        location.hash = '#/create';
    });

    actions.append( addBtn);
    section.append(actions);

    // mobile icons have same functionality as "normal" action buttons
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
    dropDown.style.display = 'none';

    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search Ingredients';
    searchBar.className = 'ingredient-dropdown-search-bar';

    //list of ingredients
    const resultsContainer = document.createElement('ul');
    resultsContainer.className = 'ingredient-results-container';
    resultsContainer.style.listStyle = 'none';

    // container for selected tags
    const selectedTagsContainer = document.createElement('div');
    selectedTagsContainer.className = 'ingredient-tags-container';

    dropDown.appendChild(searchBar);
    dropDown.appendChild(resultsContainer);
    dropDown.appendChild(selectedTagsContainer);

    // prevent clicks inside dropdown from closing it
    dropDown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    const selectedIngredients = new Set(); // track the selected ingredient (max 3)
    ingredientFilterButton.addEventListener('click', async function (event) {
        event.stopPropagation();

        if (dropDown.style.display === 'none') {
            dropDown.style.display = 'block';
            const fromStorage = await getIngredients();
            resultsContainer.innerHTML = '';

            for (const opt of fromStorage) {
                const option = document.createElement('li');
                option.textContent = opt;
                option.dataset.value = opt; // this behaves like unique id. it sets the data-value attribute to the <li> tag

                if (selectedIngredients.has(opt)) {
                    // mark as selected if already selected
                    option.classList.add('selected');
                }
                option.addEventListener('click', () => {
                    if (selectedIngredients.has(opt)) {
                        // if already selected and gets clicked again
                        selectedIngredients.delete(opt);
                        option.classList.remove('selected');
                        removeTag(opt);
                    } else if (selectedIngredients.size < 3) {
                        selectedIngredients.add(opt);
                        option.classList.add('selected');
                        addTag(opt);
                    }
                });
                resultsContainer.appendChild(option);
            }
        } else {
            dropDown.style.display = 'none';
        }
    });

    function addTag(opt) {
        const tag = document.createElement('div');
        tag.className = 'ingredient-tag';
        tag.dataset.value = opt;
        const tagText = document.createElement('span');
        tagText.textContent = opt;

        // This is for the making the tag as symbol, handles the click to remove event as well
        const removeButton = document.createElement('button');
        // 'x' symbol / html entities
        removeButton.innerHTML = '&times;'; 
        removeButton.addEventListener('click', function (event) {
            event.stopPropagation();
            selectedIngredients.delete(opt);

            const itemList = resultsContainer.querySelector(
                `li[data-value="${opt}"]`
            );
            if (itemList) {
                itemList.classList.remove('selected');
            }
            tag.remove();
            displayFilteredRecipes(Array.from(selectedIngredients));
        });
        tag.appendChild(tagText);
        tag.appendChild(removeButton);
        selectedTagsContainer.appendChild(tag);
        displayFilteredRecipes(Array.from(selectedIngredients));
    }

    function removeTag(opt) {
        const tag = selectedTagsContainer.querySelector(
            // this is the format of how data-value is being assigned
            `.ingredient-tag[data-value="${opt}"]` 
        );
        if (tag) {
            selectedIngredients.delete(opt);
            tag.remove();
            displayFilteredRecipes(Array.from(selectedIngredients));
        }
    }

    // render the ingredient results based on typing
    searchBar.addEventListener('input', function (event) {
        renderResults(searchBar.value);
    });
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

    // render the ingredients based on search enter
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
        if (!recipeMetadata) {
            return [];
        }

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
                        ) {
                            uniqueIngredients.add(
                                ingredient.name.trim().toLowerCase()
                            );
                        } // right now it will store as lowercases
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
