// const _readline = require("readline");
// let rl = _readline.createInterface(process.stdin, process.stdout);
// // const fs = require("fs");
// // const rl = _readline.createInterface({
// //     input: fs.createReadStream("../input.txt"),
// // });


// function parseInput(input) {
//     let line = 0
    
//     const numOfTestCases = Number(input[line++])

//     const testData = []
//     for (let testNumber = 1; testNumber <= numOfTestCases; testNumber++) {
//         const [L, R] = input[line++].split(' ').map(data => Number(data))
//         testData.push({testNumber, L, R})
//     }

//     return testData
// }

// function runTestCase(dataSet) {
//     const { testNumber, L, R } = dataSet;

//     if (L === 0 || R === 0) {
//         console.log(`Case #${testNumber}: ${0}`);
//         return
//     }

//     let minCount = Math.min(L, R);

//     let maxPossibleValue = 0;
//     for (let i = 1; i <= minCount; i++) {
//         maxPossibleValue += Math.floor(minCount / i)
//     }

//     console.log(`Case #${testNumber}: ${maxPossibleValue}`);
// }

// function runAllTests(lines) {
//     const testCases = parseInput(lines);
//     testCases.forEach(runTestCase);
// }

// const lines = [];
// rl.on("line", (line) => lines.push(line.trim())).on("close", () =>
//     runAllTests(lines)
// );




const _readline = require("readline");
let rl = _readline.createInterface(process.stdin, process.stdout);
// const fs = require("fs");
// const rl = _readline.createInterface({
//     input: fs.createReadStream("../input.txt"),
// });


function parseInput(input) {
    let line = 0

    const numOfTestCases = Number(input[line++])

    const testData = []
    for (let testNumber = 1; testNumber <= numOfTestCases; testNumber++) {
        const [L, R] = input[line++].split(' ').map(data => Number(data))
        testData.push({ testNumber, L, R })
    }

    return testData
}

function runTestCase(dataSet) {
    const { testNumber, L, R } = dataSet;
    const result = 0;

    if (L === 0 || R === 0) {
        console.log(`Case #${testNumber}: ${result}`);
        return
    }

    let n = Math.min(L, R);

    let maxPossibleValue = n * (n + 1) / 2;

    console.log(`Case #${testNumber}: ${maxPossibleValue}`);
}

function runAllTests(lines) {
    const testCases = parseInput(lines);
    testCases.forEach(runTestCase);
}

const lines = [];
rl.on("line", (line) => lines.push(line.trim())).on("close", () =>
    runAllTests(lines)
);