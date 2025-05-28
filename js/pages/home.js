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
        'Desserts',
        'Snacks',
        'Beverages',
    ]);
    const cuisineFilter = createFilter('filter2', 'Cuisine', [
        'Asian',
        'European',
        'Latin American',
        'African',
        'Middle Eastern',
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
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = label;
    select.appendChild(defaultOption);

    for (const opt of options) {
        const option = document.createElement('option');
        option.textContent = opt;
        select.appendChild(option);
    }

    li.appendChild(select);
    return li;
}

function createIngredientFilter(name, label) {
    const li = document.createElement('li');

    // const ingredientFilterContainer = document.createElement('button');
    // ingredientFilterContainer.className = 'btn-filter';
    // ingredientFilterContainer.textContent = label;

    // get "ingredients" from localStorage
    const rawIngredientsList = localStorage.getItem('ingredients');
    const ingredientsList = rawIngredientsList
        ? JSON.parse(rawIngredientsList)
        : [];

    // create search_bar
    const search_bar = document.createElement('input');
    search_bar.className = 'btn-filter';
    search_bar.name = name;
    search_bar.placeholder = 'Search Ingredients';

    search_bar.addEventListener('keypress', function (event) {
        let newTag = '';
        if (event.key === 'Enter') {
            let toAdd = search_bar.value;
            for (let x in ingredientsList) {
                if (x === toAdd) {
                    newTag = x;
                }
            }
        }
        console.log(newTag);
    });

    // li.appendChild(ingredientFilterContainer);
    li.appendChild(search_bar);
    return li;
}
