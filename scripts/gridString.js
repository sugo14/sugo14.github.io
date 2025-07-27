export class GridString {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = [];
        for (let i = 0; i < height; i++) {
            this.grid.push(Array.from(" ".repeat(width)));
        }
    }

    static fromStringArray(array) {
        const gridString = new GridString(0, 0);
        gridString.grid = array.map(row => Array.from(row)); // spread into character strings
        // this ensures indexing is compliant to unicode multi-byte chars
        gridString.height = gridString.grid.length;
        gridString.width = 0;
        for (const line of gridString.grid) { gridString.width = Math.max(line.length, gridString.width); }
        gridString.resize(gridString.width, gridString.height);
        return gridString;
    }

    slice(x, y, sliceWidth, sliceHeight) {
        if (x < 0 || y < 0 || x + sliceWidth > this.width || y + sliceHeight > this.height) {
            throw new Error("Slice coordinates out of range");
        }
        const sliced = new GridString(sliceWidth, sliceHeight);
        for (let i = 0; i < sliceHeight; i++) {
            for (let j = 0; j < sliceWidth; j++) {
                sliced.grid[i][j] = this.grid[i + y][j + x];
            }
        }
        return sliced;
    }

    resize(newWidth, newHeight) {
        while (this.grid.length < newHeight) {
            this.grid.push(Array.from(" ".repeat(newWidth)));
        }
        for (const row of this.grid) {
            while (row.length < newWidth) { row.push(" "); }
        }
        this.width = newWidth
        this.height = newHeight
    }

    insert(x, y, gridString) {
        const minWidth = x + gridString.width, minHeight = y + gridString.height;
        this.resize(Math.max(this.width, minWidth), Math.max(this.height, minHeight));
        for (let i = 0; i < gridString.height; i++) {
            for (let j = 0; j < gridString.width; j++) {
                this.grid[i + y][j + x] = gridString.grid[i][j];
            }
        }
    }

    toString() {
        return this.grid.map(row => row.join("")).join("\n");
    }
}
