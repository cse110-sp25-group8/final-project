import { init } from '../../creating.js';


export default function () {

  requestAnimationFrame(() => {
    init();
  });

  return `
        <main class="main-area">
          

          <div class="parent">
            <div class="left-side">
              <h1 class="heading">Add Recipe</h1>
              <form class="form-to-fill">
                <fieldset class="boxes">
                  <label class="labeling" >Name of Recipe <span class="red-text">*</span></label>
                  <input class="input-text" name="recipe" id="recipe-name" type="text">
                </fieldset>

                  <div class="rows">
                    <fieldset class="boxes">
                      <label class="labeling">Time taken to cook</label>

                      <div class="rows">
                        <input class="input-text" name="time" id="time-cook" type="text">
                        <span class="information">min</span>
                      </div>
                    </fieldset>
                    
                    <fieldset class="boxes">
                      <label class="labeling">Calories</label>

                      <div class="rows">
                        <input class="input-text" name="calories" id="calories" type="text">
                        <span class="information">kcal</span>
                      </div>
                    </fieldset>
                  </div>
                  
                <fieldset class="boxes">

                <label class="labeling">Instructions</label>
                <ul id="instruction-list">

                  <li class="instruction-item" draggable="true">
                    <span class="drag-handle">
                      <img src="../../assets/instruction_row.svg" draggable="false">
                    </span>
                    <input class="step1" name="step1" type="text">
                    <button class="delete-button"><img src="../../assets/trash.svg" alt="🗑️"></button>
                  </li>

                  <li class="instruction-item" draggable="true">
                    <span class="drag-handle">
                      <img src="../../assets/instruction_row.svg" draggable="false">
                    </span>
                    <input class="step2" name="step2" type="text">
                    <button class="delete-button"><img src="../../assets/trash.svg" alt="🗑️"></button>
                  </li>

                </ul>

                <button class="add-button" type="button">+</button><br>

                <button type="submit" class="Button" id="save">Save Recipe</button>
                <button class="Button" type="button" id="cancel" onclick="location.hash = '#/'">Cancel</button>
                </fieldset>

              </form>


            </div>
          

            <div class="right-side">
              <div class="button-group">
                
              </div>


              <label class="labeling">Photo</label>
              <div class="photo-box">
                <input type="file" id="myFile" name="recipe">
              </div>

              <label class="labeling">Ingredients <span class="red-text">*</span></label> 
              <input class="search-box"  id="input-area" type="text" placeholder="Search for Ingredients">
              <div>
                  <span>Noodle</span>
                  <span>Chicken</span>
                  <span>Carrots</span>
              </div>
            </div>
          </div>
        </main> 
        

  `

}