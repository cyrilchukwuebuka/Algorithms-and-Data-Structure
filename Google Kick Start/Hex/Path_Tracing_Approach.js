// //////////////////////////////////////////
// //////////// PATH TRACING APPROACH /////////
// //////////////////// N^ /////////////////
// //////////////////////////////////////////

// const _readline = require("readline");
// // let rl = _readline.createInterface(process.stdin, process.stdout);
// const fs = require("fs");
// const rl = _readline.createInterface({
//     input: fs.createReadStream("../input.txt"),
// });

// function parseInput(input) {
//     let line = 0;

//     const numOfTestCases = Number(input[line++]);

//     const testData = [];
//     for (let testNumber = 1; testNumber <= numOfTestCases; testNumber++) {
//         const boardSize = Number(input[line++]);
//         const board = [];
//         for (let i = 0; i < boardSize; i++) {
//             const rowData = input[line++].split('').map(value => value);
//             board[i] = rowData;
//         }
//         testData.push({ testNumber, boardSize, board });
//     }

//     return testData;
// }


// function runTestCase(dataSet) {
//     const { testNumber, boardSize, board } = dataSet;
//     const output = solution(board, boardSize);
//     console.log(`Case #${testNumber}: ${output}`);
// }

// function runAllTests(lines) {
//     const testCases = parseInput(lines);
//     testCases.forEach(runTestCase);
// }

// const DIRECTIONS = [[0, 1], [-1, 1], [-1, 0], [0, -1], [1, -1], [1, 0]];

// const lines = [];
// rl.on("line", (line) => lines.push(line.trim())).on("close", () =>
//     runAllTests(lines)
// );

// function getNextHex(left, right) {
//     let rightDir = [right[0] - left[0], right[1] - left[1]];
//     for(let idx = 0; idx < DIRECTIONS.length; idx++) {
//         const direction = DIRECTIONS[idx];
//         if (rightDir === direction) {
//             const nextDir = DIRECTIONS[(idx + 1) % 6];
//             return [left[0] + nextDir[0, left[1] + nextDir[1]]]
//         }
//     }

//     throw new Error('incorrect input')
// }

// function step(paddedBoard, colour, left, right) {
//     nextHex = getNextHex(left, right);
//     if (paddedBoard[nextHex[0]][nextHex[1]] === colour) {
//         return [nextHex, right];
//     } else {
//         return [left, nextHex];
//     }
// }

// function bluePathSouth(paddedBoard, m) {
//     let left = [m - 1, 0], right = [m - 1, 1];
//     const path = new Set();

//     while (left[1] < m - 1) {
//         path.add(left);
//         const [_left, _right] = step(paddedBoard, 'B', left, right);
//         left = _left, right = _right;
//         if (right[0] === 0) {
//             return null;
//         }
//         return path;
//     }
// }

// function countStones(originalBoard) {
//     let blueStoneCount = 0, redStoneCount = 0;
//     for (let i = 0; i < originalBoard.length; i++) {
//         for (let j = 0; j < originalBoard[i].length; j++) {
//             if (originalBoard[i][j] === 'B') blueStoneCount++;
//             if (originalBoard[i][j] === 'R') redStoneCount++;
//         }
//     }
//     return [blueStoneCount, redStoneCount];
// }

// function deepCopy(board) {
//     const newBoard = [];
//     for (let i = 0; i < board.length; i++) {
//         const rowData = []
//         for (let j = 0; j < board.length; j++) {
//             rowData.push(board[i][j]);
//         }
//         newBoard.push(rowData);
//     }
//     return newBoard
// }

// function solution(originalBoard, boardSize) {
//     const [numBlue, numRed] = countStones(originalBoard);

//     if (Math.abs(numBlue - numRed) > 1) return "Impossible";

//     const _paddedBoard = paddedBoard(originalBoard, boardSize);
//     let m = n + 2;

//     let southPath = bluePathSouth(_paddedBoard, m);

//     if (southPath) {
//         const northPath = bluePathSouth
//     }

//     let board = deepCopy(originalBoard);
//     const winner = checkWinner(board, boardSize);
//     if (winner === '.') {
//         return "Nobody wins"
//     }

//     if ((winner === 'B' && numBlue < numRed) || (winner === 'R' && numRed < numBlue)) {
//         return "Impossible";
//     }

//     for (let row = 0; row < boardSize; row++) {
//         for (let col = 0; col < boardSize; col++) {
//             if (originalBoard[row][col] === winner) {
//                 board = deepCopy(originalBoard);
//                 board[row][col] = '.';
//                 if (checkWinner(board, boardSize) === '.') {
//                     if (winner === "B") {
//                         return "Blue wins";
//                     } else if (winner === "R") {
//                         return "Red wins";
//                     }
//                 }
//             }
//         }
//     }
//     return "Impossible";
// }