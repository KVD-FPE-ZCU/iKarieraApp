import $ from 'dom7';
import {utils} from 'framework7';
import User from './user-class.js';

export default function UserManagerConstructor (Framework7Class) {
    return class UserManager extends Framework7Class {
        constructor(app, params = {}) {
            super(params, [app]);
            const self = this;
            this.params = utils.extend({}, app.params.usermanager, params);
            // Load a user
            this.user = new User(app);

            var $containerEl;
            if (self.params.containerEl) {
                $containerEl = $(self.params.containerEl);
            }

            var $formEl;

            if (self.params.formEl) {
                $formEl = $(self.params.formEl);
            }

            var $usernameTextEl;
            if (self.params.usernameTextEl) {
                $usernameTextEl = $(self.params.usernameTextEl);
            }

            var $usernameTextElName;
            if (self.params.usernameTextElName) {
                $usernameTextElName = self.params.usernameTextElName;
            }

            var $ulozitButtonEl;
            if (self.params.ulozitButtonEl) {
                $ulozitButtonEl = $(self.params.ulozitButtonEl);
            }

            var view;
            if ($containerEl) {
                view = $containerEl.parents('.view').length && $containerEl.parents('.view')[0].f7View;
            }
            if (!view) view = app.views.main;

            utils.extend(self, {
                app,

                $containerEl,
                containerEl: $containerEl && $containerEl[0],
                inline: $containerEl && $containerEl.length > 0,

                $formEl,
                formEl: $formEl && $formEl[0],

                $usernameTextEl,
                usernameTextEl: $usernameTextEl && $usernameTextEl[0],

                $usernameTextElName,
                usernameTextElName: $usernameTextElName && $usernameTextElName[0],

                $ulozitButtonEl,
                ulozitButtonEl: $ulozitButtonEl && $ulozitButtonEl[0],

                initialized: false,
                url: self.params.url,
                view,
            });

            /**
             * Save the user to DB
             * @param {Object} e PointerEvent
             */
            function saveClick(e) {
                e.preventDefault();

                let formData = JSON.stringify(self.app.form.convertToData($formEl));
                formData = JSON.parse(formData);

                let name = formData[$usernameTextElName];

                if (!name && (!formData.hasOwnProperty('username') || !formData['username'])) {
                    $usernameTextEl.addClass('input-invalid');
                    $usernameTextEl.parent().parent().parent().addClass('item-input-with-error-message item-input-invalid');

                    return;
                }

                self.user.setUsername(formData[$usernameTextElName])
            }

            // Events
            utils.extend(self, {
                attachInputEvents() {
                    self.$ulozitButtonEl.forEach((el) => $(el).on('click', saveClick));
                },
                detachInputEvents() {
                   self.$ulozitButtonEl.forEach((el) => $(el).off('click', saveClick));
                },
            });
            self.attachInputEvents();
        }

        destroy() {
            const self = this;

            if (self.destroyed) return;

            self.detachInputEvents();
            utils.deleteProps(self);
            self.destroyed = true;
        }
    }
}
