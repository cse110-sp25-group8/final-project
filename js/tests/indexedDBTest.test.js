import { RecipeStore } from '../database/RecipeStore';
import 'fake-indexeddb/auto';

if (typeof global.structuredClone !== 'function') {
    global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
}

const db = new RecipeStore();
const data = [
    { id: 1, name: 'Pie', cookTime: '30' },
    { id: 2, name: 'Soup', cookTime: '40' },
    { id: 3, name: 'Noodles', cookTime: '60' },
    { id: 4, name: 'Hamburger', cookTime: '50' },
    { id: 5, name: 'Buns', cookTime: '25' }
];
let currentDBSize = 0;

// Check if recipes are being added correctly
describe('[C]RUD: Add to database tests', () => { 
    test('Add a recipe to the database.', async () => {
        let ans = await db.addRecipe(data[0]);
        currentDBSize++;
        expect(ans).toBe(currentDBSize);
    });

    test('Try to add no data to the database.', async () => {
        await expect(db.addRecipe()).rejects.toBeInstanceOf(Error);
    });
});

// Delete recipe
describe('CRU[D]: Delete from database tests', () => {
    test('Delete a recipe from the database.', async () => {
        await db.deleteRecipe(data[0]);
        currentDBSize--;

        let ans = await db.getRecipe(1);
        expect(ans).toBeUndefined();
    });

    test('Delete a non-existent recipe from the database.', async () => {
        // Due to IndexedDB's behavior, no error is thrown if the target ID doesn't exist.
        let badData = {id: 10, name: 'Potato Salad', cookTime: '15' };
        await expect(db.deleteRecipe(badData)).resolves.toBeUndefined();
    });
});

// Edit - doesn't effect count, before vs after of the field we edited, other fields are the same 


// Valid getRecipe - does it return correct data, check the fields



// Get all recipes 
test('Get all recipes in database', async() => {
    await db.addRecipe(data[0]);
    await db.addRecipe(data[1]);

    let res = [data[0], data[1]];
    let ans = await db.getAllRecipes();
    expect(ans).toEqual(res);
});




