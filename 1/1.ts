const file = Bun.file("input.txt")
const fileContent = await file.text()
const lines = fileContent.split("\n")
const leftNumber = lines.map((l: string) => Number.parseInt(l.split(" ")[0]))
const rightNumber = lines.map((r: string) => Number.parseInt(r.split("  ")[1]))
const leftNumbersSorted = leftNumber.sort((n1, n2) => n1 - n2);
const rightNumbersSorted = rightNumber.sort((n1,n2) => n1 - n2);
const sortedPairs = leftNumbersSorted.map((l:number, i:number) => [l, rightNumbersSorted[i]])
console.log(sortedPairs)
const sumArray = []
for (let i=0; i<sortedPairs.length; i++) {
    const leftNumber = sortedPairs[i][0]
    const rightNumber = sortedPairs[i][1]
    if (leftNumber > rightNumber) {
        const sum = leftNumber - rightNumber
        sumArray.push(sum)
    } else {
        const sum = rightNumber - leftNumber
        sumArray.push(sum)
    }
}

const sum = sumArray.reduce((partialSum, a) => partialSum + a, 0)
console.log(sum)