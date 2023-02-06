const _readline = require("readline");
// let rl = _readline.createInterface(process.stdin, process.stdout);
const fs = require("fs");
const rl = _readline.createInterface({
    input: fs.createReadStream("../input.txt"),
});

const parseInput = (input) => {
    let line = 0;

    const numOfTestCases = Number(input[line++]);

    const testData = [];
    for (let testNumber = 1; testNumber <= numOfTestCases; testNumber++) {
        const [N, Q] = input[line++].split(' ').map(data => Number(data))

        const characters = input[line++].split('')

        const questions = []
        for (let i = 0; i < Q; i++) {
            questions.push(input[line++].split(' '))
        }

        testData.push({ testNumber, N, Q, characters, questions })
    }

    return testData;
}

function runTestCase(dataSet) {
    const { testNumber, N, Q, characters, questions } = dataSet;
    const result = solve(N, Q, characters, questions)
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

const solve = (N, Q, characters = [], questions) => {
    let seen = 0

    const charMap = getCharCount(characters)

    for (let question of questions) {
        seen += checkPalindrome(question, characters, charMap)
    }

    return seen
}

const getCharCount = (characters) => {
    const charMap = {}
    for (let char of characters) {
        if (!charMap[char]) charMap[char] = [0];
    }

    for (let idx in characters) {
        const char = characters[idx]
        for (let key in charMap) {
            if (key === char) {
                charMap[key].push(charMap[key][Number(idx)] + 1)
            } else {
                charMap[key].push(charMap[key][Number(idx)])
            }
        }
    }
    
    return charMap
}

const checkPalindrome = (question, characters, charMap) => {
    const [from, to] = question
    const seen = {}
    let isPalindrome = false
    let singleChar = 0

    for (let i = from; i <= to; i++) {
        const char = characters[i - 1]
        if (seen[char]) continue
        seen[char] = true
        const charArrayCounter = charMap[char]
        const diff = charArrayCounter[question[1]] - charArrayCounter[question[0] - 1]
        if (diff % 2 === 1) {
            singleChar++
        }
        isPalindrome = true
    }

    return isPalindrome && singleChar < 2 ? 1 : 0;
}