const sugoGif = document.getElementById('sugo-gif');

let currCnt = 0;
const maxCnt = 12;
const filePath = "/assets/art/sugo-gif/"

let files = []

async function loadFiles() {
    for (let i = 0; i <= maxCnt; i++) {
        const frameFilePath = `${filePath}${i}.txt`;
        const response = await fetch(frameFilePath);
        const text = await response.text();
        files.push(text);
    }
}

async function updateGif() {
    currCnt = (currCnt + 1) % (maxCnt + 1);
    sugoGif.innerHTML = files[currCnt];
}

if (sugoGif) {
    loadFiles();
    window.setInterval(updateGif, 1000 / 10);
}
