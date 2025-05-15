class RecipeCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		const articleContainer = document.createElement('article');

		// TO ADD: styling rules
		const styleElement = document.createElement('style');
		styleElement.textContent = `
            article {
                width: 250px;
                height: 300px;
                box-shadow: 0px 4px 10px black;
                border-radius: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                font-family: "Inter", sans-serif;
            }

            .title {
                font-weight: 500;
                font-size: 20px;
            }

            .time-and-calories {
                display: flex;
                flex-direction: row;
                text-align: center;
                align-items: center;
                gap: 10px;
            }

            .ingredients {
                font-size: 15px
            }
        `;

		this.shadowRoot.appendChild(articleContainer);
		this.shadowRoot.appendChild(styleElement);
	}

	set data(data) {
		// Check to see if nothing was passed in
		if (!data) {
			return;
		}

		// Dumym values to be removed
		const article = this.shadowRoot.querySelector('article');
		article.innerHTML = `
            <!-- <img src="${data.imgSrc}" alt="${data.imgAlt}"> -->
            <p class="title">Dummy Recipe</p>
            <section class="time-and-calories">
                <time>2 hr</time>
                <p class="calories">300 kcal</p>
            </section>
            <p class="ingredients">Ingredient_1, Ingredient_2, Ingredient_3</p>
        `;
	}
}

customElements.define('recipe-card', RecipeCard); 