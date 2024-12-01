/**
* Wie oft kommt die Nummer der linken Liste in der rechten Liste vor
*   Mulitpliziere jede Nummer der linken Liste x wie oft sie in der rechten Liste vorkommt
*   Diese Zahl wird auf den similarityScore addiert  
*/

const file = Bun.file("input.txt")
const fileContent = await file.text()
const lines = fileContent.split("\n")
const leftNumber = lines.map((l: string) => Number.parseInt(l.split(" ")[0]))
const rightNumber = lines.map((r: string) => Number.parseInt(r.split("  ")[1]))
const leftNumbersSorted = leftNumber.sort((n1, n2) => n1 - n2);
const rightNumbersSorted = rightNumber.sort((n1,n2) => n1 - n2);

const sumArray = []

function getOccurences(array: number[], value: number) {
    let count = 0;
    // biome-ignore lint/complexity/noForEach: <explanation>
    array.forEach((v) => (v === value && count++));
    return count;
}

for (let i=0; i<leftNumbersSorted.length; i++) {
    const leftNumber = leftNumbersSorted[i]
    const similarityScore = leftNumber * getOccurences(rightNumbersSorted, leftNumber)
    sumArray.push(similarityScore)
}

const sum = sumArray.reduce((partialSum, a) => partialSum + a, 0)
console.log(sum)