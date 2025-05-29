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

    const mealFilter = createFilter('filter1', 'Meal', ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Beverage']);
    const cuisineFilter = createFilter('filter2', 'Cuisine', ['African', 'Asian', 'European', 'Latin American', 'Middle Eastern', 'North American']);
    const timeFilter = createFilter('filter3', 'Estimated Time', ['Under 30 minutes', 'Under 1 Hour', 'Over 1 Hour']);
    const ingredientsFilter = createFilter('filter4', 'Ingredients', ['Meat', 'Vegetables', 'Dairy']);

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

    // return ` 
    //         <section class="sub-nav">
    //         <ul class="filters">
    //             <li>
    //                 <select class="btn-filter" name="filter1">
    //                     <option disabled selected>Meal</option>
    //                     <option>Breakfast</option>
    //                     <option>Lunch</option>
    //                     <option>Dinner</option>
    //                     <option>Desserts</option>
    //                     <option>Snacks</option>
    //                     <option>Beverages</option>
    //                 </select>
    //             </li>
    //             <li>
    //                 <select class="btn-filter" name="filter2">
    //                     <option disabled selected>Cuisine</option>
    //                     <option>Asian</option>
    //                     <option>European</option>
    //                     <option>Latin American</option>
    //                     <option>African</option>
    //                     <option>Middle Eastern</option>
    //                 </select>
    //             </li>
    //             <li>
    //                 <select class="btn-filter" name="filter 3">
    //                     <option disabled selected>Estimated Time</option>
    //                     <option> Under 30 minutes </option>
    //                     <option> Under 1 Hour</option>
    //                     <option> Over 1 Hour</option>
    //                 </select>
    //             </li>
    //             <li>
    //                 <select class="btn-filter" name="filter4">
    //                     <option disabled selected>Ingredients</option>
    //                     <option>Meat</option>
    //                     <option>Vegetables</option>
    //                     <option>Dairy</option>
    //                 </select>
    //             </li>
    //         </ul>
    //         <main> </main>

    //         <!-- Action buttons (Shuffle/Add) -->
    //         <div class="actions">
    //             <button class="btn-shuffle" type="button">Shuffle</button>
    //             <button class="btn-add" type="button" onclick="location.hash = '#/create'">Add Recipe Card</button>
    //         </div>

    //     </section>`;
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
    defaultOption.value = "";
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