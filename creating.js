

function init(){
    let recipes=get_from_storage();
    const main_section=document.querySelector('main');
    console.log("main elem: ",main_section);

    //populate main with recipies from local storage
    recipes.forEach((x)=> {
        const addition=document.createElement('recipe-card');
        addition.data=x;
        main_section.appendChild(addition);
    })

    handle_create();
}

function get_from_storage(){
    const cards=JSON.parse(localStorage.getItem('recipies'));

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
        e.preventDefault();
        let form_data=new FormData(form);
        console.log("form:", form_data.get('Text'));

        let card_object={};
        for(const[key,value] of form_data){
            card_object[key]=value;
        }
        console.log(card_object);

        const recipe_card=document.createElement('recipe-card');
        recipe_card.data=card_object;

        const main_section=document.querySelector('main');
        main_section.appendChild(recipe_card);

        let storedCards=get_from_storage();
        storedCards.push(card_object);
        localStorage.setItem('recipies',JSON.stringify(storedCards));

    })
   

}


export{init};

