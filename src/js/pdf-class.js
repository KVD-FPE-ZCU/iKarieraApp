import { PDFDocument, grayscale, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'

/**
 * Class for creating a modifying PDF document
 */
class PDF {
    /**
     * Initialization of the PDF class
     * @async
     * @param {number} fontSize
     * @param {Object} textColor
     * @param {number} textColor.r Red color in RGB color model
     * @param {number} textColor.g Green color in RGB color model
     * @param {number} textColor.b Blue color in RGB color model
     */
    async init(fontSize, textColor) {
        const fontBytes = await fetch('/fonts/Roboto-Light.ttf').then((res) => res.arrayBuffer());
        const fontBoldBytes = await fetch('/fonts/Roboto-Bold.ttf').then((res) => res.arrayBuffer());

        this.pdfDoc = await PDFDocument.create();

        this.pdfDoc.registerFontkit(fontkit);

        this.font = await this.pdfDoc.embedFont(fontBytes);
        this.fontBold = await this.pdfDoc.embedFont(fontBoldBytes);
        this.fontSize = fontSize;
        this.textColor = rgb(textColor.r, textColor.g, textColor.b);
    }

    /**
     * Add new page to PDF doc
     */
    addPage() {
        this.page = this.pdfDoc.addPage();
    }

    /**
     * Add text to PDF document
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {boolean} bold
     * @param {number} fontSize
     * @param {Object} color
     * @param {number} color.r Red color in RGB color model
     * @param {number} color.g Green color in RGB color model
     * @param {number} color.b Blue color in RGB color model
     */
    addText(text, x, y, bold = false, fontSize = null, color = null, maxWidth = 440) {
        fontSize = fontSize === null ? this.fontSize : fontSize;
        color = color === null ? this.textColor : rgb(color.r, color.g, color.b);
        const font = bold ? this.fontBold : this.font;

        this.page.drawText(text, {
            x: x,
            y: y,
            size: fontSize,
            font: font,
            color: color,
            maxWidth: maxWidth,
            lineHeight: 15,
        });
    }

    /**
     * Add a border on the page
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} opacity
     * @param {Object} color
     * @param {number} color.r Red color in RGB color model
     * @param {number} color.g Green color in RGB color model
     * @param {number} color.b Blue color in RGB color model
     */
    addBorder(x, y, width, height, opacity, color) {
        this.page.drawRectangle({
            x: x,
            y: y,
            width: width,
            height: height,
            borderWidth: 1,
            borderColor: grayscale(0.5),
            color: rgb(color.r, color.g, color.b),
            opacity: opacity,
            borderOpacity: 1,
        })
    }

    /**
     * Measure the width of a string of text drawn in the default font and the default size.
     * @param {string} text
     * @param {fontSize} [fontSize=default font size]
     * @returns {number} The width of a text
     */
    getWidthOfText(text, fontSize = null) {
        if (fontSize === null) {
            fontSize = this.fontSize;
        }
        return this.font.widthOfTextAtSize(text, this.fontSize);
    }

    /** 
     *  Get width and height of current page
     *  @returns {object} The width and height of the page
     */
    getPageSize() {
        return this.page.getSize();
    }

    /**
     * Generate PDF document and get its URL
     * @async
     * @returns {object} DOMString containing a PDF document URL
     * */
    async getUrl() {
        const pdfBytes = await this.pdfDoc.save()
        const file = new Blob([pdfBytes], { type: 'application/pdf' });
        return URL.createObjectURL(file);
    }

    /**
     * Generate BLOB from PDF document
     * @returns 
     */
    async getBlob() {
        const pdfBytes = await this.pdfDoc.save()
        return new Blob([pdfBytes], { type: 'application/pdf' });
    }
}

export default PDF;