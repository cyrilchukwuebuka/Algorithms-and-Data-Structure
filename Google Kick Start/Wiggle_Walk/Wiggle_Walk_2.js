const _readline = require("readline");
// let rl = _readline.createInterface(process.stdin, process.stdout);
const fs = require("fs");
const rl = _readline.createInterface({
    input: fs.createReadStream("../input.txt"),
});

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

function runTestCase(data) {
    const { testNumber, robotManual, instructions } = data;
    const [numOfInstructions, numOfRows, numOfCols, startRow, startCol] =
        robotManual;
    const visitedCells = {};
    visitedCells[`${startRow}${startCol}`] = {}
    let curRow = startRow
    let curCol = startCol

    for (let instruction of instructions) {
        let prevRow = curRow;
        let prevCol = curCol;
        let movesFromCurCell = visitedCells[`${curRow}${curCol}`]
        let curCord = move(movesFromCurCell, instruction, curRow, curCol)
        curRow = curCord[0]
        curCol = curCord[1]
        while (visitedCells[`${curRow}${curCol}`]) {
            movesFromCurCell = visitedCells[`${curRow}${curCol}`]
            curCord = move(movesFromCurCell, instruction, curRow, curCol)
            curRow = curCord[0]
            curCol = curCord[1]
        }

        visitedCells[`${curRow}${curCol}`] = {}
        addCoordinate(visitedCells[`${curRow}${curCol}`], REVERSE[instruction], prevRow, prevCol)
        addCoordinate(visitedCells[`${prevRow}${prevCol}`], instruction, curRow, curCol)
    }

    console.log(`Case #${testNumber}: ${curRow} ${curCol}`);
}

function runAllTests(lines) {
    const testCases = parseInput(lines);
    testCases.forEach(runTestCase);
}

const lines = [];
rl.on("line", (line) => lines.push(line.trim())).on("close", () =>
    runAllTests(lines)
);

const COORDINATES = {
    'N': [-1, 0],
    'S': [1, 0],
    'E': [0, 1],
    'W': [0, -1]
}

const REVERSE = {
    'N': 'S',
    'S': 'N',
    'E': 'W',
    'W': 'E',
}

function addCoordinate(cell, i, row, col) {
    cell[i] = [row + COORDINATES[i][0], col + COORDINATES[i][1]]
}

function move(movesFromCurCell, i, row, col) {
    if (movesFromCurCell[1]) {
        return movesFromCurCell[i]
    }

    return [row + COORDINATES[i][0], col + COORDINATES[i][1]]
}