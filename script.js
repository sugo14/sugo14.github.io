import { ASCIIFont } from "./src/asciifont.js";
import { GridString } from "./src/gridstring.js";

let terminal = document.getElementById('terminal');
let currPrompt = document.getElementById('current-prompt');
let typed = document.getElementById('typed');
let horBars = document.getElementsByClassName('hor-bar');
let charMeasure = document.getElementById("char-measure");
let blogTitle = document.getElementById('blog-title');

const font = await ASCIIFont.fromFontFile("font");
const blogTitleString = "gcc optimization pragmas lie to you";
const horBarChar = '━';

let resizeTimeout;
let charWidth;

function getCharWidth() { charWidth = charMeasure.getBoundingClientRect().width; }

function resizeHorBars() {
    const width = terminal.offsetWidth;
    getCharWidth();
    const charCnt = Math.floor(width / charWidth);
    for (const horBar of horBars) {
        horBar.textContent = horBarChar.repeat(charCnt);
    }
}

function resizeBlogTitle() {
    const width = blogTitle.offsetWidth;
    const lineWidth = Math.floor(width / charWidth);
    const words = blogTitleString.split(" ");
    let title = new GridString(0, 0);

    let currLinePos = 0;
    let currLine = 0;

    const spaceWidth = 2;
    const lineHeight = font.access('a').height; // sketch

    function newLine() {
        currLinePos = 0;
        currLine++;
    }

    function addChar(char) {
        const gridstringChar = font.access(char);
        const addedLinePos = currLinePos + gridstringChar.width;
        if (addedLinePos > lineWidth) { newLine(); }
        title.insert(currLinePos, currLine * lineHeight, gridstringChar);
        currLinePos += gridstringChar.width;
    }

    function addWord(word) {
        for (const char of word) { addChar(char); }
        currLinePos += spaceWidth;
        if (currLinePos > lineWidth) { newLine(); }
    }

    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        let wordWidth = 0;
        for (const char of word) { wordWidth += font.access(char).width; }

        if (wordWidth > lineWidth) {
            newLine();
            addWord(word);
        }
        else {
            const addedLinePos = currLinePos + wordWidth;
            if (addedLinePos > lineWidth) { newLine(); }
            addWord(word);
        }
    }

    blogTitle.textContent = title.toString();
}

resizeHorBars();
resizeBlogTitle();

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => { // debounce
        resizeHorBars();
        resizeBlogTitle();
    }, 150);
});

window.addEventListener("keydown", async (e) => {
    // if (e.key.length === 1) { typed.textContent += e.key; }
    // else if (e.key === 'Backspace') { typed.textContent = typed.textContent.slice(0, -1); }
    // else if (e.key === 'Enter') {
    //     const command = typed.textContent;
    //     // deal with commands
    //     typed.textContent = '';
    // }
});
