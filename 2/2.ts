/*
* Liste mit Zahlen, separiert bei Leerzeichen
* 1 2 3 4 5 6 7 8 9 10
* 1 2 3 4 5 6 7 8 9 10
*
* Ein Report zählt nur als Korrekt wenn alle Level increasing oder decreasing sind
* Zwei benachbarte Ebenen unterscheiden sich um mindestens eins und höchstens drei.
*
* Sicher ist: 7 6 4 2 1 -- weil alle level decreasing bei 1 oder 2
* Unsicher ist: 1 2 7 8 9 -- weil 2 und 7 nicht um mindestens 1 und höchstens 3 unterscheiden
*
* Am Ende wird die Zahl der Reihen benötigt welche max 1 unsicheres Level erhalten korrekt sind.
*/

const file = Bun.file("input.txt");
const fileContent = await file.text();
const lines = fileContent.split("\n");

function isValidSequence(levels:any) {
    if (levels.length < 2) return false;
    
    const diffs: string[] = [];
    for (let i = 0; i < levels.length - 1; i++) {
        const diff = levels[i + 1] - levels[i];
        if (diff >= 1 && diff <= 3) {
            diffs.push("increasing");
        } else if (diff <= -1 && diff >= -3) {
            diffs.push("decreasing");
        } else {
            return false;
        }
    }
    
    return diffs.every(d => d === diffs[0]);
}

function checkReport(levels:any) {
    if (isValidSequence(levels)) return true;
    
    for (let i = 0; i < levels.length; i++) {
        const newLevels = [...levels.slice(0, i), ...levels.slice(i + 1)];
        if (isValidSequence(newLevels)) {
            return true;
        }
    }
    
    return false;
}

const validCount = lines
    .filter(line => line.trim())
    .map(line => line.trim().split(" ").map(Number).filter(n => !isNaN(n)))
    .filter(levels => checkReport(levels))
    .length;

console.log(validCount);