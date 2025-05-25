import { startTimerFromInputs, clearTimer } from '../components/timer.js';
export default function () {
    setTimeout(() => {
    document.getElementById('timer-set')?.addEventListener('click', (e) => {
        e.preventDefault();
        startTimerFromInputs();
    });

    document.getElementById('timer-clear')?.addEventListener('click', (e) => {
        e.preventDefault();
        clearTimer();
    });
    }, 0);

	return `<!-- Left Column - Ingredients and Instructions -->
        <section id="ingredients">
            <h2>Ingredients</h2>
            <ul>
                <li>Butter</li>
                <li>Chicken</li>
                <li>Pasta</li>
                <li>Sugar</li>
                <li>Black Pepper</li>
                <li>Rice</li>
            </ul>
        </section>

        <section id="instructions">
            <h2>Instructions</h2>
            <ol>
                <li>First step goes here five cups of water</li>
                <li>Step 2 goes here</li>
                <li>Step 3 and so on...</li>
            </ol>
        </section>

        <!-- Right Column - Card and Timer -->
        <aside>
            <article id="recipe-card">
                <h2>Recipe Details</h2>
                <!-- shadow DOM here-->
            </article><br>
            
            <h3>Cooking Timer</h3>
            <section id="timer-container">
                <div class="timer-display">1:14:00</div>

                <form>
                    <fieldset>
                    <div class="input-row">
                        <input type="number" id="hours" name="hours" min="0" max="12">
                        <label for="hours">hr</label>
                        </div>
                    <div class="input-row">
                        <input type="number" id="minutes" name="minutes" min="0" max="59">
                        <label for="minutes">min</label>
                        </div>
                    <div class="input-row">
                        <input type="number" id="seconds" name="seconds" min="0" max="59">
                        <label for="seconds">sec</label>
                        </div>
                    <div class="button-row">
                        <button id="timer-set">Set</button>
                        <button id="timer-clear">Clear</button>
                        </div>
                    </fieldset>
                </form>
            </section>`;

}