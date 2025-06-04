import { IDBService } from './IDBService.js';
import { deleteMetadata, upsertMetadata } from './localStorageService.js';

/** Class representing the store interface for recipes in IndexedDB */
export class RecipeStore {
    /**
     * Create a RecipeStore object.
     * @constructor
     */
    constructor() {
        this.idbService = new IDBService('recipeStore');
    }

    /**
     * Adds a recipe to app's IndexedDB database.
     * @param {Object} data - Recipe data (similar to Google's recipe schema).
     * @returns {Promise<number>} - A Promise that resolves to new recipe's ID number.
     */
    async addRecipe(data) {
        try {
            const id = await this.idbService.set(data);

            // Send data information to localStorage
            const updatedData = { ...data, id };
            this.syncToLocalStorage(updatedData, 'insert');
            
            return id;
        } catch (error) {
            console.error(`Failed to add recipe to storage: ${error}`);
            throw error;
        }
    }

    /**
     * Retrieves a recipe from the app's IndexedDB database.
     * @param {number} id - A number corresponding to the target recipe's id.
     * @returns {Promise<Object>} - A Promise that resolves to the recipe Object.
     */
    async getRecipe(id) {
        try {
            const recipe = await this.idbService.get(id);
            return recipe;
        } catch (error) {
            console.error(
                `Failed to get recipe (ID #${id}) from storage: ${error}`
            );
            throw error;
        }
    }

    /**
     * Retrieves a recipe's image from the app's IndexedDB database.
     * @param {number} id - A number corresponding to the target recipe's id.
     * @returns {Promise<string>} - A Promise that resolves to an Object URL (via `URL.createObjectURL`) for use in <img> tags.
     */
    async getRecipeImageURL(id) {
        try {
            const recipe = await this.idbService.get(id);

            if (!recipe || !recipe.image) {
                throw new Error(`Recipe or recipe image not found (ID #${id})`);
            }

            return recipe.image;
        } catch (error) {
            console.error(
                `Failed to get recipe image (ID #${id}) from storage: ${error}`
            );
            throw error;
        }
    }

    /**
     * Retrieves all recipes from the app's IndexedDB database.
     * @returns {Promise<Object[]>} - A promise that resolves to an array of recipe Objects.
     */
    async getAllRecipes() {
        try {
            const recipes = await this.idbService.getAll();
            return recipes;
        } catch (error) {
            console.error(`Failed to retrieve all recipes: ${error}`);
            throw error;
        }
    }

    /**
     * Updates an existing recipe entry in the app's IndexedDB database.
     * @param {number} id - A number corresponding to the target recipe's id.
     * @param {Object} data - New recipe data to replace the old entry's data (similar to Google's recipe schema).
     * @returns {Promise<number>} - A Promise that resolves to new recipe's ID number.
     */
    async updateRecipe(id, data) {
        try {
            const doesIdExist = await this.idbService.get(id);
            if (!doesIdExist) {
                throw new Error(`Recipe with ID #${id} not found`);
            }

            const updatedData = { ...data, id };
            const updatedId = await this.idbService.set(updatedData);
            this.syncToLocalStorage(id, 'update');

            return updatedId;
        } catch (error) {
            console.error(`Failed to update recipe: ${error}`);
            throw error;
        }
    }

    /**
     * Removes an existing recipe entry from the app's IndexedDB database.
     * @param {number} id - A number corresponding to the target recipe's id.
     */
    async deleteRecipe(id) {
        try {
            await this.idbService.delete(id);
            this.syncToLocalStorage(id, 'delete');
        } catch (error) {
            console.error(`Failed to delete recipe: ${error}`);
            throw error;
        }
    }

    /**
     * Synchronizes localStorage and IndexedDB to hold the equivalent recipe info.
     * @param {Object} recipe - The full recipe object to sync.
     * @param {string} mode - The sync mode: 'insert', 'update', or 'delete'.
	 * @private
     */
    async syncToLocalStorage(recipe, mode) {
        const metadata = {
            id: recipe.id,
            name: recipe.name,
            isFavorite: false,
            recipeCategory: recipe.recipeCategory,
            recipeCuisine: recipe.recipeCuisine,
            totalTime: recipe.totalTime,
            recipeIngredient: recipe.recipeIngredient,
            calories: recipe.calories
        };

        if (mode === 'delete') {
            deleteMetadata(recipe.id);
        } else if (mode === 'insert' || mode === 'update') {
            console.log('METADATA = ', metadata);
            upsertMetadata(metadata);
        }
    }
}
