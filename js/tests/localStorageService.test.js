import {
    getAllMetadata,
    upsertMetadata,
    deleteMetadata,
    matchFilters,
} from '../database/localStorageService.js';
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
            const items = [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' },
            ];
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

            const storedInfo = JSON.parse(
                localStorage.getItem(LOCAL_STORAGE_KEY)
            );
            expect(storedInfo).toHaveLength(1);
            expect(storedInfo[0]).toMatchObject(meta);
        });

        it('updates an existing entry when id matches', () => {
            const inital = [{ id: 10, name: 'Old Name' }];
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inital));

            upsertMetadata({ id: 10, name: 'New Name', isFavorite: true }); // change values and add favorite

            const storedInfo = JSON.parse(
                localStorage.getItem(LOCAL_STORAGE_KEY)
            );
            expect(storedInfo).toEqual([
                { id: 10, name: 'New Name', isFavorite: true },
            ]); // should be changed
        });
    });

    describe('deleteMetadata()', () => {
        it('throws if id is not provided or not a number', () => {
            expect(() => deleteMetadata()).toThrow();
            expect(() => deleteMetadata('foo')).toThrow();
        });

        it('removes the item with matching id', () => {
            const initialData = [
                { id: 1, name: 'Recipe1' },
                { id: 2, name: 'Recipe2' },
                { id: 3, name: 'Recipe3' },
            ];
            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(initialData)
            );

            deleteMetadata(2); // try deleting id 2

            const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
            expect(stored).toHaveLength(2);
            expect(stored.find((item) => item.id === 2)).toBeUndefined();
            expect(stored.map((item) => item.id)).toEqual([1, 3]);
        });

        it('does nothing if id is not found', () => {
            const initialData = [{ id: 1, name: 'Recipe1' }];
            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(initialData)
            );

            deleteMetadata(478); // try deleting non-existent id

            const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
            expect(stored).toEqual(initialData);
        });
    });

    describe('matchFilters()', () => {
        const initialData = [
            {
                id: 1,
                name: 'Recipe1',
                isFavorite: true,
                recipeCategory: 'Breakfast',
                recipeCuisine: 'American',
                estimatedTime: 20,
                recipeIngredient: [{ name: 'flour' }, { name: 'eggs' }],
                calories: 400,
            },
            {
                id: 2,
                name: 'Recipe2',
                isFavorite: false,
                recipeCategory: 'Lunch',
                recipeCuisine: 'Asian',
                estimatedTime: 40,
                recipeIngredient: [{ name: 'Sugar' }, { name: 'Rice' }],
            },
            {
                id: 3,
                name: 'Recipe3',
                isFavorite: false,
                recipeCategory: 'Dinner',
                recipeCuisine: 'Mexican',
                estimatedTime: 100,
                recipeIngredient: [{ name: 'flour' }, { name: 'shrimp' }],
            },
        ];

        it('returns true for empty filters object or undefined filters', () => {
            const recipe = initialData[0];

            // testing empty filters
            expect(matchFilters(recipe, {})).toBe(true);
            // testing undefined filters
            expect(matchFilters(recipe, undefined)).toBe(true);

            // testing filters with undefined values
            expect(
                matchFilters(recipe, {
                    isFavorite: null,
                    recipeCategory: undefined,
                })
            ).toBe(true);

            // testing fitleres with empty array
            expect(
                matchFilters(recipe, {
                    recipeIngredient: [],
                })
            ).toBe(true);
        });

        it('shows recipe filtered by isFavorite', () => {
            let recipe1 = initialData[0];
            let recipe2 = initialData[1];

            expect(matchFilters(recipe1, { isFavorite: true })).toBe(true);
            expect(matchFilters(recipe1, { isFavorite: false })).toBe(false);
            expect(matchFilters(recipe2, { isFavorite: false })).toBe(true);
            expect(matchFilters(recipe2, { isFavorite: true })).toBe(false);
        });

        it('shows recipe filtered by recipeCategory', () => {
            const recipe1 = initialData[0]; // Breakfast
            const recipe2 = initialData[1]; // Lunch
            const recipe3 = initialData[2]; // Dinner

            // testing Breakfast
            expect(matchFilters(recipe1, { recipeCategory: 'Breakfast' })).toBe(
                true
            );
            expect(matchFilters(recipe1, { recipeCategory: 'Lunch' })).toBe(
                false
            );
            // testing Lunch
            expect(matchFilters(recipe2, { recipeCategory: 'Lunch' })).toBe(
                true
            );
            expect(matchFilters(recipe2, { recipeCategory: 'Dinner' })).toBe(
                false
            );
            // testing Dinner
            expect(matchFilters(recipe3, { recipeCategory: 'Dinner' })).toBe(
                true
            );
            expect(matchFilters(recipe3, { recipeCategory: 'Breakfast' })).toBe(
                false
            );
        });

        it('shows recipe filtered by recipeCusine', () => {
            const recipe1 = initialData[0]; // American
            const recipe2 = initialData[1]; // Asian
            const recipe3 = initialData[2]; // Mexican

            // testing American
            expect(matchFilters(recipe1, { recipeCuisine: 'American' })).toBe(
                true
            );
            expect(matchFilters(recipe1, { recipeCuisine: 'Asian' })).toBe(
                false
            );
            // testing Asian
            expect(matchFilters(recipe2, { recipeCuisine: 'Asian' })).toBe(
                true
            );
            expect(matchFilters(recipe2, { recipeCuisine: 'Mexican' })).toBe(
                false
            );
            // testing Mexican
            expect(matchFilters(recipe3, { recipeCuisine: 'Mexican' })).toBe(
                true
            );
            expect(matchFilters(recipe3, { recipeCuisine: 'American' })).toBe(
                false
            );
        });

        it('shows recipe filtered by estimatedTime', () => {
            const recipe1 = initialData[0]; // 20 minutes
            const recipe2 = initialData[1]; // 40 minutes
            const recipe3 = initialData[2]; // 100 minutes

            // testing '<30mins' filter
            expect(
                matchFilters(recipe1, { timeRange: 'Under 30 minutes' })
            ).toBe(true);
            expect(
                matchFilters(recipe2, { timeRange: 'Under 30 minutes' })
            ).toBe(false);
            expect(
                matchFilters(recipe3, { timeRange: 'Under 30 minutes' })
            ).toBe(false);

            // testing '<=1hr' filter
            expect(matchFilters(recipe1, { timeRange: 'Under 1 Hour' })).toBe(
                true
            );
            expect(matchFilters(recipe2, { timeRange: 'Under 1 Hour' })).toBe(
                true
            );
            expect(matchFilters(recipe3, { timeRange: 'Under 1 Hour' })).toBe(
                false
            );

            // testing '>1hr' filter
            expect(matchFilters(recipe1, { timeRange: 'Over 1 Hour' })).toBe(
                false
            );
            expect(matchFilters(recipe2, { timeRange: 'Over 1 Hour' })).toBe(
                false
            );
            expect(matchFilters(recipe3, { timeRange: 'Over 1 Hour' })).toBe(
                true
            ); // 100 > 60
        });

        it('shows recipe filtered by recipeIngredient', () => {
            const recipe1 = initialData[0]; // flour, eggs
            const recipe2 = initialData[1]; // sugar, rice
            const recipe3 = initialData[2]; // flour, shrimp

            // testing recipe1
            expect(matchFilters(recipe1, { recipeIngredient: 'flour' })).toBe(
                true
            );
            expect(matchFilters(recipe1, { recipeIngredient: 'eggs' })).toBe(
                true
            );
            expect(matchFilters(recipe1, { recipeIngredient: 'shrimp' })).toBe(
                false
            );
            expect(
                matchFilters(recipe1, { recipeIngredient: ['flour', 'sugar'] })
            ).toBe(true);
            expect(matchFilters(recipe1, { recipeIngredient: ['FLOUR'] })).toBe(
                true
            ); // case insensitivity

            // testing recipe2
            expect(matchFilters(recipe2, { recipeIngredient: 'sugar' })).toBe(
                true
            );
            expect(matchFilters(recipe2, { recipeIngredient: 'rice' })).toBe(
                true
            );
            expect(
                matchFilters(recipe2, { recipeIngredient: ['SUGAR', 'RICE'] })
            ).toBe(true); // case insensitivity

            // testing recipe3
            expect(matchFilters(recipe3, { recipeIngredient: 'flour' })).toBe(
                true
            );
            expect(matchFilters(recipe3, { recipeIngredient: 'shrimp' })).toBe(
                true
            );
            expect(
                matchFilters(recipe3, { recipeIngredient: ['shrimp', 'rice'] })
            ).toBe(true);
        });

        it('shows recipe filtered by multiple filters (isFavorite, recipeCategory, recipeCusine)', () => {
            const recipe1 = initialData[0]; // Favorite, Breakfast, American
            const recipe2 = initialData[1]; // Not favorite, Lunch, Asian
            const recipe3 = initialData[2]; // Not favorite, Dinner, Mexican

            // testing recipe1
            expect(
                matchFilters(recipe1, {
                    isFavorite: true,
                    recipeCategory: 'Breakfast',
                    recipeCuisine: 'American',
                })
            ).toBe(true);
            expect(
                matchFilters(recipe1, {
                    isFavorite: true,
                    recipeCategory: 'Lunch', // This doesn't match
                    recipeCuisine: 'American',
                })
            ).toBe(false);
            expect(
                matchFilters(recipe1, {
                    recipeCategory: 'Breakfast',
                    estimatedTime: '<30mins',
                })
            ).toBe(true);

            // testing recipe2
            expect(
                matchFilters(recipe2, {
                    isFavorite: false,
                    recipeCategory: 'Lunch',
                    recipeCuisine: 'Asian',
                })
            ).toBe(true);

            // testing recipe3
            expect(
                matchFilters(recipe3, {
                    isFavorite: true, // recipe3 is not favorite
                    recipeCategory: 'Breakfast',
                    recipeCuisine: 'American',
                })
            ).toBe(false);
            expect(
                matchFilters(recipe3, {
                    recipeCategory: 'Dinner',
                    estimatedTime: '>1hr',
                })
            ).toBe(true);
        });
    });
});
