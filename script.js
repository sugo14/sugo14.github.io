import { ASCIIFont } from "./src/asciifont.js";

let terminal = document.getElementById('terminal');
let currPrompt = document.getElementById('current-prompt');
let typed = document.getElementById('typed');
let horBars = document.getElementsByClassName('hor-bar')
let charMeasure = document.getElementById("char-measure")

const horBarChar = '━';

let resizeTimeout;

function getCharWidth() { return charMeasure.getBoundingClientRect().width; }

function resizeHorBars() {
    const width = terminal.offsetWidth;
    const charWidth = Math.ceil(width / getCharWidth());
    for (const horBar of horBars) {
        horBar.textContent = horBarChar.repeat(charWidth);
    }
}

resizeHorBars();

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => { // debounce
        const width = terminal.offsetWidth;
        const charWidth = Math.ceil(width / getCharWidth());
        for (const horBar of horBars) {
            horBar.textContent = horBarChar.repeat(charWidth);
        }
    }, 150);
})

window.addEventListener("keydown", async (e) => {
    // if (e.key.length === 1) { typed.textContent += e.key; }
    // else if (e.key === 'Backspace') { typed.textContent = typed.textContent.slice(0, -1); }
    // else if (e.key === 'Enter') {
    //     const command = typed.textContent;
    //     // deal with commands
    //     typed.textContent = '';
    // }
    const font = await ASCIIFont.fromFontFile("font");
    console.log(font.genGridStr("the quick brown fox jumps over the lazy dog").toString());
})
