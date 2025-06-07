import { getAllMetadata, upsertMetadata, deleteMetadata, filterMetadata } from '../database/localStorageService.js';

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
            localStorage.setItem('recipe_metadata', JSON.stringify(items));
            expect(getAllMetadata()).toEqual(items);
        });
    });

});