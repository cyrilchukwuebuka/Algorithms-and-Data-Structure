const _readline = require("readline");
// let rl = _readline.createInterface(process.stdin, process.stdout);
const fs = require("fs");
const rl = _readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

function parseInput(input) {
    let line = 0;

    const numOfTestCases = Number(input[line++]);

    const testData = [];
    for (let testNumber = 1; testNumber <= numOfTestCases; testNumber++) {
        const data = input[line++].split(" ").map((value) => Number(value));
        testData.push({ testNumber, data });
    }

    return testData;
}

function canGetAlong(A, B, N, K) {
    const modulo = 1e9 + 7;
    console.log(1 % modulo)
    let counter = 0;
    let firstValue = 1;
    while (firstValue <= N) {
        for (let secondValue = 1; secondValue <= N; secondValue++) {
            if (firstValue === secondValue || firstValue < 0 || secondValue < 0) continue;
            let firstValueResult = (firstValue ** A);
            let secondValueResult = (secondValue ** B);
            if ((firstValueResult + secondValueResult) % K === 0) counter++;
        }
        firstValue++;
    }
    return counter;
}

function runTestCase(dataSet) {
    const { testNumber, data } = dataSet;
    const [A, B, N, K] = data;
    let numWellAlongDays = canGetAlong(A, B, N, K);
    console.log(`Case #${testNumber}: ${numWellAlongDays}`);
}

function runAllTests(lines) {
    const testCases = parseInput(lines);
    testCases.forEach(runTestCase);
}

const lines = [];
rl.on("line", (line) => lines.push(line.trim())).on("close", () =>
    runAllTests(lines)
);
