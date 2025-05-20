// Make event listeners for each input (4 text inputs)
window.addEventListener('DOMContentLoaded', init);


function init()
{
    //When the user click "Save" button, start collecting data
    const saveButton = document.getElementById("save");
    const cancelButton = document.getElementById("cancel");




    saveButton.addEventListener("click", () =>
        {


        //name of recipe line 23
        const recipe_name = document.getElementById("recipe-name").innerText;
       
        //time taken to cook line 31
        const time_cook = document.getElementById("time-cook").innerText;
        time_cook = parseInt(time_cook, 10);
        // Check if it's a valid strictly positive integer
        if (isNaN(time_cook) || time_cook <= 0 || !Number.isInteger(time_cook))
        {
            throw new Error("Invalid cook time: must be a strictly positive integer.");
        }


        //calories line 41
        const calories = document.getElementById("calories").innerText;
        calories = parseInt(calories, 10);
        // Check if it's a valid strictly positive integer
        if (isNaN(calories) || calories <= 0 || !Number.isInteger(calories))
        {
            throw new Error("Invalid calories: must be a strictly positive integer.");
        }






        //ingredients line 70-74
       
   




        // Make data structure for cards (easy for indexdb)


       


       


        // Grab to localStorage - Lab 6


        let recipe = JSON.parse(localStorage.getItem("recipes")) || [];
        recipe.push(recipeData);
        localStorage.setItem("recipes", Json.stringify(recipe));


        alert("Recipe Saved")






    });


    cancelButton.addEventListener("click", () => {
        ["recipe-name", "time-cook", "calories"].forEach(id => {
          document.getElementById(id).value = "";
        });
     
        document.querySelectorAll(".instruction").forEach(input => input.value = "");
        document.querySelectorAll(".ingredient.selected").forEach(tag => tag.classList.remove("selected"));
    });
}
<!-- you can nested the entire form into a div or span and then do css: align-cetner
     Change font and fix the responsiveness.
-->
