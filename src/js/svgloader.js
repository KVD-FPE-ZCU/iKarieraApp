//import $$ from "dom7";
import SVGLoaderConstructor from './svgloader-class.js';
let SVGLoader;

export default {
    //SOURCE: https://framework7.io/docs/plugins-api.html
    name: 'SVGLoader',
    install() {
        const Framework7 = this;
        SVGLoader = SVGLoaderConstructor(Framework7.Class);
        Framework7.SVGLoader = SVGLoader;
    },
    params: {
        svgloader: {
            defaultSelector: '.svg-loader',
            svgURL: '',
            reloadData: false,
            loadClassCMSMenu: false,
            loadClassShip: false,
            loadShipScore: true,
            ignorePages: [],
        }
    },
    static: {
        SVGLoader,
    },
    create() {
        const app = this;

        app.svgLoader = {
            create(params) {
                return new SVGLoader(app, params)
            }
        };
    },
};