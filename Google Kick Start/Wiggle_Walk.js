const _readline = require("readline");
let rl = _readline.createInterface(process.stdin, process.stdout);
// const fs = require("fs");
// const rl = _readline.createInterface({
//     input: fs.createReadStream("input.txt"),
// });

function parseInput(input) {
    let line = 0;

    const numOfTestCases = Number(input[line++]);

    const testData = [];
    for (let testNumber = 1; testNumber <= numOfTestCases; testNumber++) {
        const robotManual = input[line++].split(" ").map((data) => Number(data));
        const instructions = input[line++];
        testData.push({ testNumber, robotManual, instructions });
    }

    return testData;
}

const DELTAS = {
    'N': [-1, 0],
    'S': [1, 0],
    'E': [0, 1],
    'W': [0, -1]
}

const REVERSE = {
    'N': 'S',
    'S': 'N',
    'E': 'W',
    'W': 'E'
}

function jump(jumps, instruction, row, col) {
    if (jumps && instruction in jumps) return jumps[instruction];
    const [_row, _col] = DELTAS[instruction];
    return [row + _row, col + _col];
}

function addJump(jumps, instruction, row, col) {
    const [_row, _col] = DELTAS[instruction];
    jumps[instruction] = [row + _row, col + _col];
}

function runTestCase(data) {
    const { testNumber, robotManual, instructions } = data;
    const [numOfInstructions, numOfRows, numOfCols, startRow, startCol] =
        robotManual;
    const table = {};
    const startPosition = `${startRow}${startCol}`;
    table[startPosition] = {};
    let currentRow = startRow;
    let currentCol = startCol;

    for (let instruction of instructions) {
        const prevRow = currentRow, prevCol = currentCol;
        let jumpsFromCurrentPosition = table[`${currentRow}${currentCol}`];
        const [_currentRow, _currentCol] = jump(jumpsFromCurrentPosition, instruction, currentRow, currentCol);
        currentRow = _currentRow, currentCol = _currentCol;

        while (table && `${currentRow}${currentCol}` in table) {
            jumpsFromCurrentPosition = table[`${currentRow}${currentCol}`];
            const [_currentRow, _currentCol] = jump(jumpsFromCurrentPosition, instruction, currentRow, currentCol);
            currentRow = _currentRow, currentCol = _currentCol;
        }
        table[`${currentRow}${currentCol}`] = {};
        addJump(table[`${currentRow}${currentCol}`], REVERSE[instruction], prevRow, prevCol);
        addJump(table[`${prevRow}${prevCol}`], instruction, currentRow, currentCol);
    }

    console.log(`Case #${testNumber}: ${currentRow} ${currentCol}`);
}

function runAllTests(lines) {
    const testCases = parseInput(lines);
    testCases.forEach(runTestCase);
}

const lines = [];
rl.on("line", (line) => lines.push(line.trim())).on("close", () =>
    runAllTests(lines)
);
