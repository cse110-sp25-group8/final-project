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
                height: 353px;
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
                height: 175px;
                width: 228px;
                background-color: gray;
                border-radius: 25px;
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
                color: gray;
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
                border-top: 2.7px solid #F4F5F4;
                border-bottom: 2.7px solid #F4F5F4;
                margin-top: 18px;
                margin-left: 17px;
                margin-right: 17px;
                color: #302F2F;
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

        // Dumym values to be removed
        const article = this.shadowRoot.querySelector('article');
        article.innerHTML = `
            <!-- <img src="${data.imgSrc}" alt="${data.imgAlt}"> -->
            <div class="pic-box">
                <button>
                    <img src="../assets/star.svg" alt="star">
                </button>
                <button>
                    <img src="../assets/horizontal.svg" alt="star">
                </button>
            </div>
            <p class="recipe-title">Dummy Recipe</p>
            <section class="time-and-calories">
                <img src="../assets/time.svg" alt="time">
                <time>2 hr</time>
                <img src="../assets/calories.svg" alt="calories">
                <p class="calories">300 kcal</p>
            </section>
            <p class="ingredients">Ingredient_1, Ingredient_2, Ingredient_3</p>
        `;
    }
}

customElements.define('recipe-card', RecipeCard); 