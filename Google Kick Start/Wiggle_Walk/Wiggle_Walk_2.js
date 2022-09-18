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

const COORDINATES = {
    'N': [-1, 0],
    'S': [1, 0],
    'E': [0, 1],
    'W': [0, -1]
}

function addCoordinate(instruction, cordinates, curCord) {
    for (cord in COORDINATES) {
        if (cord === instruction) {
            cordinates[cord] = [curCord[0] + COORDINATES[cord][0] * 2, curCord[1] + COORDINATES[cord][1] * 2]
        } else {
            cordinates[cord] = [curCord[0] + COORDINATES[cord][0] + 1, curCord[1] + COORDINATES[cord][1] + 1]
        }
    }
}

function move(instruction, curCord, visitedCells) {
    // visitedCells[curCord.join('')] = {};
    console.log(curCord)
    // addCoordinate(instruction, visitedCells[curCord.join('')], curCord)
    // const nextCord = [curCord[0] + COORDINATES[instruction][0], curCord[1] + COORDINATES[instruction][1]];
    // while(nextCord.join('') in visitedCells) {
    //     console.log(nextCord)
    // }
}

function runTestCase(data) {
    const { testNumber, robotManual, instructions } = data;
    const [numOfInstructions, numOfRows, numOfCols, startRow, startCol] =
        robotManual;
    const visitedCells = {};
    let curCord = [startRow, startCol];

    for (let instruction of instructions) {
        // console.log(instruction)
        move(instruction, curCord, visitedCells)
        // curCord = move(instruction, curCord, visitedCells)
    }

    // console.log(`Case #${testNumber}: ${currentRow} ${currentCol}`);
}

function runAllTests(lines) {
    const testCases = parseInput(lines);
    testCases.forEach(runTestCase);
}

const lines = [];
rl.on("line", (line) => lines.push(line.trim())).on("close", () =>
    runAllTests(lines)
);
