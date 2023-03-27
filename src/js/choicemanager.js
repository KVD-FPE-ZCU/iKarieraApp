//import $$ from "dom7";
import ChoiceManagerConstructor from './choicemanager-class.js';

let ChoiceManager;

export default {
    //SOURCE: https://framework7.io/docs/plugins-api.html
    name: 'choicemanager',
    install() {
        const Framework7 = this;
        ChoiceManager = ChoiceManagerConstructor(Framework7.Class);
        Framework7.ChoiceManager = ChoiceManager;
    },
    params: {
        choicemanager: {
            loadQuestionFromApp : true,
            autoSaveChoice: false,
            autoSaveQuestionIDX: true,
            autoScrollToTop: true,
            twoSideOnSmallScreen: true,
            containerEl: null,
            titleEl: null,
            descEl: null,
            levelEl: null,
            levelNumberZero: null,
            levelNumberOne: null,
            levelNumberTwo: null,
            levelNumberThree: null,
            levelNumberFour: null,
            levelNumberFive: null,
            levelUpEl: null,
            levelDownEl: null,
            prevEl: null,
            nextEl: null,
            saveEl: null,
            sectionZhodnoceniEl: null,
            zhodnoceniLevelInfoEl: null,
            zhodnoceniDoporuceniEl: null,
            url: 'sebepoznani/',
            urlBeforeFirstPage: '',
            urlAfterLastPage: '',
            beforeFirstPage: null,
            afterLastPage: null,
            updateQuestion: null,
            //updateChoice: null,
            updateChoiceLevel: null,
            //render: null,
            title: 'Sebepoznání',
            db_name: 'sebepoznani_group',
            items: {},
        },
    },
    static: {
        ChoiceManager
    },
    create() {
        const app = this;

        app.choicemanager = {
            create(params) {
                return new ChoiceManager(app, params)
            }
        };
    },
};