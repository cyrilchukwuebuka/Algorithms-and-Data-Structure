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
        const [numBlock, numQuestion] = input[line++].split(' ').map(data => Number(data));
        const string = input[line++].split('')
        const questions = [];
        for (let i = 0; i < numQuestion; i++) {
            questions.push(input[line++].split(' ').map(data => Number(data)))
        }
        testData.push({ testNumber, numBlock, numQuestion, string, questions });
    }

    return testData;
}


function runTestCase(dataSet) {
    const { testNumber, numBlock, numQuestion, string, questions
    } = dataSet;
    let result = 0
    for (let question of questions) {
        result += solve(question, string)
    }
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

function solve(question, string) {
    const stringMap = {};
    for (let i = question[0] - 1; i < question[1]; i++) {
        const char = string[i];
        if (char in stringMap && stringMap[char] === 1) {
            stringMap[char]--;
        } else {
            stringMap[char] = 1;
        }
        if (char in stringMap && stringMap[char] === 0) delete stringMap[char];
    }
    
    return Object.keys(stringMap).length < 2 ? 1 : 0;
}
