import { ASCIIFont } from "./asciiFont.js";

const fontPromise = ASCIIFont.fromFontFile("ascii")

export async function asciiTitle(title) {
    const font = await fontPromise;
    return font.genGridStr(title).toString();
}
