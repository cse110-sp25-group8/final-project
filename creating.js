

function init(){
    //populate main with recipe from local storage

    handle_create();
}

function get_from_storage(){
    const cards=JSON.parse(localStorage.getItem('recipe'));

    if (cards==null){
        return [];
    }else{
        return cards;
    }   
}

function handle_create(){

    const form=document.getElementsByClassName("form-to-fill")[0];

    console.log(form);

    form.addEventListener("submit", (e) =>{
        console.log("running");

        let form_data=new FormData(form);
        console.log("form:", form_data.get('Text'));

        const time = parseInt(form_data.get("time").trim(), 10);
        const calories = parseInt(form_data.get("calories").trim(), 10);

        // Validate time and calories
        if ( isNaN(time) || time <= 0 || !Number.isInteger(time) || isNaN(calories) || calories <= 0 || !Number.isInteger(calories)) 
        {
            alert("Time and Calories must be strictly positive whole numbers.");
            return; // Stop submission
        }

        let card_object={};
        for(const[key,value] of form_data){
            card_object[key]=value;
        }
        console.log(card_object);

        const recipe_card=document.createElement('recipe-card');
        recipe_card.data=card_object;

        let storedCards=get_from_storage();
        storedCards.push(card_object);
        localStorage.setItem('recipe',JSON.stringify(storedCards));

    })
   

}


export{init};

