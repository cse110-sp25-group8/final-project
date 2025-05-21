function init() {
    let recipes = get_from_storage();
    const main_section = document.querySelector('main');
    console.log("main elem: ", main_section);
    console.log(recipes);


    const card_grid = document.createElement('div');
    card_grid.classList.add('card-grid');

    //populate main with recipies from local storage
    recipes.forEach((x) => {
        const addition = document.createElement('recipe-card');

        addition.data = x;
        console.log(addition.data);

        card_grid.appendChild(addition);
    })

    main_section.appendChild(card_grid);

}

function get_from_storage() {
    const cards = JSON.parse(localStorage.getItem('recipe'));

    if (cards == null) {
        return [];
    } else {
        return cards;
    }
}

export { init };
