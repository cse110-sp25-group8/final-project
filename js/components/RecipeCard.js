import { RecipeStore } from '../database/RecipeStore.js';
const RECIPE_STORE = new RecipeStore();

class RecipeCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const articleContainer = document.createElement('article');

        const styleElement = document.createElement('style');
        styleElement.textContent = `
			:host {
				display: block;
				width: var(--card-width, 250px); 
				height: var(--card-height, 353px); 
			}

			article {
				width: 100%;
				height: 100%;
				background-color: var(--color-background-card);
				box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
				border-radius: 30px;
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				font-family: "Inter", sans-serif;
			}

			.pic-box {
				position: relative;
				margin-top: 10px;
				height: 47%;
				width: 91%;
				background-color: var(--color-image-background-card);
				border-radius: 25px;

				background-image: url('../../assets/images/pasta.webp');
				background-size: contain;       
				background-position: center;  
				background-repeat: no-repeat;
			}

			.pic-box button {
				position: absolute;
				background: none;
				border: none;
				cursor: pointer;
				padding: 4px;
			}

			.pic-box button:first-child {
				top: 10px;
				left: 10px;
			}

			.pic-box button:last-child {
				top: 10px;
				right: 10px;
			}


			.pic-box img {
				width: 30px;
				height: 30px;
			}

			.recipe-title {
				font-weight: 550;
				font-size: 22px;
				margin: 10px 0 5px 0;
			}

			.time-and-calories {
				display: flex;
				flex-direction: row;
				text-align: center;
				align-items: center;
				margin-top: 7px;
				gap: 10px;
				font-size: 14.5px;
				color: var(--color-time-and-calorites);
			}

			.time-and-calories time,
			.time-and-calories .calories {
				margin: 0;
				padding: 0;
			}

			.time-and-calories img {
				width: 15px;
			}

			.ingredients {
				padding: 6px 0 6px 0;
				font-size: 14px;
				border: none;
				border-top: 2.7px solid var(--color-ing-border);
				border-bottom: 2.7px solid var(--color-ing-border);
				margin-top: 18px;
				margin-left: 17px;
				margin-right: 17px;
				color: var(--color-text);
			}

			p {
				margin: 0;
				padding: 0;
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

        const updateCard = async () => { 
            const imageBlob = await RECIPE_STORE.getRecipeImageURL(data.id);
            const imageURL = URL.createObjectURL(imageBlob);

            const article = this.shadowRoot.querySelector('article');
            article.innerHTML = `
				<div class="pic-box">
					<button>
						<img src="../assets/star.svg" alt="star">
					</button>
					<!-- <img src="${imageURL}" alt="${data.name}"> -->
					<button>
						<img src="../assets/horizontal.svg" alt="star">
					</button>
				</div>
				<p class="recipe-title">${data.name}</p>
				<section class="time-and-calories">
					<img src="../assets/time.svg" alt="time">
					
					<time>${data.totalTime} min</time>
					<img src="../assets/calories.svg" alt="calories">
					<p class="calories">${data.calories} kcal</p>

				</section>
				<p class="ingredients">${data.recipeCategory}, ${data.recipeCuisine}</p>
			`;

            // Add image to pic-box
            const picBox = this.shadowRoot.querySelector('.pic-box');
            picBox.style.backgroundImage = `url(${imageURL})`;
        };

        updateCard();
    }
}

customElements.define('recipe-card', RecipeCard); 