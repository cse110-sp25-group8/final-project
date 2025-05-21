window.addEventListener('DOMContentLoaded', init);

function init() {
	// ***** TEMPORARY ONLY *****
	// For Shadow DOM testing purposes.
	const testData = {
		// All of these are dummy values
		name: 1,
		time: 1,
		calories: 1
	};

	// To change based on what the buttons are in the future.
	const addButton = document.getElementById('add-card');
	const recipeList = document.getElementById('recipe-list');

	addButton.addEventListener('click',
		(event) => {
			const newCard = document.createElement('recipe-card');
			newCard.data = testData;

			recipeList.appendChild(newCard);
		});
}

function addRecipesToDocument(recipes) {
	
}