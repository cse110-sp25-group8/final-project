import { getAllMetadata, upsertMetadata, deleteMetadata, matchFilters } from '../database/localStorageService.js';
const LOCAL_STORAGE_KEY = 'recipe_metadata';

describe('localStorageService function testing', () => {
    // Hey guys! Add your unit tests for localStorageService functions here -Dorjé

    beforeEach(() => {
        // reset localStorage before each test
        console.log('Clearing local storage...');
        localStorage.clear();
    }); 

    describe('getAllMetadata()', () => {
        it('returns [] when nothing in storage', () => {
            expect(getAllMetadata()).toEqual([]);
        });

        it('parses stored JSON into an array', () => {
            const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
            expect(getAllMetadata()).toEqual(items);
        });
    });

    describe('upsertMetadata()', () => {
        it('throws if metadata.id is missing or not a number', () => {
            expect(() => upsertMetadata({})).toThrow(); // missing
            expect(() => upsertMetadata({ id: 'foo', name: 'Bar' })).toThrow(); //NaN
        });

        it('adds a new entry when the id is new', () => {
            const meta = { id: 10, name: 'Test Recipe' }; 
            upsertMetadata(meta);

            const storedInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
            expect(storedInfo).toHaveLength(1);
            expect(storedInfo[0]).toMatchObject(meta);
        });
        
        it('updates an existing entry when id matches', () => {
           const inital = [{ id: 10, name: 'Old Name' }];
           localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inital)); 

           upsertMetadata({ id: 10, name: 'New Name', isFavorite: true }); // change values and add favorite
           
           const storedInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
           expect(storedInfo).toEqual([ {id: 10, name: 'New Name', isFavorite: true} ]); // should be changed
        });
    });
    
    describe('deleteMetadata()', () => {
        it('throws if id is not provided or not a number', () => {
            expect(() => deleteMetadata()).toThrow();
            expect(() => deleteMetadata('foo')).toThrow();
        });
        
        it('removes the item with matching id', () => {
            const initialData = [
                { id: 1, name: 'Recipe1'}, 
                { id: 2, name: 'Recipe2'},
                { id: 3, name: 'Recipe3'}
            ];
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
            
            deleteMetadata(2); // try deleting id 2
            
            const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
            expect(stored).toHaveLength(2);
            expect(stored.find(item => item.id === 2)).toBeUndefined();
            expect(stored.map(item => item.id)).toEqual([1, 3]);
        })

        it('does nothing if id is not found', () => {
            const initialData = [{ id: 1, name: 'Recipe1'}];
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));

            deleteMetadata(478); // try deleting non-existent id

            const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
            expect(stored).toEqual(initialData);
        });
    });

    describe('matchFilters()', () => {
        const initialData = [
            { id: 1, name: 'Recipe1', isFavorite: true, recipeCategory: 'Breakfast', recipeCuisine: 'Amercian', estimatedTime: 20, recipeIngredients: [{name: 'flour'}, {name: 'eggs'}], calories: 400 }, 
            { id: 2, name: 'Recipe2', isFavorite: false, recipeCategory: 'Lunch', recipeCuisine: 'Asian', estimatedTime: 40, recipeIngredients: [{name: 'Sugar'}, {name: 'Rice'}]},
            { id: 3, name: 'Recipe3', isFavorite: false, recipeCategory: 'Dinner', recipeCuisine: 'Mexican', estimatedTime: 100, recipeIngredients: [{name: 'flour'}, {name: 'shrimp'}]}
        ];
        
        it('shows all recipe if no filter applied', () => {
            
            
            initialData.forEach((recipe) => {
                expect(matchFilters(recipe, {})).toEqual(true);
            });
        });

        it('shows recipe filtered by isFavorite', () => {
            let recipe1 = initialData[0];
            let recipe2 = initialData[1];

            expect(matchFilters(recipe1, {isFavorite: true})).toBe(true);
            expect(matchFilters(recipe1, {isFavorite: false})).toBe(false);
            expect(matchFilters(recipe2, {isFavorite: false})).toBe(true);
            expect(matchFilters(recipe2, {isFavorite: true})).toBe(false);
        });


//         it('shows recipe filtered by recipeCategory', () => {
            
// e
//         })

//         it('shows recipe filtered by recipeCusine', () => {
            
//         })
        
//         it('shows recipe filtered by estimatedTime', () => {

//         })

//         it('shows recipe filtered by recipeIngredient', () => {
            
//         })

//         it('shows recipe filtered by multiple filters (isFavorite, recipeCategory, recipeCusine)', () => {
            
//         })
        
//         it('returns true for empty filters object or undefineed filters', () => {
            
//         })

//         })
    });
});