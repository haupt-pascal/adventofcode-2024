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
 * Am Ende wird die Zahl der Reihen benötigt welche ausschliesslich korrekt sind.
 */

const file = Bun.file("input.txt");
const fileContent = await file.text();
const lines = fileContent.split("\n");

const results = lines.map(line => {
    const levels = line.split(" ").map(Number);
    const sequences = [];

    for (let i = 0; i < levels.length - 1; i++) {
        const diff = levels[i + 1] - levels[i];
        if (diff >= 1 && diff <= 3) {
            sequences.push("increasing");
        } else if (diff <= -1 && diff >= -3) {
            sequences.push("decreasing");
        } else {
            sequences.push("invalid");
        }
    }

    return sequences;
});

const validRows = results.filter(row => 
    row.every(sequence => sequence === "increasing") || 
    row.every(sequence => sequence === "decreasing")
);
console.log(validRows.length);
