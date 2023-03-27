import Cache from './storeCache.js';

const prefix = 'fs';

export function getFontSize () {
    let c = new Cache(prefix);
    return (parseInt(c.get('main_font_size')) || -1);
}

export function setFontSize (size) {
    let c = new Cache(prefix);

    if (((size>=1) && (size<=3)) || (size===-1)) {
        c.set('main_font_size', size); //save to DB
        changeFontBodyClass(size);
    }
}

export function changeFontBodyClass (size) {
    try {
        let b = document.getElementsByTagName('html')[0];
        if (typeof(b) !== undefined) {
            b.classList.remove('font_size_1');
            b.classList.remove('font_size_2');
            b.classList.remove('font_size_3');

            let sz;
            switch(parseInt(size)) {
                case 1: sz='font_size_1'; break;
                case 2: sz='font_size_2'; break;
                case 3: sz='font_size_3'; break;
                default: sz='font_size_0';
            }

            b.classList.add(sz);
        }
    } catch (e) {
        console.log('Error: 856335500');
    }
}