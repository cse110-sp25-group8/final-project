export class IDBService {
  constructor(storeName) {
    this.databaseName = 'AppStorage';
    this.storeName = storeName;
    this.database = null;
  }

  async openDatabase() {

  }

  async get(key) {
    // TODO: Retrieve value by key from object store
  }

  async set(key, value) {
    // TODO: Insert or update value by key in object store
  }

  async delete(key) {
    // TODO: Delete entry by key from object store
  }
}
