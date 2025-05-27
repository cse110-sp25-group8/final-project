import { startTimerFromInputs, clearTimer, updateTimerPreview } from '../components/timer.js';
export default function () {
    const layout = document.createElement('div');
    layout.className = 'detail-layout';

    const main = document.createElement('div');
    main.className = 'detail-main';

    // Ingredients Section
    const ingredientsSection = document.createElement('section');
    ingredientsSection.id = 'ingredients';

    const ingredientsTitle = document.createElement('h2');
    ingredientsTitle.textContent = 'Ingredients';

    const ingredientsList = document.createElement('ul');
    ['Butter', 'Chicken', 'Pasta', 'Sugar', 'Black Pepper', 'Rice'].forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ingredientsList.appendChild(li);
    });

    ingredientsSection.append(ingredientsTitle, ingredientsList);

    // Instruction Section
    const instructionsSection = document.createElement('section');
    instructionsSection.id = 'instructions';

    const instructionsTitle = document.createElement('h2');
    instructionsTitle.textContent = 'Instructions';

    const instructionsList = document.createElement('ol');
    ['First step goes here five cups of water', 'Step 2 goes here', 'Step 3 and so on...'].forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        instructionsList.appendChild(li);
    });

    instructionsSection.append(instructionsTitle, instructionsList);
    main.append(ingredientsSection, instructionsSection);

    // Aside Section
    const aside = document.createElement('aside');
    aside.className = 'detail-aside';

    // Recipe Card
    const recipeCard = document.createElement('article');
    recipeCard.id = 'recipe-card';

    const recipes = JSON.parse(localStorage.getItem('recipe')) || [];
    if (recipes.length > 0) {
        const recipeCardElement = document.createElement('recipe-card');
        recipeCardElement.style.setProperty('--card-width', '320px');
        recipeCardElement.style.setProperty('--card-height', '380px');
        recipeCardElement.data = recipes[0]; // use the first recipe
        recipeCard.appendChild(recipeCardElement);
    } else {
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = 'No recipe data found.';
        recipeCard.appendChild(emptyMsg);
    }

    // You can attach a shadow DOM here


    // Timer
    const timerSection = document.createElement('section');
    timerSection.id = 'timer-container';

    // this is NOT library or 
    const svgNS = 'http://www.w3.org/2000/svg';

    const svgWrapper = document.createElement('div');
    svgWrapper.className = 'svg-timer-wrapper';

    const timerDisplay = document.createElement('div');
    timerDisplay.className = 'timer-display';
    timerDisplay.textContent = '00:00:00';

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.classList.add('svg-timer');

    const progressCircle = document.createElementNS(svgNS, 'circle');
    progressCircle.setAttribute('cx', '50');
    progressCircle.setAttribute('cy', '50');
    progressCircle.setAttribute('r', '45');
    progressCircle.setAttribute('class', 'timer-progress');
    progressCircle.style.strokeDasharray = '282.6'; // 2πr
    progressCircle.style.strokeDashoffset = '0';

    svg.append(progressCircle);
    
    svgWrapper.append(svg, timerDisplay);


    const form = document.createElement('form');
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'timer-form';

    const inputGroup = document.createElement('div');
    inputGroup.className = 'timer-inputs';

    const inputs = [
        { id: 'hours', label: 'hr', max: 12 },
        { id: 'minutes', label: 'min', max: 59 },
        { id: 'seconds', label: 'sec', max: 59 },
    ];

    inputs.forEach(({ id, label, max }) => {
        const inputRow = document.createElement('div');
        inputRow.className = 'input-row';

        const input = document.createElement('input');
        input.type = 'number';
        input.id = id;
        input.name = id;
        input.min = 0;
        input.max = String(max);
        input.placeholder = '00';

        input.addEventListener('input', updateTimerPreview);

        const labelEl = document.createElement('label');
        labelEl.htmlFor = id;
        labelEl.textContent = label;

        inputRow.append(input, labelEl);
        inputGroup.appendChild(inputRow);
    });

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'timer-buttons';

    const setBtn = document.createElement('button');
    setBtn.id = 'timer-set';
    setBtn.textContent = 'Set';

    const clearBtn = document.createElement('button');
    clearBtn.id = 'timer-clear';
    clearBtn.textContent = 'Clear';

    buttonGroup.append(setBtn, clearBtn);

    fieldset.append(inputGroup, buttonGroup);
    form.appendChild(fieldset);

    timerSection.append(svgWrapper, form);

    aside.append(recipeCard, timerSection);

    layout.append(main, aside);

    requestAnimationFrame(() => {
        document.getElementById('timer-set')?.addEventListener('click', (e) => {
            e.preventDefault();
            startTimerFromInputs();
        });

        document.getElementById('timer-clear')?.addEventListener('click', (e) => {
            e.preventDefault();
            clearTimer();
        });
    });

    return layout;



    //     return `
    // <div class="detail-layout">

    //     <div class="detail-main">
    //         <section id="ingredients">
    //             <h2>Ingredients</h2>
    //             <ul>
    //                 <li>Butter</li>
    //                 <li>Chicken</li>
    //                 <li>Pasta</li>
    //                 <li>Sugar</li>
    //                 <li>Black Pepper</li>
    //                 <li>Rice</li>
    //             </ul>
    //         </section>


    //         <section id="instructions">
    //             <h2>Instructions</h2>
    //             <ol>
    //                 <li>First step goes here five cups of water</li>
    //                 <li>Step 2 goes here</li>
    //                 <li>Step 3 and so on...</li>
    //             </ol>
    //         </section>
    //     </div>


    //     <aside class="detail-aside">
    //         <article id="recipe-card">
    //             <h2>Recipe Details</h2>
    //             <!-- shadow DOM here-->
    //         </article>

    //         <section id="timer-container">
    //             <h3>Cooking Timer</h3>
    //             <div class="timer-display">1:14:00</div>

    //             <form>
    //                 <fieldset class="timer-form">
    //                     <div class="timer-input">
    //                         <div class="input-row">
    //                             <input type="number" id="hours" name="hours" min="0" max="12">
    //                             <label for="hours">hr</label>
    //                         </div>
    //                         <div class="input-row">
    //                             <input type="number" id="minutes" name="minutes" min="0" max="59">
    //                             <label for="minutes">min</label>
    //                         </div>
    //                         <div class="input-row">
    //                             <input type="number" id="seconds" name="seconds" min="0" max="59">
    //                             <label for="seconds">sec</label>
    //                         </div>
    //                     </div>

    //                     <div class="timer-buttons">
    //                         <button id="timer-set">Set</button>
    //                         <button id="timer-clear">Clear</button>
    //                     </div>
    //                 </fieldset>
    //             </form>
    //         </section>
    //     </aside>

    // </div>
    // `;
}