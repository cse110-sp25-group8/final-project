/**
 * Class representing a service wrapper for IndexedDB interactions.
 * For internal use only. Use higher-level stores (e.g. RecipeStore) for app-facing logic.
 * @private
 */
export class IDBService {
	/**
	 * Create an IndexedDB service instance for a specific object store.
	 * @param {string} storeName - The name of the object store to use.
	 */
	constructor (storeName) {
		this.databaseName = 'AppStorage';
		this.storeName = storeName;
		this.database = null;
	}

	/**
	 * Opens a connection to the IndexedDB database and initializes the object store if needed.
	 * @returns {Promise<IDBDatabase>} - A Promise that resolves to the opened database instance.
	 * @private
	 */
	async openDatabase() {
	    return new Promise((resolve, reject) => {
			if (this.database) {
				resolve(this.database);
				return;
			}

			const request = indexedDB.open(this.databaseName, 1);
			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				if (!db.objectStoreNames.contains(this.storeName)) {
					db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
				}
			};

			request.onsuccess = (event) => {
				this.database = event.target.result;
				resolve(this.database);
			};

			request.onerror = (event) => {
				reject(new Error(`IndexedDB error: ${event.target.error}`));
			};
		});
  	}

	/**
	 * Retrieves a single item from the object store by key.
	 * @param {number|string} key - The key of the item to retrieve.
	 * @returns {Promise<Object>} - A Promise that resolves to the retrieved object, or undefined if not found.
	 * @private
	 */
  	async get(key) { 
		return new Promise((resolve, reject) => {
			this.openDatabase()
				.then((database) => {
					const transaction = database.transaction([this.storeName], 'readonly');
					const store = transaction.objectStore(this.storeName);
					const request = store.get(key);

					request.onsuccess = () => {
						resolve(request.result);
					};

					request.onerror = (event) => { 
						reject(new Error(`Failed to get data: ${event.target.error}`));
					};
				})
				.catch(reject);
		});
	}

	/**
	 * Retrieves all items from the object store.
	 * @returns {Promise<Object[]>} - A Promise that resolves to an array of all stored objects.
	 * @private
	 */
	async getAll() {
		return new Promise((resolve, reject) => {
			this.openDatabase()
				.then((database) => {
					const transaction = database.transaction([this.storeName], 'readonly');
					const store = transaction.objectStore(this.storeName);
					const request = store.getAll();

					request.onsuccess = () => {
						resolve(request.result);
					};

					request.onerror = (event) => {
						reject(new Error(`Failed to get all data: ${event.target.error}`));
					};
				})
				.catch(reject);
		});
	}

	/**
	 * Inserts or updates an object in the store.
	 * If the object includes an `id`, it updates; otherwise, it auto-generates an ID.
	 * @param {Object} value - The value to insert or update in the store.
	 * @returns {Promise<number>} -  A Promise that resolves to the key (ID) of the inserted or updated object.
	 * @private
	 */
	async set(value) {
		return new Promise((resolve, reject) => {
			this.openDatabase()
				.then((database) => {
					const transaction = database.transaction([this.storeName], 'readwrite');
					const store = transaction.objectStore(this.storeName);
					const request = store.put(value);

					request.onsuccess = (event) => {
						const id = event.target.result;
						resolve(id);
					};

					request.onerror = (event) => { 
						reject(new Error(`Failed to get data: ${event.target.error}`));
					};
				})
				.catch(reject);
		});
	}

	/**
	 * Deletes an object from the object store by key.
	 * @param {number|string} key - The key of the item to delete.
	 * @private
	 */
	async delete(key) {
		return new Promise((resolve, reject) => {
			this.openDatabase()
				.then((database) => {
					const transaction = database.transaction([this.storeName], 'readwrite');
					const store = transaction.objectStore(this.storeName);
					const request = store.delete(key);

					request.onsuccess = () => {
						resolve();
					};

					request.onerror = (event) => { 
						reject(new Error(`Failed to get data: ${event.target.error}`));
					};
				})
				.catch(reject);
		});
	}
}