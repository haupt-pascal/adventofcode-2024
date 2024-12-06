/*
* Aufgabenstellung: 
You start by making a map (your puzzle input) of the situation. For example:

....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
The map shows the current position of the guard with ^ (to indicate the guard is currently facing up from the perspective of the map). Any obstructions - crates, desks, alchemical reactors, etc. - are shown as #.

Lab guards in 1518 follow a very strict patrol protocol which involves repeatedly following these steps:

If there is something directly in front of you, turn right 90 degrees.
Otherwise, take a step forward.
Following the above protocol, the guard moves up several times until she reaches an obstacle (in this case, a pile of failed suit prototypes):

....#.....
....^....#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...
Because there is now an obstacle in front of the guard, she turns right before continuing straight in her new facing direction:

....#.....
........>#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...
Reaching another obstacle (a spool of several very long polymers), she turns right again and continues downward:

....#.....
.........#
..........
..#.......
.......#..
..........
.#......v.
........#.
#.........
......#...
This process continues for a while, but the guard eventually leaves the mapped area (after walking past a tank of universal solvent):

....#.....
.........#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#v..
By predicting the guard's route, you can determine which specific positions in the lab will be in the patrol path. Including the guard's starting position, the positions visited by the guard before leaving the area are marked with an X:

....#.....
....XXXXX#
....X...X.
..#.X...X.
..XXXXX#X.
..X.X.X.X.
.#XXXXXXX.
.XXXXXXX#.
#XXXXXXX..
......#X..
In this example, the guard will visit 41 distinct positions on your map.

Predict the path of the guard. How many distinct positions will the guard visit before leaving the mapped area?
*/

const file = Bun.file("input.txt");
const fileContent = await file.text();
const lines = fileContent.split("\n");

const map = lines.filter(line => line.trim().length > 0);

const width = map[0].length;
const height = map.length;

// find the start
const startX = map.findIndex((row) => row.includes("^"));
const startY = map[startX].indexOf("^");
let x = startX;
let y = startY;
let dx = -1;
let dy = 0;

const visited = new Set<string>();
visited.add(`${x},${y}`);

function turnRight() {
    // Turn right: up → right → down → left → up
    [dx, dy] = [dy, -dx];
}

while (true) {
    // where is next position?
    const nextX = x + dx;
    const nextY = y + dy;
    
    // do we leave map? 
    if (nextX < 0 || nextX >= height || nextY < 0 || nextY >= width) {
        break;
    }
    
    // is wall in front?
    if (map[nextX][nextY] === '#') {
        turnRight();
        continue;
    }
    
    // go forward
    x = nextX;
    y = nextY;
    visited.add(`${x},${y}`);
    
    // debugging
    // console.log(`At (${x},${y}) facing (${dx},${dy})`);
}

console.log(`Distinct positions visited: ${visited.size}`);

// the path should be visualized
const visualMap = map.map(row => row.split(''));
for (const pos of visited) {
    const [vx, vy] = pos.split(',').map(Number);
    if (visualMap[vx][vy] !== '#') {
        visualMap[vx][vy] = 'X';
    }
}

console.log('\nVisual map:');
console.log(visualMap.map(row => row.join('')).join('\n'));