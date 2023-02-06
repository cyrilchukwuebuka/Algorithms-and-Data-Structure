const _readline = require("readline");
let rl = _readline.createInterface(process.stdin, process.stdout);
// const fs = require("fs");
// const rl = _readline.createInterface({
//     input: fs.createReadStream("../input.txt"),
// });

function parseInput(input) {
    let line = 0;

    const numOfTestCases = Number(input[line++]);

    const testData = [];
    for (let testNumber = 1; testNumber <= numOfTestCases; testNumber++) {
        const boardSize = Number(input[line++]);

        const board = [];
        for (let i = 0; i < boardSize; i++) {
            const row = input[line++].split('')
            board.push(row)
        }

        testData.push({ testNumber, boardSize, board });
    }

    return testData;
}

function runTestCase(data) {
    const { testNumber, boardSize, board } = data;

    const result = solve(boardSize, board)

    console.log(`Case #${testNumber}: ${result}`);
}

function runAllTests(lines) {
    const testCases = parseInput(lines);
    testCases.forEach(runTestCase);
}

const lines = [];
rl.on("line", (line) => lines.push(line.trim())).on("close", () =>
    runAllTests(lines)
);

const DIRECTIONS = [[0, 1], [-1, 1], [-1, 0], [0, -1], [1, -1], [1, 0]]

const floodFill = (board, row, col, boardSize, colour = '') => {
    board[row][col] = colour.toLowerCase()

    for (let direction of DIRECTIONS) {
        const [newRow, newCol] = [row + direction[0], col + direction[1]]
        if ((0 <= newRow && newRow < boardSize) && (0 <= newCol && newCol < boardSize)) {
            if (board[newRow][newCol] === colour) {
                floodFill(board, newRow, newCol, boardSize, colour)
            }
        }
    }
}

const checkWinner = (board, boardSize) => {
    for (let i = 0; i < boardSize; i++) {
        if (board[0][i] === 'R') {
            floodFill(board, 0, i, boardSize, 'R')
        }
        if (board[i][0] === 'B') {
            floodFill(board, i, 0, boardSize, 'B')
        }
    }

    for (let n = 0; n < boardSize; n++) {
        if (board[boardSize - 1][n] === 'r') {
            return 'R'
        } else if (board[n][boardSize - 1] === 'b') {
            return 'B'
        }
    }

    return '.'
}

const deepCopy = (board, boardSize) => {
    const boardCopy = []

    for (let i = 0; i < boardSize; i++) {
        const row = board[i].slice()
        boardCopy.push(row)
    }

    return boardCopy
}

const countStones = (board, boardSize) => {
    let redStones = 0, blueStones = 0;

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === 'R') {
                redStones++
            } else if (board[i][j] === 'B') {
                blueStones++
            }
        }
    }

    return [redStones, blueStones]
}

const IMPOSSIBLE = 'Impossible'
const RED_WINS = 'Red wins'
const BLUE_WINS = 'Blue wins'
const NOBODY_WINS = 'Nobody wins'

const solve = (boardSize, originalBoard) => {
    const [redStones, blueStones] = countStones(originalBoard, boardSize)

    if (Math.abs(redStones - blueStones) > 1) {
        return IMPOSSIBLE
    }

    const boardCopy = deepCopy(originalBoard, boardSize)
    const winner = checkWinner(boardCopy, boardSize)

    if (winner === '.') {
        return NOBODY_WINS
    }

    if ((winner === 'B' && blueStones < redStones) || (winner === 'R' && redStones < blueStones)) {
        return IMPOSSIBLE
    }

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (originalBoard[i][j] === winner) {
                const boardCopy = deepCopy(originalBoard, boardSize)
                boardCopy[i][j] = '.'

                if (checkWinner(boardCopy, boardSize) === '.') {
                    if (winner === 'B') {
                        return BLUE_WINS
                    }
                    if (winner === 'R') {
                        return RED_WINS
                    }
                }
            }
        }
    }

    return IMPOSSIBLE
}