/**
 * Key used to store recipe metadata in localStorage.
 * @constant {string}
 * @private
 */
const LOCAL_STORAGE_KEY = 'recipe_metadata';

/**
 * Inserts or updates a recipe's metadata entry in localStorage.
 * @param {Object} metadata - The metadata object to upsert. Must include a valid `id` field.
 * @private
 */
export function upsertMetadata(metadata) {
    if (typeof metadata.id !== 'number') {
        throw new Error('Require id in the metadata to store');
    }

    const fetchAllMeta = getAllMetadata();
    const idIndex = fetchAllMeta.findIndex((item) => item.id === metadata.id);

    if (idIndex >= 0) {
        // Update the existing metadata
        fetchAllMeta[idIndex] = metadata;
    } else {
        // Insert
        fetchAllMeta.push(metadata);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fetchAllMeta));
}

/**
 * Deletes a recipe's metadata entry from localStorage.
 * @param {number} id - The recipe ID whose metadata should be removed.
 * @private
 */
export function deleteMetadata(id) {
    if (!id || typeof id !== 'number') {
        throw new Error('Require id to remove the metadata');
    }

    const fetchAllMeta = getAllMetadata();
    const filteredMetadata = fetchAllMeta.filter((item) => item.id !== id);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredMetadata));
}

/**
 * Retrieves all recipe metadata entries from localStorage.
 * @returns {Object[]} - An array of metadata objects stored in localStorage.
 */
export function getAllMetadata() {
    const dataItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    return dataItems ? JSON.parse(dataItems) : [];
}

/**
 * Checks if a given recipe matches a set of filter criteria.
 * @param {Object} recipe - A single recipe metadata entry.
 * @param {Object} filters - An object containing filter criteria.
 * @returns {boolean} - `true` if the recipe matches all criteria, otherwise `false`.
 * @private
 */
export function matchFilters(recipe, filters) {
    if (!filters || Object.keys(filters).length === 0) {
        return true;
    }
    for (const [key, value] of Object.entries(filters)) {
        if (
            value === null ||
            value === undefined ||
            (Array.isArray(value) && value.length === 0)
        ) {
            continue; // skip if not valid value
        }

        if (key === 'isFavorite' && recipe.isFavorite !== value) {
            return false;
        }
        if (key === 'recipeCategory' && recipe.recipeCategory) {
            if (recipe.recipeCategory.toLowerCase() !== value.toLowerCase()) {
                return false;
            }
        }
        if (key === 'recipeCuisine' && recipe.recipeCuisine) {
            if (recipe.recipeCuisine.toLowerCase() !== value.toLowerCase()) {
                return false;
            }
        }
        if (key === 'timeRange') {
            // Get time from either totalTime or estimatedTime property
            const time = parseInt(recipe.totalTime || recipe.estimatedTime);
            
            if (!time) {
                return false;
            }
            
            if (value === 'Under 30 minutes' && time >= 30) {
                return false;
            } else if (value === 'Under 1 Hour' && time >= 60) {
                return false;
            } else if (value === 'Over 1 Hour' && time <= 60) {
                return false;
            }
        }
        if (key === 'recipeIngredient') {
            if (
                !recipe.recipeIngredient ||
                !Array.isArray(recipe.recipeIngredient)
            ) {
                return false;
            }
            const ingredientFilter = Array.isArray(value) ? value : [value];

            const hasMatch = ingredientFilter.some((searchIng) => {
                return recipe.recipeIngredient.some((recipeIng) => {
                    return (
                        recipeIng.name.toLowerCase() === searchIng.toLowerCase()
                    );
                });
            });

            if (!hasMatch) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Filters stored recipe metadata based on the provided filter criteria.
 * @param {Object} filters - An object representing filters to apply (e.g., category, cuisine, time).
 * @returns {Object[]} - An array of metadata objects that match the filter.
 */
export function filterMetadata(filters) {
    const fetchAllMeta = getAllMetadata();
    return fetchAllMeta.filter((recipe) => matchFilters(recipe, filters));
}
