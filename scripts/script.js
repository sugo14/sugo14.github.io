import { ASCIIFont } from "./asciiFont.js";
import { GridString } from "./gridString.js";

const terminal = document.getElementById('terminal');
const currPrompt = document.getElementById('current-prompt');
const typed = document.getElementById('typed');
const horBars = document.getElementsByClassName('hor-bar');
const charMeasure = document.getElementById("char-measure");
const upperHeader = document.getElementById('upper-header');
const sugoGif = document.getElementById('sugo-gif');

const asciiTitles = document.getElementsByClassName('ascii-title');
let asciiTitlesStrings = [];
function initAsciiTitles() {
    for (const title of asciiTitles) { asciiTitlesStrings.push(title.textContent.toLowerCase()); }
}

let font;
async function initFont() {
    font = await ASCIIFont.fromFontFile("asciiNoSerif");
}

const horBarChar = '━';

let resizeTimeout;
let charWidth;

function getCharWidth() { charWidth = charMeasure.getBoundingClientRect().width; }

function resizeHorBars() {
    getCharWidth();
    for (const horBar of horBars) {
        const width = horBar.offsetWidth;
        const charCnt = Math.round(width / charWidth);
        horBar.textContent = horBarChar.repeat(charCnt);
    }
}

function resizeBlogTitle(i) {
    const blogTitle = asciiTitles[i];
    const blogTitleString = asciiTitlesStrings[i];

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

function resizeBlogTitles() {
    for (let i = 0; i < asciiTitles.length; i++) { resizeBlogTitle(i); }
}

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => { // debounce
        resizeHorBars();
        resizeBlogTitles();
    }, 150);
});

window.addEventListener("load", async () => {
    await initFont();
    initAsciiTitles();
    resizeHorBars();
    resizeBlogTitles();
});
