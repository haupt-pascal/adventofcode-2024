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

Each line represents a single equation. The test value appears before the colon on each line; it is your job to determine whether the remaining numbers can be combined with operators to produce the test value.

Operators are always evaluated left-to-right, not according to precedence rules. Furthermore, numbers in the equations cannot be rearranged. Glancing into the jungle, you can see elephants holding two different types of operators: add (+) and multiply (*).

Only three of the above equations can be made true by inserting operators:

190: 10 19 has only one position that accepts an operator: between 10 and 19. Choosing + would give 29, but choosing * would give the test value (10 * 19 = 190).
3267: 81 40 27 has two positions for operators. Of the four possible configurations of the operators, two cause the right side to match the test value: 81 + 40 * 27 and 81 * 40 + 27 both equal 3267 (when evaluated left-to-right)!
292: 11 6 16 20 can be solved in exactly one way: 11 + 6 * 16 + 20.

The engineers just need the total calibration result, which is the sum of the test values from just the equations that could possibly be true. In the above example, the sum of the test values for the three equations listed above is 3749.

Determine the sum of the test values for the equations that could possibly be true.
*/

const file = Bun.file("input.txt");
const fileContent = await file.text();
const lines = fileContent.split("\n");

function evaluateExpression(numbers: number[], operators: string[]): number {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else {
            result *= numbers[i + 1];
        }
    }
    return result;
}

function generateOperatorCombinations(length: number): string[][] {
    const operators = ['+', '*'];
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

function canMakeEquation(testValue: number, numbers: number[]): boolean {
    const operatorCount = numbers.length - 1;
    const operatorCombinations = generateOperatorCombinations(operatorCount);
    
    return operatorCombinations.some(operators => 
        evaluateExpression(numbers, operators) === testValue
    );
}

let sum = 0;

for (const line of lines) {
    if (!line.trim()) continue;
    
    const [testValueStr, numbersStr] = line.split(':');
    const testValue = Number.parseInt(testValueStr);
    const numbers = numbersStr.trim().split(' ').map(Number);
    
    if (canMakeEquation(testValue, numbers)) {
        sum += testValue;
    }
}

console.log(sum);