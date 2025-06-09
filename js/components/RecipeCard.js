import { RecipeStore } from '../database/RecipeStore.js';
import { renderCardDetails } from '../router.js';
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

			.star-btn {
				top: 10px;
				left: 10px;
			}

			.menu-btn {
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
			
			.drop-down {
				position: absolute;
				top: 24%;
				right: 6%;
				width: 50%;
				height: 45%;
				background-color: white;
				border-radius: 25px;
				display: flex;
				flex-direction: column;
				// align-items: center;
				justify-content: center;
				display: none;
				gap: 8px;
			}

			.delete, .edit {
				display: flex;
				align-items: center;
				font-size: 16px;
				gap: 8px;
				color: #525252;
				margin-left: 14%;
			}

			.delete img,
			.edit img {
				width: 1.2rem;
				height: 1.2rem;
			}

			.delete::hover {
				background-color: #edecec;
			}

			.edit::hover {
				background-color: #edecec;
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

            article.addEventListener('click', function (event) {
                alert('clicked');
                renderCardDetails(data.id);
            });

            const starImgSrc = data.isFavorite
                ? '../assets/coloredStar.svg'
                : '../assets/star.svg';

            article.innerHTML = `
				<div class="pic-box">
					<button class="star-btn">
						<img src="${starImgSrc}" alt="star" class="star-img">
					</button>
					<!-- <img src="${imageURL}" alt="${data.name}"> -->
					<button class="menu-btn">
						<img src="../assets/horizontal.svg" alt="menu">
					</button>
					<div class="drop-down">
						<div class="edit" role="button">
							<img src="../assets/edit.svg" alt="edit"> 
							<p>Edit</p>
						</div>

						<div class="delete" role="button">
							<img src="../assets/trash.svg" alt="delete"> 
							<p>Delete</p>
						</div>
					</div>
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

            const menuBtn = this.shadowRoot.querySelector('.menu-btn');
            const dropdown = this.shadowRoot.querySelector('.drop-down');
            const starBtn = this.shadowRoot.querySelector('.star-btn');
            const starImg = this.shadowRoot.querySelector('.star-img');

            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.style.display =
                    dropdown.style.display === 'flex' ? 'none' : 'flex';
            });

            this.shadowRoot.addEventListener('click', (e) => {
                const isInsideMenuBtn = menuBtn.contains(e.target);
                const isInsideDropdown = dropdown.contains(e.target);

                if (!isInsideMenuBtn && !isInsideDropdown) {
                    dropdown.style.display = 'none';
                }
            });

            starBtn.addEventListener('click', async (e) => {
                e.stopPropagation();

                // toggle the favorite status
                const newFavoriteStatus = !data.isFavorite;
                if (newFavoriteStatus) {
                    starImg.src = '../assets/coloredStar.svg';
                } else {
                    starImg.src = '../assets/star.svg';
                }

                data.isFavorite = newFavoriteStatus;
                try {
                    // update in localStorage using the localStorageService
                    const fetchAllMeta =
                        JSON.parse(localStorage.getItem('recipe_metadata')) ||
                        [];
                    const recipeIndex = fetchAllMeta.findIndex(
                        (recipe) => recipe.id === data.id
                    );

                    if (recipeIndex >= 0) {
                        fetchAllMeta[recipeIndex].isFavorite =
                            newFavoriteStatus;
                        localStorage.setItem(
                            'recipe_metadata',
                            JSON.stringify(fetchAllMeta)
                        );
                    }
                } catch (error) {
                    console.error('Failed to update favorite status:', error);
                }
            });

            const editBtn = this.shadowRoot.querySelector('.edit');
            editBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                alert('edit button clicked');
            });

            const deleteBtn = this.shadowRoot.querySelector('.delete');
            deleteBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                alert('delete button clicked');
            });
        };

        updateCard();
    }
}

customElements.define('recipe-card', RecipeCard);
