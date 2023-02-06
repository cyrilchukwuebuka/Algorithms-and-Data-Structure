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
        const characters = input[line++].split('')
        testData.push({ testNumber, characters })
    }

    return testData;
}

function runTestCase(dataSet) {
    const { testNumber, characters } = dataSet;
    const result = solve(characters)
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

const solve = (characters) => {
    const vowelIndices = getVowelIndices(characters)

    if (vowelIndices.length < 5) return 'Nothing.'

    for (let i = 0; i < vowelIndices.length; i++) {
        const startWord = characters.slice(vowelIndices[i], vowelIndices[i + 1] + 1)
        const endWord = characters.slice(vowelIndices[i + 3])
        if (endWord.join('').includes(startWord.join(''))) return 'Spell!'
    }

    return 'Nothing.'
}

const getVowelIndices = (characters) => {
    const VOWELS = ['a', 'e', 'i', 'o', 'u']
    const vowelIndices = []

    for (let i = 0; i < characters.length; i++) {
        const char = characters[i]
        if (VOWELS.includes(char)) {
            vowelIndices.push(i)
        }
    }

    return vowelIndices
}