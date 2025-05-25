export class IDBService {
	constructor (storeName) {
		this.databaseName = 'AppStorage';
		this.storeName = storeName;
		this.database = null;
	}

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
					db.createObjectStore(this.storeName, { keypath: 'id', autoIncrement: true });
				}
			}

			request.onsuccess = (event) => {
				this.database = event.target.result;
				resolve(this.database);
			}

			request.onerror = (event) => {
				reject(new Error(`IndexedDB error: ${event.target.error}`));
			}
		});
  	}

  	async get(key) { 
		return new Promise((resolve, reject) => {
			this.openDatabase()
				.then((database) => {
					const transaction = database.transaction([this.storeName], 'readonly');
					const store = transaction.objectStoreNames(this.storeName);
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

	async delete(key) {
		return new Promise((resolve, reject) => {
			this.openDatabase()
				.then((database) => {
					const transaction = database.transaction([this.storeName], 'readwrite');
					const store = transaction.objectStoreNames(this.storeName);
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