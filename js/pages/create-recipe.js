import { init } from '../../creating.js';

export default function () {
    const main = document.createElement('main');
    main.className = 'main-area';

    const parent = document.createElement('form');
    parent.className = 'parent';

    // left side
    const left = document.createElement('div');
    left.className = 'left-side';

    const heading = document.createElement('h1');
    heading.className = 'heading';
    heading.textContent = 'Add Recipe';

    const formToFill = document.createElement('div');
    formToFill.className = 'form-to-fill';

    // Name Section
    const nameField = document.createElement('fieldset');
    nameField.className = 'boxes';

    const nameLabel = document.createElement('label');
    nameLabel.className = 'labeling';
    nameLabel.innerHTML = 'Name of Recipe <span class="red-text">*</span>';

    const nameInput = document.createElement('input');
    nameInput.required = true;
    nameInput.className = 'input-text';
    nameInput.name = 'name';
    nameInput.id = 'recipe-name';
    nameInput.type = 'text';

    nameField.append(nameLabel, nameInput);


    // Ingredients
    const ingredientField = document.createElement('fieldset');
    ingredientField.className = 'boxes';

    const ingredientLabel = document.createElement('label');
    ingredientLabel.className = 'labeling';
    ingredientLabel.innerHTML = 'Ingredients <span class="red-text">*</span>';

    const ingredientList = document.createElement('ul');
    ingredientList.id = 'ingredient-list';

    const METRIC_MEASUREMENTS = [
        'milliliters (mL)',
        'liters (L)',
        'grams (g)',
        'kilograms (kg)'
    ];

    const UNIVERSAL_MEASUREMENTS = [
        'unitless (no units)',
        'teaspoon (tsp)',
        'tablespoon (tbsp)'
    ];

    function addUnitsToDropdown(measurementArray) {
        // measurementArray = 'Imperial' || 'Metric' -- TBA
        const dropdown = document.createElement('select');
        dropdown.placeholder = 'Units';

        const UNIT_MEASUREMENTS = UNIVERSAL_MEASUREMENTS.concat(measurementArray);
        for (const unit of UNIT_MEASUREMENTS) {
            const unitOption = document.createElement('option');
            unitOption.value = unit;
            unitOption.text = unit;
            dropdown.appendChild(unitOption);
        }

        return dropdown;
    }

    let ingredientCount = 2;

    function createIngredientItem() {
        const li = document.createElement('li');
        li.className = 'ingredient-item';

        const currIngredientRow = document.createElement('div');
        currIngredientRow.className = 'rows';

        const quantityInput = document.createElement('input');
        quantityInput.name = 'ingredient-quantity';
        quantityInput.type = 'text';
        quantityInput.className = 'ingredient-quantity';
        quantityInput.placeholder = 'Quantity of ingredient(s)';
        quantityInput.min = 0;
        quantityInput.max = 10000;

        // const unitDropdown = document.createElement('select');
        // unitDropdown.placeholder = 'unit';
        const unitDropdown = addUnitsToDropdown(METRIC_MEASUREMENTS);
        unitDropdown.name = 'ingredient-unit';
        unitDropdown.className = 'unit-dropdown';

        const ingredientNameInput = document.createElement('input');

        ingredientNameInput.name = 'ingredient-name';
        ingredientNameInput.className = 'ingredient-name';
        ingredientNameInput.type = 'text';
        ingredientNameInput.placeholder = 'Name of ingredient';
        ingredientNameInput.required = true;

        const del = document.createElement('button');
        del.className = 'delete-button';
        del.type = 'button';

        const trash = document.createElement('img');
        trash.src = 'https://cse110-sp25-group8.github.io/final-project/assets/trash.svg';
        trash.alt = '🗑️';

        del.appendChild(trash);

        del.addEventListener('click', () => {
            if (ingredientList.children.length > 1) {
                ingredientList.removeChild(li);
            }
            else {
                alert("At least one ingredient is required.")
            }
        });

        // currIngredientRow.append(quantityInput, unitDropdown, ingredientNameInput, del);

        li.append(quantityInput, unitDropdown, ingredientNameInput, del);
        // li.append(currIngredientRow);
        return li;
    }

    for (let i = 1; i <= ingredientCount; i++) {
        const li = createIngredientItem();
        ingredientList.appendChild(li);
    }

    const addIngredientBtn = document.createElement('button');
    addIngredientBtn.className = 'add-button';
    addIngredientBtn.type = 'button';
    addIngredientBtn.textContent = '+';

    addIngredientBtn.addEventListener('click', () => {
        stepCount += 1;
        const li = createIngredientItem(stepCount);
        ingredientList.appendChild(li);
    });

    ingredientField.append(ingredientLabel, ingredientList, addIngredientBtn);

    // Instructions
    const instrField = document.createElement('fieldset');
    instrField.className = 'boxes';

    const instrLabel = document.createElement('label');
    instrLabel.className = 'labeling';
    instrLabel.innerHTML = 'Instructions <span class="red-text">*</span>';

    const instrList = document.createElement('ul');
    instrList.id = 'instruction-list';

    let stepCount = 2;

    function createInstructionItem(stepNum) {
        const li = document.createElement('li');
        li.className = 'instruction-item';
        li.draggable = true;

        const drag = document.createElement('span');
        drag.className = 'drag-handle';

        const dragIcon = document.createElement('img');
        dragIcon.src = 'https://cse110-sp25-group8.github.io/final-project/assets/instruction_row.svg';
        dragIcon.draggable = false;
        drag.appendChild(dragIcon);

        const input = document.createElement('input');
        input.name = `step${stepNum}`;
        input.type = 'text';
        input.className = 'step';

        const del = document.createElement('button');
        del.className = 'delete-button';
        del.type = 'button';

        const trash = document.createElement('img');
        trash.src = 'https://cse110-sp25-group8.github.io/final-project/assets/trash.svg';
        trash.alt = '🗑️';

        del.appendChild(trash);

        del.addEventListener('click', () => {
            if (instrList.children.length > 1) {
                instrList.removeChild(li);
            }
            else {
                alert("At least one instruction is required.")
            }
        });

        li.append(drag, input, del);
        return li;
    }

    for (let i = 1; i <= stepCount; i++) {
        const li = createInstructionItem(i);
        instrList.appendChild(li);
    }

    function updateInstructionInputNames() {
        const steps = instrList.querySelectorAll('.instruction-item input');
        steps.forEach((input, index) => {
            input.name = `step${index + 1}`;
        });
    }

    // This is the variable to track which item is being dragged
    let draggedItem = null;

    // this is the indicator part which helps user to drag
    const dragIndicator = document.createElement('div');
    dragIndicator.className = 'drag-indicator';

    // This first check whether there is instruction-item, then draggedItem is saved 
    // so we know that is dragged 
    instrList.addEventListener('dragstart', (e) => {
        if (e.target && e.target.classList.contains('instruction-item')) {
            draggedItem = e.target;

            // hides the element right after dragging starts -> give visual feedback
            setTimeout(() => {
                draggedItem.style.display = 'none';
            }, 0);
        }
    });

    // It first calculate the drag indicator, and insert on the right position
    // ask where can I drop
    instrList.addEventListener('dragover', (e) => {
        e.preventDefault(); // allows drop

        const afterElement = getDragAfterElement(instrList, e.clientY);

        if (afterElement === draggedItem || afterElement === null) {
            instrList.appendChild(dragIndicator); // shows at the end
        } else {
            instrList.insertBefore(dragIndicator, afterElement); // shows before afterElement
        }
    });

    // This part finalize the drop part. 
    // now actually drop using this
    instrList.addEventListener('drop', (e) => {
        e.preventDefault();
        if (dragIndicator.parentElement) {
            instrList.insertBefore(draggedItem, dragIndicator);
            dragIndicator.parentElement.removeChild(dragIndicator);
        } else {
            instrList.appendChild(draggedItem);
        }
        draggedItem.style.display = 'flex';
        draggedItem = null;

        updateInstructionInputNames();
    });

    // if dragged is finished, then runs
    // it restores dragged item's visibility and clears draggedItem reference
    instrList.addEventListener('dragend', (e) => {
        if (draggedItem) {
            // this agains shows the item that was hided (by display = 'none')
            draggedItem.style.display = 'flex';
            draggedItem = null;
        }

        // delete drag indicator
        if (dragIndicator.parentElement) {
            dragIndicator.parentElement.removeChild(dragIndicator);
        }

        updateInstructionInputNames();
    });

    // this is the helper function that helps calculating where to drop
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.instruction-item:not([style*="display: none"])')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    const addBtn = document.createElement('button');
    addBtn.className = 'add-button';
    addBtn.type = 'button';
    addBtn.textContent = '+';

    addBtn.addEventListener('click', () => {
        stepCount += 1;
        const li = createInstructionItem(stepCount);
        instrList.appendChild(li);
    });

    instrField.append(instrLabel, instrList, addBtn);

    // Assemble left side
    // mealLabel, mealSelection, cuisineLabel, cuisineSelection
    // formToFill.append(nameField, timeRowWrapper, labelRowWrapper, ingredientLabel, ingredientInput, ingredientList, instrField);
    formToFill.append(nameField, ingredientField, instrField);
    left.append(heading, formToFill);

    // Right Side
    const right = document.createElement('div');
    right.className = 'right-side';

    const photoLabel = document.createElement('label');
    photoLabel.className = 'labeling';
    photoLabel.textContent = 'Photo';

    const photoConstraint = document.createElement('p');
    photoConstraint.className = 'photo-labeling';
    photoConstraint.textContent = '.jpeg, jpg, .png, .raw, .heif';

    const photoBox = document.createElement('div');
    photoBox.className = 'photo-box';

    const photoInput = document.createElement('input');
    photoInput.type = 'file';
    photoInput.accept = '.png, .jpg, .jpeg, .raw, .heif';
    photoInput.name = 'image';
    photoInput.id = 'myFile';
    photoInput.style.display = 'none';

    const uploadButton = document.createElement('button');
    uploadButton.textContent = 'Browse Files';
    uploadButton.className = 'custom-upload-btn';

    uploadButton.addEventListener('click', (e) => {
        e.preventDefault();
        requestAnimationFrame(() => photoInput.click());
    });

    const photoPreview = document.createElement('img');
    photoPreview.className = 'photo-preview';
    photoPreview.style.display = 'none';

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-btn';
    removeButton.textContent = '✖';
    removeButton.style.display = 'none';
    removeButton.addEventListener('click', () => {
        photoPreview.src = '';
        photoInput.value = ''; // reset file input
        photoPreview.style.display = 'none';
        removeButton.style.display = 'none';
        photoConstraint.style.display = '';
        uploadButton.style.display = 'block';
        uploadIcon.style.display = 'block';
    });


    photoInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) {
            photoPreview.src = '';
            removeButton.style.display = 'none';
            uploadButton.style.display = 'block';
            uploadIcon.style.display = 'block';
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            photoPreview.style.display = 'block';
            photoPreview.src = e.target.result;
            removeButton.style.display = 'block';
            uploadButton.style.display = 'none';
            photoConstraint.style.display = 'none';
            uploadIcon.style.display = 'none';
        };
        reader.readAsDataURL(file);
    });

    const uploadIcon = document.createElement('img');
    uploadIcon.src = "https://cse110-sp25-group8.github.io/final-project/assets/upload.png";
    uploadIcon.className = "upload-icon";

    photoBox.appendChild(uploadIcon);
    photoBox.appendChild(photoInput);
    photoBox.appendChild(uploadButton);
    photoBox.appendChild(photoPreview);
    photoBox.appendChild(removeButton);
    photoBox.appendChild(photoConstraint);

    // Time & Calories Section
    const timeRowWrapper = document.createElement('div');
    timeRowWrapper.className = 'rows';

    const timeUnit = document.createElement('span');
    timeUnit.className = 'information';
    timeUnit.textContent = 'min';

    // Prep Time
    const prepTimeField = document.createElement('fieldset');
    prepTimeField.className = 'boxes';

    const prepTimeLabel = document.createElement('label');
    prepTimeLabel.className = 'labeling';
    prepTimeLabel.textContent = 'Time to prep';

    const prepTimeInput = document.createElement('input');
    prepTimeInput.className = 'input-text';
    prepTimeInput.name = 'prepTime';
    prepTimeInput.id = 'time-prep';
    prepTimeInput.type = 'number';
    prepTimeInput.min = 0;
    prepTimeInput.max = 999;
    prepTimeInput.step = 1;
    prepTimeInput.value = 0;

    const prepTimeRow = document.createElement('div');
    prepTimeRow.className = 'rows';

    prepTimeRow.append(prepTimeInput, timeUnit);
    prepTimeField.append(prepTimeLabel, prepTimeRow);

    // Cook Time
    const cookTimeField = document.createElement('fieldset');
    cookTimeField.className = 'boxes';

    const cookTimeLabel = document.createElement('label');
    cookTimeLabel.className = 'labeling';
    cookTimeLabel.innerHTML = 'Time to cook <span class="red-text">*</span>';

    const cookTimeInput = document.createElement('input');
    cookTimeInput.className = 'input-text';
    cookTimeInput.name = 'cookTime';
    cookTimeInput.id = 'time-cook';
    cookTimeInput.type = 'number';
    cookTimeInput.required = true;
    cookTimeInput.min = 0;
    cookTimeInput.max = 999;
    cookTimeInput.step = 1;
    cookTimeInput.required = true;

    const cookTimeRow = document.createElement('div');
    cookTimeRow.className = 'rows';

    cookTimeRow.append(cookTimeInput, timeUnit);
    cookTimeField.append(cookTimeLabel, cookTimeRow);

    const calField = document.createElement('fieldset');
    calField.className = 'boxes';

    const calLabel = document.createElement('label');
    calLabel.className = 'labeling';
    calLabel.textContent = 'Calories';

    const calRow = document.createElement('div');
    calRow.className = 'rows';

    const calInput = document.createElement('input');
    calInput.className = 'input-text';
    calInput.name = 'calories';
    calInput.id = 'calories';
    calInput.type = 'number';
    calInput.min = 0;
    calInput.max = 10000;
    calInput.step = 1;
    calInput.value = 0;

    const calUnit = document.createElement('span');
    calUnit.className = 'information';
    calUnit.textContent = 'kcal';

    calRow.append(calInput, calUnit);
    calField.append(calLabel, calRow);

    timeRowWrapper.append(prepTimeField, cookTimeField, calField);
    // Recipe labels row
    const labelRowWrapper = document.createElement('div');
    labelRowWrapper.className = 'labelrows';

    // Meal label selection
    const mealTypeField = document.createElement('fieldset');
    calField.className = 'boxes';

    const mealLabel = document.createElement('label');
    mealLabel.className = 'labeling';
    mealLabel.textContent = 'Meal type';
    const mealSelect = document.createElement('select');
    const mealSelection = createOption('recipeCategory', 'Meal', ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Beverage']);

    mealTypeField.append(mealLabel, mealSelection);

    // Cuisine label selection
    const cuisineField = document.createElement('fieldset');
    calField.className = 'boxes';

    const cuisineLabel = document.createElement('label');
    cuisineLabel.className = 'labeling';
    cuisineLabel.textContent = 'Cuisine type';
    const cuisineSelect = document.createElement('select');
    const cuisineSelection = createOption('recipeCuisine', 'Cuisine', ['African', 'Asian', 'European', 'Latin American', 'Middle Eastern', 'North American']);

    cuisineField.append(cuisineLabel, cuisineSelection);

    labelRowWrapper.append(mealTypeField, cuisineField);

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';

    const saveBtn = document.createElement('button');
    saveBtn.type = 'submit';
    saveBtn.className = 'Button';
    saveBtn.id = 'save';
    saveBtn.textContent = 'Save Recipe';
    // saveBtn.addEventListener('click', () => {
    //     location.hash = '#/';
    // });


    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'Button';
    cancelBtn.id = 'cancel';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', () => {
        location.hash = '#/';
    });

    buttonGroup.append(saveBtn, cancelBtn);
    right.append(labelRowWrapper, timeRowWrapper, photoLabel, photoBox, buttonGroup);

    // Final Assembly
    parent.append(left, right);
    main.appendChild(parent);

    requestAnimationFrame(() => {
        init();
    });


    return main;

    // return `
    //       <main class="main-area">


    //         <form class="parent">
    //           <div class="left-side">
    //             <h1 class="heading">Add Recipe</h1>
    //             <div class="form-to-fill">
    //               <fieldset class="boxes">
    //                 <label class="labeling" >Name of Recipe <span class="red-text">*</span></label>
    //                 <input class="input-text" name="recipe" id="recipe-name" type="text">
    //               </fieldset>

    //                 <div class="rows">
    //                   <fieldset class="boxes">
    //                     <label class="labeling">Time taken to cook</label>

    //                     <div class="rows">
    //                       <input class="input-text" name="time" id="time-cook" type="text">
    //                       <span class="information">min</span>
    //                     </div>
    //                   </fieldset>

    //                   <fieldset class="boxes">
    //                     <label class="labeling">Calories</label>

    //                     <div class="rows">
    //                       <input class="input-text" name="calories" id="calories" type="text">
    //                       <span class="information">kcal</span>
    //                     </div>
    //                   </fieldset>
    //                 </div>

    //               <fieldset class="boxes">

    //               <label class="labeling">Instructions</label>
    //               <ul id="instruction-list">

    //                 <li class="instruction-item" draggable="true">
    //                   <span class="drag-handle">
    //                     <img src="../../assets/instruction_row.svg" draggable="false">
    //                   </span>
    //                   <input class="step1" name="step1" type="text">
    //                   <button class="delete-button"><img src="../../assets/trash.svg" alt="🗑️"></button>
    //                 </li>

    //                 <li class="instruction-item" draggable="true">
    //                   <span class="drag-handle">
    //                     <img src="../../assets/instruction_row.svg" draggable="false">
    //                   </span>
    //                   <input class="step2" name="step2" type="text">
    //                   <button class="delete-button"><img src="../../assets/trash.svg" alt="🗑️"></button>
    //                 </li>

    //               </ul>

    //               <button class="add-button" type="button">+</button><br>


    //               </fieldset>

    //             </div>


    //           </div>


    //           <div class="right-side">
    //             <div class="button-group">
    //               <button type="submit" class="Button" id="save">Save Recipe</button>
    //               <button class="Button" type="button" id="cancel" onclick="location.hash = '#/'">Cancel</button>
    //             </div>


    //             <label class="labeling">Photo</label>
    //             <div class="photo-box">
    //               <input type="file" id="myFile" name="recipe">
    //             </div>

    //             <label class="labeling">Ingredients <span class="red-text">*</span></label> 
    //             <input class="search-box"  id="input-area" type="text" placeholder="Search for Ingredients">
    //             <div>
    //                 <span>Noodle</span>
    //                 <span>Chicken</span>
    //                 <span>Carrots</span>
    //             </div>
    //           </div>
    //         </form>
    //       </main> 
    // `

}


function createOption(name, label, options) {
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

    return select;
}
