

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