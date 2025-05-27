function init() {
    let recipes = getFromStorage();
    const mainSection = document.querySelector('main');
    console.log('main elem: ', mainSection);
    console.log(recipes);


    const cardGrid = document.createElement('div');
    cardGrid.classList.add('card-grid');

    // Populate main with recipies from local storage
    recipes.forEach((x) => {
        const addition = document.createElement('recipe-card');

        addition.data = x;
        console.log(addition.data);

        cardGrid.appendChild(addition);
    });

    mainSection.appendChild(cardGrid);

}

function getFromStorage() {
    const cards = JSON.parse(localStorage.getItem('recipe'));

    if (cards === null) {
        return [];
    } else {
        return cards;
    }
}

export { init };
