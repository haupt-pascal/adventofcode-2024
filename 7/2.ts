/*
* 

190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20

The concatenation operator (||) combines the digits from its left and right inputs into a single number. For example, 12 || 345 would become 12345. All operators are still evaluated left-to-right.

Now, apart from the three equations that could be made true using only addition and multiplication, the above example has three more equations that can be made true by inserting operators:

156: 15 6 can be made true through a single concatenation: 15 || 6 = 156.
7290: 6 8 6 15 can be made true using 6 * 8 || 6 * 15.
192: 17 8 14 can be made true using 17 || 8 + 14.
Adding up all six test values (the three that could be made before using only + and * plus the new three that can now be made by also using ||) produces the new total calibration result of 11387.

Using your new knowledge of elephant hiding spots, determine which equations could possibly be true. What is their total calibration result?
*/

const file = Bun.file("input.txt");
const fileContent = await file.text();
const lines = fileContent.split("\n");

function evaluateExpression(numbers: number[], operators: string[]): number {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        } else {
            result = Number.parseInt(result.toString() + numbers[i + 1].toString());
        }
    }
    return result;
}

function generateOperatorCombinations(length: number): string[][] {
    const operators = ['+', '*', '||'];
    const result: string[][] = [];
    
    function generate(current: string[]): void {
        if (current.length === length) {
            result.push([...current]);
            return;
        }
        for (const op of operators) {
            current.push(op);
            generate(current);
            current.pop();
        }
    }
    
    generate([]);
    return result;
}

let sum = 0;
for (const line of lines) {
    const [testValue, ...numbers] = line.split(/[: ]/).filter(Boolean).map(Number);
    const operators = generateOperatorCombinations(numbers.length - 1);
    for (const operator of operators) {
        if (evaluateExpression(numbers, operator) === testValue) {
            sum += testValue;
            break;
        }
    }
}

console.log(sum);