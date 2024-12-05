/*
* INPUT FILE: 
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13 

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47

* AUFGABENSTELLUNG:
* Der erste Teil vor der Pipe des ersten Teils muss VOR dem zweiten Teil der Pipe in der 
* Sortierung (zweiter Teil) stehen, wenn beide Teile der Pipe in der Sortierung vorkommen.
* Die Sortierung der unsortierten Reihen soll überprüft und behoben werden.
* Die mittleren Zahlen der korrekt sortierten Reihen sollen addiert werden.
* 
* BEISPIEL:
* Die ersten 3 Reihen sind korrekt sortiert.

75,97,47,61,53 becomes 97,75,47,61,53.
61,13,29 becomes 61,29,13.
97,13,75,29,47 becomes 97,75,47,29,13.

*/

const file = Bun.file("input.txt");
const fileContent = await file.text();
const lines = fileContent.split("\n");

const pipeRules = lines
    .filter(line => line.includes("|"))
    .map(line => {
        const [before, after] = line.split("|");
        return { before: parseInt(before), after: parseInt(after) };
    });

function isValidSequence(sequence: number[]): boolean {
    for (const rule of pipeRules) {
        const beforeIndex = sequence.indexOf(rule.before);
        const afterIndex = sequence.indexOf(rule.after);
        if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex > afterIndex) {
            return false;
        }
    }
    return true;
}

function isValidOrder(a: number, b: number): boolean {
    const rule = pipeRules.find(r => r.before === a && r.after === b);
    return !rule;
}

function customSort(arr: number[]): number[] {
    return [...arr].sort((a, b) => {
        if (!isValidOrder(b, a)) return 1;
        if (!isValidOrder(a, b)) return -1;
        return b - a;
    });
}

const sequences = lines
    .filter(line => !line.includes("|") && line.length > 0)
    .map(line => line.split(",").map(Number));

const sortedSequences = sequences.map(customSort);

const validSequences = sequences.filter(isValidSequence);
const preMiddleNumbers = validSequences
    .map(seq => {
        if (seq.length >= 3) {
            const middleIndex = Math.floor(seq.length / 2);
            return seq[middleIndex];
        }
        return null;
    })
    .filter((num): num is number => num !== null);


const preResult = preMiddleNumbers.reduce((acc, curr) => acc + curr, 0);
const middleNumbers = sortedSequences
    .map(seq => {
        if (seq.length >= 3) {
            const middleIndex = Math.floor(seq.length / 2);
            return seq[middleIndex];
        }
        return null;
    })
    .filter((num): num is number => num !== null);

const result = middleNumbers.reduce((acc, curr) => acc + curr, 0);

console.log(result-preResult)
