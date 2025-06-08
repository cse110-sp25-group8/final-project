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
let actualDBSize = 0;

// Check if recipes are being added correctly
describe('[C]RUD: Add to database tests', () => { 
    test('Add a recipe to the database.', async () => {
        const ans = await db.addRecipe(data[0]);
        actualDBSize++;
        expect(ans).toBe(actualDBSize);
    });

    test('Try to add no data to the database.', async () => {
        await expect(db.addRecipe()).rejects.toBeInstanceOf(Error);
    });
});

// Delete recipe
describe('CRU[D]: Delete from database tests', () => {
    test('Delete a recipe from the database.', async () => {
        await db.deleteRecipe(data[0]);
        actualDBSize--;

        const ans = await db.getRecipe(1);
        expect(ans).toBeUndefined();
    });

    test('Delete a non-existent recipe from the database.', async () => {
        // Due to IndexedDB's behavior, no error is thrown if the target ID doesn't exist.
        const badData = {id: 10, name: 'Potato Salad', cookTime: '15' };
        await expect(db.deleteRecipe(badData)).resolves.toBeUndefined();
    });
});

// Edit - doesn't effect count, before vs after of the field we edited, other fields are the same 
describe('CR[U]D: Update database tests', () => {
    test('Update a valid recipe in the database', async () => {
        // Add a recipe to the database
        await db.addRecipe(data[0]);
        actualDBSize++;

        // Update entry #1
        const newData = {id: 1, name: 'Potato Salad', cookTime: '15' };
        await db.updateRecipe(1, newData);

        // Check to see whether database size is unchanged
        let currentDatabase = await db.getAllRecipes();
        let currentDatabaseSize = currentDatabase.length;
        expect(currentDatabaseSize).toBe(actualDBSize);

        // Check to see data actually updated but ID still is the same
        const firstRecipe = await db.getRecipe(1);
        expect(firstRecipe.id).toBe(data[0].id);
        expect(firstRecipe.name).not.toBe(data[0].name);
        expect(firstRecipe.cookTime).not.toBe(data[0].cookTime);

        // Remove test entry for future tests
        await db.deleteRecipe(newData);
        actualDBSize--;

        currentDatabase = await db.getAllRecipes();
        currentDatabaseSize = currentDatabase.length;
        expect(currentDatabaseSize).toBe(actualDBSize);
    });

    test('Update a nonexistent recipe in the database', async () => {

    });
});

// Valid getRecipe - does it return correct data, check the fields
describe('C[R]UD: Read from database tests', () => {
    test('Get a recipe from the database', async () => {
        // Add a recipe to DB to acquire later
        const id = await db.addRecipe(data[0]);
        actualDBSize++;
        expect(id).toBe(actualDBSize);

        // Read the added entry
        const ans = await db.getRecipe(1);
        expect(ans.name).toBe(data[0].name);
        expect(ans.cookTime).toBe(data[0].cookTime);

        // Remove test entry for future tests
        await db.deleteRecipe(data[0]);
        actualDBSize--;

        const currentDatabase = await db.getAllRecipes();
        const currentDatabaseSize = currentDatabase.length;
        expect(currentDatabaseSize).toBe(actualDBSize);
    });
    
    test('Try to get nonexistent recipe in the database', async () => {
        const ans = await db.getRecipe(3); 
        expect(ans).toBeUndefined();
    });
});

// Get all recipes 
test('Get all recipes in database', async() => {
    for (let i = 0; i < data.length; i++) {
        await db.addRecipe(data[i]);
    }

    const ans = await db.getAllRecipes();
    expect(ans).toEqual(data);
});




