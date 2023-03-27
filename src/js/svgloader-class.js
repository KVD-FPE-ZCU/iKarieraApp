import $ from 'dom7';
import {utils} from 'framework7';

class SVGCMSMenu {
    /**
     * Class CMSMenu costructor
     * @param loader SVGLoader
     */
    constructor(loader) {
        this.SVGLoader = loader;
    }

    init() {
        console.log('SVG CMSMenu init');

        //if (this.SVGLoader && this.SVGLoader.params && this.SVGLoader.params.loadShipScore) {
        if (this.SVGLoader) {
            //this.SVGLoader.setPartOnClick();
        }
    }

    onSVGLoaded(e) {
        this.init();
    }
}

class SVGShip {
    /**
     * Class Ship costructor
     * @param loader SVGLoader
     */
    constructor(loader) {
        this.SVGLoader = loader;
    }

    init() {
        console.log('SVG Lod init');
        //this.showSit(false);

        if (this.SVGLoader && this.SVGLoader.params && this.SVGLoader.params.loadShipScore) {
            this.setFromQuestion();
        }
    }

    onSVGLoaded(e) {
        this.init();
    }

    setFromQuestion() {
        const self = this;
        try {
            let qg = self.SVGLoader.app.store.getters.questionGroup.value;
            let q = qg.getItems();

            q.forEach(function (item) {
                try {
                    self.SVGLoader.showPart(item.partId(), item.partObtained());
                } catch (e) {
                    console.log('E7952324: ', e);
                }
            });
        } catch (e) {
            console.log('E7952336: ', e);
        }
    }

    showKormidlo(visible) {
        this.SVGLoader.showPart('kormidlo', visible);
    }

    showSmer(visible) {
        this.SVGLoader.showPart('smer', visible);
    }

    showVlajka(visible) {
        this.SVGLoader.showPart('vlajka', visible);
    }

    showSit(visible) {
        this.SVGLoader.showPart('sit', visible);
    }
}


export default function SVGLoaderConstructor (Framework7Class) {
    return class SVGLoader extends Framework7Class {
        constructor(app, params = {}) {
            params = utils.extend({}, app.params.svgloader, params);
            super(params, [app]);

            this.self = this;
            this.app = app;

            //ELEMENT - USE EL IF SET OR SEARCH defaultSelector
            let element = (params.el) ? params.el : $(params.defaultSelector)[0];

            //sub class for driving
            if (params.loadClassShip) {
                this.Ship = new SVGShip(this);
            }
            if (params.loadClassCMSMenu) {
                this.CMSMenu = new SVGCMSMenu(this);
            }

            //LOAD SVG IMAGE FROM URL
            this.svg = null;
            if ((typeof (element) !== 'undefined') && (element != null)) {
                try {
                    this.svg = element;
                    this.svg.style.width = '100%';
                    this.svg.style.height = 'auto';
                    this.svg.style.display = 'block';
                    this.svg.setAttribute('type', 'image/svg+xml');

                    if (params.reloadData) {
                        this.svg.setAttribute('data', '');
                    }

                    let self = this;
                    this.svg.addEventListener('load', function (e) {
                        self.onSVGLoaded(e);
                    });

                    this.svg.setAttribute('data', params.svgURL);
                } catch (e) {
                    console.log('E95667: Při nastavení SVG vznikla chyba');
                }
            }
        }

        /**
         * Main function for settings - it's called after SVG object is loaded
         * @param e
         */
        onSVGLoaded(e) {
            try {
                if (this.Ship) {
                    this.Ship.onSVGLoaded(this.Ship,e);
                }
                if (this.CMSMenu) {
                    this.CMSMenu.onSVGLoaded.call(this.CMSMenu,e);
                }
            } catch (e) {
                console.log('E756512: ', e, this);
            }
        }

        /**
         * Return SVG Content
         * @returns {null|Document}
         */
        svgContent() {
            if ((this.svg != null) && (typeof (this.svg) !== 'undefined')) {
                return this.svg.contentDocument;
            } else {
                console.log('E7954256: SVG Content is null');
                return null;
            }
        }

        /**
         * Get DOM element from SVG
         * @param part_id {string}
         * @returns {Element | HTMLElement|undefined}
         */
        getPart(part_id) {
            try {
                return this.svgContent().getElementById(part_id);
            } catch (e) {
                console.log('E9226632: ', e.message);
                return undefined;
            }
        }

        setPartOnClick(part_id, fce) {
            try {
                let el = this.getPart(part_id);
                if ((el !== undefined) && (el !== null)) {
                    el.addEventListener('click', fce);
                }
            } catch (e) {
                console.log('E9226533: ', e.message);
            }
        }

        /**
         * Show|hide|toogle visibility of SVG Object
         * @param part_id {string} Id of SVG element
         * @param visible {boolean | null} Show = true, Hide = false, Toogle = null
         */
        showPart(part_id, visible) {
            try {
                let el = this.getPart(part_id);
                if ((el !== undefined) && (el !== null)) {
                    if ((visible === null) || (typeof (visible) === 'undefined')) {
                        //TOOGLE
                        el.style.display = (el.style.display === 'none') ? 'block' : 'none';
                    } else {
                        el.style.display = (visible) ? 'block' : 'none';
                    }
                }
            } catch (e) {
                console.log('E75563159: ', e.message);
            }
        }
    }
}