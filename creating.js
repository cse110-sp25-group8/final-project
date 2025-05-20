// Make event listeners for each input (4 text inputs)
window.addEventListener('DOMContentLoaded', init);
function init()
{
    //When the user click "Save" button, start collecting data
    let saveButton = document.getElementById("save");
    let cancelButton = document.getElementById("cancel");
    saveButton.addEventListener("click", () =>
    {
        let info=[];
        //name of recipe line 23
        let recipe_name = document.getElementById("recipe-name").value;
        console.log("name ", recipe_name);
        //time taken to cook line 31
        let time_cook = document.getElementById("time-cook").value;
        console.log(time_cook);
        time_cook=parseInt(time_cook, 10);
        console.log(isNaN(time_cook));
        console.log(time_cook <= 0);
        console.log(Number.isInteger(time_cook));

        // Check if it's a valid strictly positive integer
        if (isNaN(time_cook) || time_cook <= 0 || !Number.isInteger(time_cook))
        {
            throw new Error("Invalid cook time: must be a strictly positive integer.");
        }

        //calories line 41
        let calories = document.getElementById("calories").value;
        console.log(calories);
        calories = parseInt(calories, 10);
        // Check if it's a valid strictly positive integer
        if (isNaN(calories) || calories <= 0 || !Number.isInteger(calories))
        {
            throw new Error("Invalid calories: must be a strictly positive integer.");
        }
        let step1=document.getElementsByClassName("step1")[0].value;
        let step2=document.getElementsByClassName("step2")[0].value;
        console.log(step1);
        console.log(step2);
        info.push(recipe_name);
        info.push(time_cook);
        info.push(calories);
        info.push(step1,step2);
        console.log(info);
        let recipe = JSON.parse(localStorage.getItem("recipes")) || [];
        recipe.push(info);
        localStorage.setItem("recipes", JSON.stringify(recipe));


        let recipeObject={};

        
        const card = document.createElement('recipe-card');
        card.data=recipeObject;


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





