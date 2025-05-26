import { IDBService } from './IDBService.js';

export class RecipeStore {
    constructor() {
        this.idbService = new IDBService('recipeStore');
    }

    async addRecipe(data) {
        try {
            const id = await this.idbService.set(data);
            return id;
        } catch (error) {
            console.error(`Failed to add recipe to storage: ${error}`);
            throw error;
        }
    }

    async getRecipe(id) {
        try {
            const recipe = await this.idbService.get(id);
            return recipe;
        } catch (error) {
            console.error(`Failed to get recipe (ID #${id}) from storage: ${error}`);
            throw error;
        }
    }

    async getRecipeImageURL(id) {
        try {
            const recipe = await this.idbService.get(id);

            if (!recipe || !recipe.image) {
                throw new Error('');
            }

            return recipe.image;
        } catch (error) {
            console.error(`Failed to get recipe image (ID #${id}) from storage: ${error}`);
            throw error;
        }
    }

    async getAllRecipes() {
        try {
            const recipes = await this.idbService.getAll();
            return recipes;
        } catch (error) {
            console.error(`Failed to retrieve all recipes: ${error}`);
            throw error;
        }
    }

    async updateRecipe(id, data) {
        try {
            const doesIdExist = await this.idbService.get(id);
            if (!doesIdExist) {
                throw new Error(`Recipe with ID #${id} not found`);
            }

            const updatedData = {...data, id};

            // updatedId should be the same as parameter id.
            const updatedId = await this.idbService.set(updatedData);
            return updatedId;
        } catch (error) {
            console.error(`Failed to update recipe: ${error}`);
            throw error;
        }
    }

    async deleteRecipe(id) {
        try {
            await this.idbService.delete(id);
        } catch (error) {
            console.error(`Failed to delete recipe: ${error}`);
            throw error;
        }
    }

    async syncToLocalStorage(recipe, mode) {
        // TODO: Sync recipe metadata to localStorage (add/update/delete)
    }
}
