import UserManagerConstructor from './usermanager-class.js';

let UserManager;

export default {
    name: 'user',
    install() {
        const Framework7 = this;
        UserManager = UserManagerConstructor(Framework7.Class);
        Framework7.UserManager = UserManager;
    },
    params: {
        usermanager: {
            containerEl: null,
            formEl: null,
            usernameTextEl: null,
            usernameTextElName: null,
            ulozitButtonEl: null,
        }
    },
    static: {
        UserManager
    },
    create() {
        let app = this;
        app.usermanager = {
            create(params) {
                return new UserManager(app, params)
            }
        };
    },
};