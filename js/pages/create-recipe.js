export default function () {
    return `
    <main>
        <h1>Add Recipe</h1>  

          <div class="parent">
            <div class="left-side">
              <form>
                <label>Name of Recipe</label><br>
                <input class="input_text" type="text">
                <br><br>

                  <span class="rows">
                    <span class="boxes">
                    <label>Time taken to cook</label><br>

                      <input class="units-input" type="text">
                      <span class="information">min</span>

                    <br>
                    </span>
                    
                    <span class="boxes">
                      <label>Calories</label><br>

                        <input class="units-input" type="text">
                        <span class="information">kcal</span>


                      <br>
                    </span>
                  </span>
                  
                
                <label>Instructions</label><br>
                <ul>
                  <li><input type="text"></li>
                  <li><input type="text"></li>
                </ul>
                <button type="button">+</button><br>
              </form>


            </div>
          

            <div class="right-side">

              <button>Save Recipe</button>
              <button>Cancel</button><br>

              <input type="file" id="myFile" name="recipe"><br>

              <label>Ingredients</label> <br>
              <input class="search-box" type="text" placeholder="Search for Ingredients">
              <div>
                  <span>Noodle</span>
                  <span>Chicken</span>
                  <span>Carrots</span>
              </div>
            </div>
          </div>

    </main>`;
}