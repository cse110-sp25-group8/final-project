const { getAllMetadata, upsertMetadata, deleteMetadata, filterMetadata } = require('../database/localStorageService.js');

describe('localStorageService', () => {
    beforeEach(() => {
        localStorage.clear();
    }); 

    test('getAllMetadata returns [] when nothing in storage', () => {
        expect(getAllMetadata()).toEqual([]);
    });
});