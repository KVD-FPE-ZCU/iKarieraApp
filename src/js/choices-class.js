//import $ from 'dom7';
//import IDate from './idate/index';
import Cache from './storeCache.js';

/**
 * Class Choices for one question
 * @param obj Object
 * @param app Framework7
 * @constructor
 */
class ChoiceItem {
    constructor (app, obj, id) {
        this.app = app;
        this.title = '';
        this.title_short = '';
        this.title_zhodnoceni = '';
        this.section = null;
        this.db_item_name = null;
        this.levels = {};
        this.selected = 0;
        this.svg_part_id = '';
        this.svg_part_limit = 3;
        this.autosave = true; //(app.choicemanager.params.autoSaveChoice) ? app.choicemanager.params.autoSaveChoice : true;
        this.id = id;

        this.loadItem(obj);
    }

    loadItem(obj) {
        this.title = obj.title || 'Testovací titulek ???';
        this.title_short = obj.title_short || 'Sekce ???';
        this.title_zhodnoceni = obj.title_zhodnoceni || 'Moje dovednost je na úrovni:';
        this.section = obj.section || 'test_section';
        this.db_item_name = ((obj.section && (obj.section!=='')) || (obj.subitem && (obj.subitem!==''))) ? (obj.section + '_' + obj.subitem) : null;
        this.levels = obj.levels || {
            0: ['0. Na změny reaguji negativně.', 'Nové myšlenky a podněty zpracovávám těžko'],
            1: ['1. Na změny reaguji ...', 'Nové myšlenky a podněty zpracovávám ...'],
            2: ['2. Na změny reaguji ...', 'Nové myšlenky a podněty zpracovávám ...'],
        };
        this.svg_part_id = obj.svg_part_id || '';
        this.svg_part_limit = obj.svg_part_limit ? obj.svg_part_limit : 3;

        this.selected = -1;
        this.setLevel(this.getLevelFromDB());
    }

    getLevelsKeys() {
        return Object.keys(this.levels);
    }

    minLevelIdx() {
        return 0;
    }

    maxLevelIdx() {
        return this.getLevelsKeys().length - 1;
    }

    getLevel() {
        return this.selected;
    }

    getLevelValues() {
        let keys = this.getLevelsKeys();
        let key = keys[this.selected];

        if (key) {
            if (this.levels.hasOwnProperty(key)) {
                return this.levels[key];
            }
        }

        return null;
    }

    getLevelText() {
        let val = this.getLevelValues();

        return val ? val : '???';
    }

    getZhodnoceniText() {
        return this.title_zhodnoceni;
    }

    getLevelHTML() {
        const items = this.getLevelValues();

        let s = '<ul>';
        try {
            for (let key in items) {
                if (!items.hasOwnProperty(key)) continue;
                s += '<li>' + items[key] + '</li>';
            }
        } catch (e) {
            console.log('E62454: ', e.message);
        }
        s += '</ul>';
        return s;
    }

    setLevel(value) {
        let val = parseInt(value) || 0;
        if (val > this.maxLevelIdx()) {
            val = this.maxLevelIdx();
        }
        if (val < this.minLevelIdx()) {
            val = this.minLevelIdx();
        }

        if (val !== parseInt(this.getLevel())) {
            this.selected = val;
            if (this.autosave) {
                this.saveLevelToDB();
            }
        }

        return this.selected;
    }

    levelDown() {
        return this.setLevel(this.getLevel() - 1);
    }

    levelUp() {
        return this.setLevel(this.getLevel() + 1);
    }

    /**
     * Returs if choice is on first level
     * @returns {boolean}
     */
    isFirstLevel() {
        return (this.getLevel() <= this.minLevelIdx());
    }

    /**
     * Returs if choice is on last level
     * @returns {boolean}
     */
    isLastLevel() {
        return (this.getLevel() >= this.maxLevelIdx());
    }

    saveLevelToDB() {
        let c = new Cache(`ch_${this.id}`);

        if (this.app && this.db_item_name) {
            try {
                c.set(this.db_item_name, this.selected);
            } catch (e) {
                console.log('E62455: ', e.message);
            }
        }
    }

    getLevelFromDB() {
        let level = 0;
        let c = new Cache(`ch_${this.id}`);

        if (this.app && this.db_item_name) {
            try {
                level = parseInt(c.get(this.db_item_name)) || 0;
            } catch (e) {
                console.log('E62456: ', e.message);
            }
        }

        return level;
    }

    partObtained() {
        return this.getLevel()>=this.svg_part_limit;
    }

    partId() {
        return this.svg_part_id;
    }

    partImage() {
        return '/static/images/lod/' + this.svg_part_id + '.svg';
    }

    /*toHTML() {
        var s = '';
        try {
            for (var prop in this.levels) {
                if (!this.levels.hasOwnProperty(prop)) continue;

                s += '<div id="modul_sebepoznani_level_' + prop + '" class="level' + (this.getLevel() === prop ? ' active' : ''') + '">';
                s += '<ul>';
                var ls = this.levels[prop];
                for (var key in ls) {
                    if (!ls.hasOwnProperty(key)) continue;
                    s += '<li>' + ls[key] + '</li>';
                }
                s += '</ul></div>';
            }
        } catch (e) {
            console.log(e.message);
        }
        return s;
    };*/
}

