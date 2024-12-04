/*
* Datei mit XMAS Buchstaben. 
* 
* Es muss horizontal und vertikal nach XMAS gesucht werden
* Es ist die Anzahl der gefundenen XMAS Buchstaben zu ermitteln
* 
* MMMSXXMASM
* MSAMXMSMSA
* AMXSXMAAMM
* MSAMASMSMX
* XMASAMXAMM
* XXAMMXXAMA
* SMSMSASXSS
* SAXAMASAAA
* MAMMMXMMMM
* MXMXAXMASX
*/

const file = Bun.file("input.txt");
const fileContent = await file.text();
const lines = fileContent.split("\n");
const xmas = "XMAS";
// damn this is dirty
const samx = "SAMX";
let count = 0;
const wordLength = 4;

// horizontal
for (const line of lines) {
    for (let i = 0; i <= line.length - wordLength; i++) {
        if (line.slice(i, i + wordLength) === xmas || line.slice(i, i + wordLength) === samx) {
            count++;
        }
    }
}

// vertical
const columns = lines[0].length;
for (let i = 0; i < columns; i++) {
    let vertical = "";
    for (let j = 0; j < lines.length; j++) {
        vertical += lines[j][i];
    }
    for (let j = 0; j <= vertical.length - wordLength; j++) {
        if (vertical.slice(j, j + wordLength) === xmas || vertical.slice(j, j + wordLength) === samx) {
            count++;
        }
    }
}

// diagonal (top-left to bottom-right)
for (let i = 0; i <= lines.length - wordLength; i++) {
    for (let j = 0; j <= columns - wordLength; j++) {
        let diagonal1 = "";
        for (let k = 0; k < wordLength; k++) {
            diagonal1 += lines[i + k][j + k];
        }
        if (diagonal1 === xmas || diagonal1 === samx) {
            count++;
        }
    }
}

// diagonal (top-right to bottom-left)
for (let i = 0; i <= lines.length - wordLength; i++) {
    for (let j = wordLength - 1; j < columns; j++) {
        let diagonal2 = "";
        for (let k = 0; k < wordLength; k++) {
            diagonal2 += lines[i + k][j - k];
        }
        if (diagonal2 === xmas || diagonal2 === samx) {
            count++;
        }
    }
}

console.log(count);