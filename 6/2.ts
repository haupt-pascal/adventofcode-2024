/*
* Aufgabenstellung: 
You start by making a map (your puzzle input) of the situation. For example:

Option one, put a printing press next to the guard's starting position:

....#.....
....+---+#
....|...|.
..#.|...|.
....|..#|.
....|...|.
.#.O^---+.
........#.
#.........
......#...
Option two, put a stack of failed suit prototypes in the bottom right quadrant of the mapped area:


....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
......O.#.
#.........
......#...
Option three, put a crate of chimney-squeeze prototype fabric next to the standing desk in the bottom right quadrant:

....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
.+----+O#.
#+----+...
......#...
Option four, put an alchemical retroencabulator near the bottom left corner:

....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
..|...|.#.
#O+---+...
......#...
Option five, put the alchemical retroencabulator a bit to the right instead:

....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
....|.|.#.
#..O+-+...
......#...
Option six, put a tank of sovereign glue right next to the tank of universal solvent:

....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
.+----++#.
#+----++..
......#O..
It doesn't really matter what you choose to use as an obstacle so long as you and The Historians can put it into position without the guard noticing. The important thing is having enough options that you can find one that minimizes time paradoxes, and in this example, there are 6 different positions you could choose.

You need to get the guard stuck in a loop by adding a single new obstruction. How many different positions could you choose for this obstruction?
*/

const file = Bun.file("input.txt");
const fileContent = await file.text();
const lines = fileContent.split("\n");

const map = lines.filter(line => line.trim().length > 0);

const width = map[0].length;
const height = map.length;

const startX = map.findIndex((row) => row.includes("^"));
const startY = map[startX].indexOf("^");

function turnRight(dx: number, dy: number): [number, number] {
    return [dy, -dx];
}

function simulatePath(obstacleX: number, obstacleY: number): boolean {
    const testMap = map.map(row => row.split(''));
    testMap[obstacleX][obstacleY] = '#';
    
    let x = startX;
    let y = startY;
    let dx = -1;
    let dy = 0;
    
    const visited = new Set<string>();
    
    while (true) {
        const posKey = `${x},${y},${dx},${dy}`;
        if (visited.has(posKey)) {
            return true;
        }
        visited.add(posKey);
        
        const nextX = x + dx;
        const nextY = y + dy;
        
        if (nextX < 0 || nextX >= height || nextY < 0 || nextY >= width) {
            return false;
        }
        
        if (testMap[nextX][nextY] === '#') {
            [dx, dy] = turnRight(dx, dy);
            continue;
        }
        
        x = nextX;
        y = nextY;
    }
}

let loopPositions = 0;
for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
        if (map[x][y] !== '.' || (x === startX && y === startY)) {
            continue;
        }
        
        if (simulatePath(x, y)) {
            loopPositions++;
        }
    }
}

console.log(`Number of positions that create a loop: ${loopPositions}`);