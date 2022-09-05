//////////////////////////////////////////
//////////// FLOOD FILL APPROACH /////////
//////////////////////////////////////////

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
        const boardSize = Number(input[line++]);
        const board = [];
        for (let i = 0; i < boardSize; i++) {
            const rowData = input[line++].split('').map(value => value);
            board[i] = rowData;
        }
        testData.push({ testNumber, boardSize, board });
    }

    return testData;
}


function runTestCase(dataSet) {
    const { testNumber, boardSize, board } = dataSet;
    const output = solution(board, boardSize);
    console.log(`Case #${testNumber}: ${output}`);
}

function runAllTests(lines) {
    const testCases = parseInput(lines);
    testCases.forEach(runTestCase);
}

const lines = [];
rl.on("line", (line) => lines.push(line.trim())).on("close", () =>
    runAllTests(lines)
);

function countStones(originalBoard) {
    let blueStoneCount = 0, redStoneCount = 0;
    for (let i = 0; i < originalBoard.length; i++) {
        for (let j = 0; j < originalBoard[i].length; j++) {
            if (originalBoard[i][j] === 'B') blueStoneCount++;
            if (originalBoard[i][j] === 'R') redStoneCount++;
        }
    }
    return [blueStoneCount, redStoneCount];
}

function flood(board, row, col, boardSize, colour) {
    const directions = [[0, 1], [-1, 1], [-1, 0], [0, -1], [1, -1], [1, 0]];
    board[row][col] = colour.toLowerCase();
    for (const direction of directions) {
        const newRow = row + direction[0];
        const newCol = col + direction[1];
        if (0 <= newRow && newRow < boardSize && 0 <= newCol && newCol < boardSize) {
            if (board[newRow][newCol] === colour) {
                flood(board, newRow, newCol, boardSize, colour)
            }
        }
    }
}

function checkWinner(board, boardSize) {
    for (let i = 0; i < boardSize; i++) {
        if (board[i][0] === 'B') {
            flood(board, i, 0, boardSize, "B");
        }
        if (board[0][i] === 'R') {
            flood(board, 0, i, boardSize, "R");
        }
    }

    for (let i = 0; i < boardSize; i++) {
        if (board[i][boardSize - 1] === 'b') return "B";
        if (board[boardSize - 1][i] === 'r') return "R";
    }

    return '.'
}

function deepCopy(board) {
    const newBoard = [];
    for (let i = 0; i < board.length; i++) {
        const rowData = []
        for (let j = 0; j < board.length; j++) {
            rowData.push(board[i][j]);
        }
        newBoard.push(rowData);
    }
    return newBoard
}

function solution(originalBoard, boardSize) {
    const [numBlue, numRed] = countStones(originalBoard);

    if (Math.abs(numBlue - numRed) > 1) return "Impossible";

    let board = deepCopy(originalBoard);
    const winner = checkWinner(board, boardSize);
    if (winner === '.') {
        return "Nobody wins"
    }
    
    if ((winner === 'B' && numBlue < numRed) || (winner === 'R' && numRed < numBlue)) {
        return "Impossible";
    }

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (originalBoard[row][col] === winner) {
                board = deepCopy(originalBoard);
                board[row][col] = '.';
                if (checkWinner(board, boardSize) === '.') {
                    if (winner === "B") {
                        return "Blue wins";
                    } else if (winner === "R") {
                        return "Red wins";
                    }
                }
            }
        }
    }
    return "Impossible";
}