class QuestionGroup {
    /**
     * Class Group of question
     * @param app Framework7
     * @param title String
     * @param date Date
     * @param items Object
     * @param db_group_name String
     * @constructor
     */
    constructor(app, title = 'Sebepoznání', db_group_name = null, date = null, items = {}) {
        let d = new Date();
        this.app = app;
        this.title = title;
        this.db_group_name = db_group_name;
        this.date = date === null ? d.getTime()  : date.getTime();
        /**
         * @private
         * @type {Array.<ChoiceItem>}
         */
        this.items = [];
        /** @private */
        this.last_idx = -1;
        this.autoSaveQuestionIDX = true;

        if(this.getId() === null) {
            this.setTestDate();
        }

        this.dbId = this.getId();
        this.db = new Cache(`ch_${this.dbId}`);

        //load items from constructor
        this.loadItems(items);
    }

    setTestDate() {
        let c = new Cache('ch');
        let lastId = this.getLastTestId();
        c.set(`sc_selfknowledge_test_date_${lastId + 1}`, this.date);
    }

    getLastTestId() {
        let c = new Cache('ch');
        let testDate = new Date();
        let i = -1;

        for(i = -1; testDate !== 0; i++) {
            testDate = c.get(`sc_selfknowledge_test_date_${i + 1}`);
        }
        return i - 1;
    }

    getId() {
        let c = new Cache('ch');
        let testDate = new Date();

        for(let i = 0; testDate !== 0; i++) {
            testDate = c.get(`sc_selfknowledge_test_date_${i}`);

            let td = new Date(testDate);

            if(td.getTime() === this.date) {
                return i;
            }
        }
        return null;
    }

    /**
     * Get all items
     * @returns {Array<ChoiceItem>}
     */
    getItems() {
        return this.items;
    }

    loadItems(items) {
        //DESTROY OLD ITEMS
        this.items.forEach(function(item){
            //item.destroy();
            item = null;
        });

        //PREPAIR CHOICES STRUCTURE
        this.items = [];
        let item;
        for (let key in items) {
            if (!items.hasOwnProperty(key)) continue;
            //create new item with choices
            item = items[key];
            this.items.push(new ChoiceItem(this.app, item, this.dbId));
        }

        //LOAD LAST QUESTION IDX
        let last_idx = this.getLastQuestionIDXFromDB();
        this.last_idx = -1;
        this.setActualQuestionIdx(last_idx);
    }

    saveLastQuestionIDXToDB() {
        if (this.app && this.db_group_name) {
            this.db.set(this.db_group_name, this.last_idx);
        }
    }

    getLastQuestionIDXFromDB() {
        let idx = 0;

        if (this.app && this.db_group_name) {
            idx = parseInt(this.db.get(this.db_group_name)) || 0;
        }

        return idx;
    }

    minQuestionIdx() {
        return 0;
    }

    maxQuestionIdx() {
        return Object.keys(this.items).length - 1;//return this.items.length - 1;
    }

    /**
     * Get index number actual question
     * @returns {number}
     */
    getActualQuestionIdx() {
        return this.last_idx;
    }

    setActualQuestionIdx(value) {
        let val = parseInt(value) || 0;
        if (val > this.maxQuestionIdx()) {
            val = this.maxQuestionIdx();
        }
        if (val < this.minQuestionIdx()) {
            val = this.minQuestionIdx();
        }

        if (val !== this.getActualQuestionIdx()) {
            this.last_idx = val;
            if (this.autoSaveQuestionIDX) {
                this.saveLastQuestionIDXToDB();
            }
        }

        return this.getActualQuestionIdx();
    }

    /**
     * Return Question with index
     * @param index number
     * @returns {ChoiceItem}
     */
    getQuestion(index) {
        return this.items[index];
    }

    /**
     *
     * @returns {ChoiceItem}
     */
    actualQuestion() {
        return this.getQuestion(this.getActualQuestionIdx());
    }

    prevQuestion() {
        this.setActualQuestionIdx(this.getActualQuestionIdx() - 1);

        return this.actualQuestion();
    }

    nextQuestion() {
        this.setActualQuestionIdx(this.getActualQuestionIdx() + 1);

        return this.actualQuestion();
    }

    hasPrevQuestion() {
        return (this.getActualQuestionIdx() > this.minQuestionIdx());
    }

    hasNextQuestion() {
        return (this.getActualQuestionIdx() < this.maxQuestionIdx());
    }

    testStarted() {
        this.db.set('is_running', true);
    }

    finishTest() {
        this.db.set('is_running', true);
        this.db.set('is_finished', true);
    }

    isTestFinished() {
        return this.db.get('is_finished');
    }

    isRunning() {
        return this.db.get('is_running');
    }
}

export default QuestionGroup;
