/*
* Das Input File enthält mul(X,Y) - X wird mit Y multipliziert
* Das File ist corrupted, es enthält viele nicht notwendige Felder
* mul() ist valide => mul[] nicht
* 
* 1. Fetchen aller mul()
* 2. Formel aufstellen für die mul (2*4 + 5*5 + 11*8)
*/

const file = Bun.file("input.txt");
const fileContent = await file.text();
const lines = fileContent.split("\n");

// console.log(lines, validStart)
// console.log(lines[0].includes(validStart))

const mulArray = lines.flatMap(line => line.match(/mul\(\d+,\d+\)/g) || []);
const cleanMul = mulArray[0] ? mulArray[0].replace("mul(", "").replace(")", "") : "";
// 884,758

console.log(mulArray)

const calculations = mulArray.map(mul => {
    const [x, y] = mul.replace("mul(", "").replace(")", "").split(",").map(Number);
    console.log(x, y)
    return x * y;
});

const result = calculations.reduce((acc, curr) => acc + curr, 0);

console.log(result);