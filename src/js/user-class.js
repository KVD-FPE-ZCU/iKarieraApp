import Cache from './storeCache.js';

/**
 * Represents a single user of the app
 * @param {object} cache StoreCache
 * @constructor
 */
class User {
    constructor(cache) {
        this.username = '';
        this.db_item_name = 'sc_uzivatel';
        this.cache = new Cache('user');
        
        this.loadUser();
    }

    /**
     * Load a user from DB
     * */
    loadUser() {
        this.setUsername(this.getUserFromDB());
    }

    /**
     * Create or change a username of the current user
     * @param {string} value
     */
    setUsername(value) {
        this.username = value;
        this.saveUserToDB();
        return this.username;
    }

    /** 
     *  Get a username of the current user from DB
     *  @returns {string} 
     */
    getUsername() {
        return this.getUserFromDB();
    }

    /**
     * Saves the current user to DB
     * */
    saveUserToDB() {
        try {
            this.cache.set(this.db_item_name, this.username);
        } catch (e) {
            console.log('E62455: ', e.message);
        }
    }

    /**
     * Get a user from DB
     * @returns {string}
     * */
    getUserFromDB() {
        let username = '';
        if (this.cache && this.db_item_name) {
            try {
                username = this.cache.get(this.db_item_name);
            } catch (e) {
                console.log('E62456: ', e.message);
            }
        }

        return username;
    }

    /**
     * Delete the current user from DB and app
     * */
    deleteUser() {
        this.username = '';
        this.cache.set(this.db_item_name, this.username);
    }

    /**
     * Check if the current user has a username
     * @returns {boolean}
     * */
    isUser() {
        return this.getUsername() == '0' ? false : true;
    }
}

export default User;