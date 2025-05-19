export default function () {
	return `
        <main class="main-area">
          

          <div class="parent">
            <div class="left-side">
              <h1 class="heading">Add Recipe</h1>
              <form class="form-to-fill">
                <label class="labeling" >Name of Recipe</label><br>
                <input class="input_text" id="input-area" type="text">
                <br><br>

                  <span class="rows">
                    <span class="boxes">
                    <label class="labeling">Time taken to cook</label><br>

                      <input class="units-input" id="input-area" type="text">
                      <span class="information">min</span>

                    <br>
                    </span>
                    
                    <span class="boxes">
                      <label class="labeling">Calories</label><br>

                        <input class="units-input"  id="input-area" type="text">
                        <span class="information">kcal</span>


                      <br>
                    </span>
                  </span>
                  
                
                <label class="labeling">Instructions</label><br>
                <ul>
                  <li><input id="input-area" type="text"></li>
                  <li><input id="input-area" type="text"></li>
                </ul>
                <button class="Button" type="button">+</button><br>
              </form>


            </div>
          

            <div class="right-side">

              <button class="Button">Save Recipe</button>
              <button class="Button">Cancel</button><br>

              <input type="file" id="myFile" name="recipe"><br>

              <label class="labeling">Ingredients</label> <br>
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