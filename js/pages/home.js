import { init } from '../../display.js';

export default function () {
    requestAnimationFrame(() => {
        init();
    });
    return ` 
            <section class="sub-nav">
            <ul class="filters">
                <li>
                    <select class="btn-filter" name="filter1">
                        <option disabled selected>Meal</option>
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Desserts</option>
                        <option>Snacks</option>
                        <option>Beverages</option>
                    </select>
                </li>
                <li>
                    <select class="btn-filter" name="filter2">
                        <option disabled selected>Cuisine</option>
                        <option>Asian</option>
                        <option>European</option>
                        <option>Latin American</option>
                        <option>African</option>
                        <option>Middle Eastern</option>
                    </select>
                </li>
                <li>
                    <select class="btn-filter" name="filter 3">
                        <option disabled selected>Estimated Time</option>
                        <option> Under 30 minutes </option>
                        <option> Under 1 Hour</option>
                        <option> Over 1 Hour</option>
                    </select>
                </li>
                <li>
                    <select class="btn-filter" name="filter4">
                        <option disabled selected>Ingredients</option>
                        <option>Meat</option>
                        <option>Vegetables</option>
                        <option>Dairy</option>
                    </select>
                </li>
            </ul>
            <main> </main>

            <!-- Action buttons (Shuffle/Add) -->
            <div class="actions">
                <button class="btn-shuffle" type="button">Shuffle</button>
                <button class="btn-add" type="button" onclick="location.hash = '#/create'">Add Recipe Card</button>
            </div>

        </section>`;
}
