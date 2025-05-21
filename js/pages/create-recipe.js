export default function () {
  return `
        <main class="main-area">
          

          <div class="parent">
            <div class="left-side">
              <h1 class="heading">Add Recipe</h1>
              <form class="form-to-fill">
                <fieldset class="boxes">
                  <label class="labeling" >Name of Recipe <span class="red-text">*</span></label>
                  <input class="input-text" id="input-area" type="text">
                </fieldset>

                  <div class="rows">
                    <fieldset class="boxes">
                      <label class="labeling" for="cook-time">Time taken to cook</label>
                      <div class="rows">
                        <input class="input-text" id="cook-time" type="text">
                        <span class="information">min</span>
                      </div>
                    </fieldset>

                    <fieldset class="boxes">
                      <label class="labeling" for="calories">Calories</label>
                      <div class="rows">
                        <input class="input-text" id="calories" type="text">
                        <span class="information">kcal</span>
                      </div>
                    </fieldset>
                  </div>
                  
                <fieldset class="boxes">
                  <label class="labeling">Instructions</label>
                  <ul id="instruction-list">
                    <li class="instruction-item" draggable="true">
                      <span class="drag-handle"><img src="../../assets/instruction_row.svg" draggable="false"></span>
                      <input class="input-text" type="text">
                      <button class="delete-button"><img src="../../assets/trash.svg" alt="🗑️"></button>
                    </li>
                    <li class="instruction-item" draggable="true">
                      <span class="drag-handle"><img src="../../assets/instruction_row.svg" draggable="false"></span>
                      <input class="input-text" type="text">
                      <button class="delete-button"><img src="../../assets/trash.svg" alt="🗑️"></button>
                    </li>
                    <li class="instruction-item" draggable="true">
                      <span class="drag-handle"><img src="../../assets/instruction_row.svg" draggable="false"></span>
                      <input class="input-text" type="text">
                      <button class="delete-button"><img src="../../assets/trash.svg" alt="🗑️"></button>
                    </li>
                  </ul>
                  <button class="add-button" type="button">+</button>
                </fieldset>
              </form>


            </div>
          

            <div class="right-side">
              <div class="button-group">
                <button class="Button">Save Recipe</button>
                <button class="Button">Cancel</button>
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


          


    </main> `;

}