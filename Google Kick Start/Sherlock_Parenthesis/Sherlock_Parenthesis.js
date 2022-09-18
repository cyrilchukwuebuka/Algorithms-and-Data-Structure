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
        const L_R = input[line++].split(' ').map(data => Number(data));
        testData.push({ testNumber, L_R });
    }

    return testData;
}


function runTestCase(dataSet) {
    const { testNumber, L_R } = dataSet;
    const N = Math.min(L_R[0], L_R[1]);
    const result = N * (N + 1) / 2;
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
