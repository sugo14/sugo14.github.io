import { GridString } from './gridString.js';

let artData = []

async function loadArt() {
    const response = await fetch('/assets/art/footer.json');
    artData = await response.json();
}

function selectArt() {
    const randomIndex = Math.floor(Math.random() * artData.length);
    return artData[randomIndex];
}

async function initFooterArt() {
    await loadArt();
    const selectedArt = selectArt();
    const artSplit = selectedArt.art.split("\n");
    const newlineCnt = artSplit.length - 1;
    if (newlineCnt < 4) {
        document.querySelector("#footer-ascii").classList.add("upline");
    }
    document.querySelector(".ascii-art").textContent = GridString.fromStringArray(artSplit).toString();
    document.querySelector(".ascii-art").href = selectedArt.link;
}

initFooterArt();
