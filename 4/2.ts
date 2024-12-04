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

function checkMAS(str: string): boolean {
    return str === "MAS" || str === "SAM";
}

function countXMAS(lines: string[]): number {
    let count = 0;
    const rows = lines.length;
    const cols = lines[0].length;

    // console.log(rows, cols);
    // for each center point
    for (let row = 1; row < rows - 1; row++) {
        for (let col = 1; col < cols - 1; col++) {
            if (lines[row][col] !== 'A') continue;

            const topLeft = lines[row - 1][col - 1];
            const bottomRight = lines[row + 1][col + 1];
            const diag1 = topLeft + 'A' + bottomRight;

            const topRight = lines[row - 1][col + 1];
            const bottomLeft = lines[row + 1][col - 1];
            const diag2 = topRight + 'A' + bottomLeft;

            if ((checkMAS(diag1) || checkMAS(diag1.split('').reverse().join(''))) &&
                (checkMAS(diag2) || checkMAS(diag2.split('').reverse().join('')))) {
                count++;
            }
        }
    }

    return count;
}

const result = countXMAS(lines);
console.log(result);