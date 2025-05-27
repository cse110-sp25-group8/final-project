import { IDBService } from './IDBService.js';

export class PreferencesStore {
	constructor() {
		this.idbService = new IDBService('preferencesStore');
	}

	async addSetting(id, value) {
		// TODO: Add new preference setting if it doesn't already exist
	}

	async getSetting(id) {
		// TODO: Retrieve a setting by its key
	}

	async updateSetting(id, value) {
		// TODO: Update an existing setting
	}
}