const sugoGif = document.getElementById('sugo-gif');

let currCnt = 0;
const maxCnt = 12;
const filePath = "/assets/art/sugo-gif/"

async function updateGif() {
    currCnt = (currCnt + 1) % (maxCnt + 1);
    const frameFilePath = `${filePath}${currCnt}.txt`;
    const response = await fetch(frameFilePath);
    const text = await response.text();
    sugoGif.innerHTML = text;
}

if (sugoGif) {
    window.setInterval(updateGif, 1000 / 10);
}
