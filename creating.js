function init() {
    //populate main with recipe from local storage
    console.log('[init] running...');
    handleCreate();
}

function getFromStorage() {
    const cards = JSON.parse(localStorage.getItem('recipe'));

    if (cards === null) {
        return [];
    } else {
        return cards;
    }
}

function handleCreate() {

    const form = document.getElementsByClassName('parent')[0];

    console.log(form);

    form.addEventListener('submit', (e) => {

        console.log('running');

        let formData = new FormData(form);
        console.log('form:', formData.get('Text'));

        let cardObject = {};
        for (const [key, value] of formData) {
            cardObject[key] = value;
        }
        console.log(cardObject);

        const recipeCard = document.createElement('recipe-card');
        recipeCard.data = cardObject;

        let storedCards = getFromStorage();
        storedCards.push(cardObject);
        localStorage.setItem('recipe', JSON.stringify(storedCards));

        location.hash = '#/';
    });


}

export { init };


