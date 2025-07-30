import { GridString } from "./gridString.js";

export class ASCIIFont {
    constructor(gridstringArray) {
        this.glyphs = gridstringArray;
    }

    static async fromFontFile(filename) {
        const response = await fetch("/assets/fonts/" + filename + ".txt");
        const text = await response.text();

        const fontGlyphs = [];
        let currCharArray = [];

        const lines = text.split("\n");
        for (const line of lines) {
            if (line == "" && currCharArray.length > 0) {
                fontGlyphs.push(GridString.fromStringArray(currCharArray));
                currCharArray = [];
            }
            else { currCharArray.push(line) }
        }
        if (currCharArray.length > 0) { fontGlyphs.push(GridString.fromStringArray(currCharArray)); }

        return new ASCIIFont(fontGlyphs);
    }

    access(char) {
        if (char == ',') { return this.glyphs[26]; }
        if (char == '.') { return this.glyphs[27]; }
        if (char == '!') { return this.glyphs[28]; }
        if (char == '?') { return this.glyphs[29]; }
        if (char == '\'') { return this.glyphs[30]; }
        return this.glyphs[char.charCodeAt(0) - 'a'.charCodeAt(0)]
    }

    genGridStr(string) {
        const gridString = new GridString(0, 0);
        for (const c of string) {
            if (c == " ") {
                gridString.resize(gridString.width + 3, gridString.height);
            }
            else {
                gridString.insert(gridString.width, 0, this.access(c));
            }
        }
        return gridString;
    }

    print() {
        for (const glyph of this.glyphs) { console.log(glyph.toString()); }
    }
}
