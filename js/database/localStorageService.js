const LOCAL_STORAGE_KEY = 'recipe_metadata';

export function upsertMetadata(metadata) {
    // TODO: Insert or update recipe metadata entry in localStorage
    if (typeof metadata.id !== 'number') {
        throw new Error('Require id in the metadata to store');
    }

    const fetchAllMeta = getAllMetadata();
    const idIndex = fetchAllMeta.findIndex((item) => item.id === metadata.id);

    if (idIndex >= 0) {
        // update the existing metadata
        fetchAllMeta[idIndex] = metadata;
    } else {
        // insert
        fetchAllMeta.push(metadata);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fetchAllMeta));
}

export function deleteMetadata(id) {
    // TODO: Remove metadata entry by recipe ID from localStorage
    if (!id || typeof id !== 'number') {
        throw new Error('Require id to remove the metadata');
    }

    const fetchAllMeta = getAllMetadata();
    const filteredMetadata = fetchAllMeta.filter((item) => item.id !== id);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredMetadata));
}

export function getAllMetadata() {
    // TODO: Retrieve all recipe metadata from localStorage
    const dataItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    return dataItems ? JSON.parse(dataItems) : [];
}

function matchFilters(recipe, filters) {
    // TODO: Check if a recipe's metadata matches given filters
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
        if (key === 'recipeCategory' && recipe.recipeCategory !== value) {
            return false;
        }
        if (key === 'recipeCuisine' && recipe.recipeCuisine !== value) {
            return false;
        }
        if (key === 'estimatedTime') {
            if (value === '<30mins' && recipe.estimatedTime >= 30) {
                return false;
            } else if (value === '<=1hr' && recipe.estimatedTime > 60) {
                return false;
            } else if (value === '>1hr' && recipe.estimatedTime <= 60) {
                return false;
            }
        }
        if (key === 'recipeIngredient' && recipe.recipeIngredient !== value) {
            // TODO: work on this after our new Ingredient architech
        }
    }
    return true;
}

export function filterMetadata(filters) {
    // TODO: Return metadata entries matching the provided filters
    const fetchAllMeta = getAllMetadata();
    return fetchAllMeta.filter((recipe) => matchFilters(recipe, filters));
}
