import $ from 'dom7';
import Framework7 from 'framework7/bundle';

// Import F7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';


// Import Routes
import routes from './routes.js';
// Import Store
import store from './store.js';

// Import main app component
import App from '../app.f7';

import choiceManager from './choicemanager.js';
import userManager from './usermanager.js';
import Steps from '../js/step-class.js';
import PDF from './pdf-class.js';
import svgLoader from './svgloader.js';
import Cache from './storeCache.js';
import MSAuth from '../js/auth.js';
import MSGraph from '../js/graph.js';

Framework7.use(choiceManager);
Framework7.use(userManager);
Framework7.use(svgLoader);
//Přesunout mnoho funkcí do souboru utils.js (např. getFriendlyDate)
var app = new Framework7({
    name: 'Kariérní poradenství', // App name
    id: 'cz.zcu.kvd.poradenstvi',
    theme: 'auto', // Automatic theme detection
    el: '#app', // App root element
    component: App, // App main component
    panel: {
        el: '.panel-left',
        resizable: true,
        collapsedBreakpoint: 768,
        visibleBreakpoint: 1024,
        swipe: true,
    },
    view: {
        browserHistory: false,
        browserHistoryRoot: (function () {
            return location.origin;
        })(),
        browserHistorySeparator: '',
    },
    statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false
    },
    // Register service worker (only on production build)
    serviceWorker: process.env.NODE_ENV === 'production' ? {
        path: '/service-worker.js',
    } : {},
    // App store
    store: store,
    // App routes
    routes: routes,
    dialog: {
        title: 'Varování!',
        buttonOk: 'Odhlásit',
        buttonCancel: "Zrušit",
    },
    on: {
        init: function () {
            const f7 = this;
            this.getTest();
            this.store.dispatch('getTestsDates');


            f7.pdfLib = new PDF();
            f7.stepsManager = new Steps();
            f7.store.dispatch('getUser');
            f7.store.dispatch('getIdea');
            f7.store.dispatch('getAge');
            f7.store.dispatch('getFontSize');
        },
    },
});

app.getTest = (date = null) => {
    if (date !== null) {
        if (!app.testExists(date)) return;
        app.store.dispatch('getQuestionGroup', {
            app: app,
            date: date,
        });

        app.store.dispatch('setLastTestDate', {
            date: date,
        });
        return;
    }

    let lastDate = app.store.getters.lastTestDate.value;
    let now = new Date()
    lastDate ??= new Date();

    if (lastDate.getTime() < now.getTime() - 86400000) lastDate = now; // User can do new test after 24 hours

    app.store.dispatch('getQuestionGroup', {
        app: app,
        date: lastDate,
    });

    app.store.dispatch('setLastTestDate', {
        date: lastDate,
    });
}

app.testExists = (date) => {
    let c = new Cache('ch');
    let testDate = new Date();

    for (let i = 0; testDate !== 0; i++) {
        testDate = c.get(`sc_selfknowledge_test_date_${i}`);
        if (testDate !== 0) {
            let dbDate = new Date(testDate);
            let argDate = new Date(date);
            if (dbDate.getTime() === argDate.getTime()) return true;
        }
    }
    return false;
}

app.getLastFinishedTestDate = () => {
    let c = new Cache('ch');
    let testDate = new Date();
    let ret;

    for (let i = 0; testDate !== 0; i++) {
        testDate = c.get(`sc_selfknowledge_test_date_${i}`);
        if (testDate !== 0) {
            let testCache = new Cache(`ch_${i}`)
            let isFinished = testCache.get(`is_finished`);
            if (isFinished) {
                ret = testDate;
            }
        }
    }
    ret = new Date(ret);
    return ret;
}

app.getFriendlyDate = (date) => {
    let fd = new Date(date);
    return fd.toLocaleDateString("cs-CZ")
}

app.showContinueText = () => {
    let testDate = new Date(app.store.getters.lastTestDate.value);
    let ret = testDate.getTime() > Date.now() - 86400000;

    function isTestRunning() {
        let c = new Cache('ch');
        let testDate = new Date();
        let i = 0;

        for (; testDate !== 0; i++) {
            testDate = c.get(`sc_selfknowledge_test_date_${i}`);
        }

        c = new Cache(`ch_${i - 2}`);
        let ret = c.get('is_running');
        return ret
    }

    return isTestRunning() && ret;
}

app.saveToCloud = async (data) => {
    let ms = new MSAuth();
    await ms.signIn();

    let msGraph = new MSGraph();
    let blob = new Blob([data], { type: 'text/plain' });
    let file = new File([blob], 'ikariera-data.json');
    let response = await msGraph.uploadFile(file);
    return response;
}

app.loadFromCloud = async () => {
    let ms = new MSAuth();
    await ms.signIn();

    let msGraph = new MSGraph();

    const files = await msGraph.getFiles();
    const saveFileExists = JSON.stringify(files)
        .includes('ikariera-data.json');
    if (!saveFileExists) return -1;

    let fileInfo = Object.keys(files)
        .filter(x => files[x].name === 'ikariera-data.json')
        .map(x => files[x]);
    let fileUrl = await msGraph.downloadFile(fileInfo[0]);
    return await app.getRemoteFileContent(fileUrl);
}

app.getLocalStorage = () => JSON.stringify(localStorage);

app.writeLocalStorage = (data) => {
    let dataObj = JSON.parse(data);
    Object.keys(dataObj).forEach((key) => {
        let c = new Cache();
        c.set(localStorage.setItem(key, dataObj[key]));
    })
}

app.loadFromMS = async () => {
    const fileJSON = app.loadFromCloud();
    app.writeLocalStorage(fileJSON);
    app.router.refreshPage();
}

app.saveToMS = async (callbackSuccess = null) => {
    let ls = app.getLocalStorage();
    let response = await app.saveToCloud(ls);
    if (response && callbackSuccess)
        callbackSuccess();
}

app.getRemoteFileContent = async (url) => await fetch(url).then(r => r.text());

app.logout = () => {
    app.dialog.confirm(
        'Odhlášení z aplikace <b>SMAŽE</b> všechna tvá data. Pokud chceš data zachovat, ulož je na svůj účet Microsoft v Nastavení.',
        () => {
            app.store.dispatch('clearState');
            app.views.main.router.navigate('/vitej/');
        });
}

const setMenuSelected = (value, defaultValue = 'home') => {
    let selectedItem = value ?? defaultValue;
    let element = $(`.navigation-drawer .item-selected-${selectedItem}`);

    if (element.length === 0) return;

    $('.navigation-drawer .item-selected').removeClass('item-selected');

    element.addClass('item-selected');
}

app.setSelectedMenuItem = (item) => {
    console.log(item);
    app.store.dispatch('setMenuItem', { item: item });
    setMenuSelected(item, 'home');
}

app.showSuccessToast = () => {
    if (!app.successToast) {
        app.successToast = app.toast.create({
            text: 'Data byla uložena na tvůj účet Microsoft.',
            position: 'center',
            horizontalPosition: 'center',
            closeTimeout: 3000,
        });
    }
    // Open it
    app.successToast.open();
}