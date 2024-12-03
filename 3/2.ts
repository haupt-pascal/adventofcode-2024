/*
* Das Input File enthält mul(X,Y) - X wird mit Y multipliziert
* Das File ist corrupted, es enthält viele nicht notwendige Felder
* mul() ist valide => mul[] nicht
* 
* 1. Fetchen aller do() und unmittelbar anschliessendes mul()
* 2. Formel aufstellen für die mul (2*4 + 5*5 + 11*8)
*/

const file = Bun.file("input.txt");
const fileContent = await file.text();
const lines = fileContent.split("\n");

let isEnabled = true;
const mulArray: string[] = [];

lines.forEach(line => {
    const instructions = line.match(/(do\(\)|don't\(\)|mul\(\d+,\d+\))/g) || [];
    instructions.forEach(instruction => {
        if (instruction === "do()") {
            isEnabled = true;
        } else if (instruction === "don't()") {
            isEnabled = false;
        } else if (instruction.startsWith("mul(") && isEnabled) {
            mulArray.push(instruction);
        }
    });
});

console.log(mulArray);

const calculations = mulArray.map(mul => {
    const [x, y] = mul.replace("mul(", "").replace(")", "").split(",").map(Number);
    console.log(x, y);
    return x * y;
});

const result = calculations.reduce((acc, curr) => acc + curr, 0);
console.log(result);