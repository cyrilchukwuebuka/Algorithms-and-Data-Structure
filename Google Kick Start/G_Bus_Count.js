const _readline = require("readline");
let rl = _readline.createInterface(process.stdin, process.stdout);
// const fs = require("fs");
// const rl = _readline.createInterface({
//   input: fs.createReadStream("input.txt"),
// });

function parseInput(input) {
    let line = 0;

    const numOfTestCases = Number(input[line++]);

    const testData = [];
    for (let testNumber = 1; testNumber <= numOfTestCases; testNumber++) {
        const numOfGBus = Number(input[line++]);

        const ranges = input[line++].split(" ");
        const setOfCityRange = {};
        let counter = 1;
        for (let i = 0; i < numOfGBus * 2; i += 2) {
            setOfCityRange[`A${counter}B${counter++}`] = [ranges[i], ranges[i + 1]];
        }

        const citiesOfInterestCount = Number(input[line++]);
        const citiesOfInterest = [];
        for (let j = 0; j < citiesOfInterestCount; j++) {
            citiesOfInterest.push(Number(input[line++]));
        }

        line++;
        testData.push({ testNumber, numOfGBus, setOfCityRange, citiesOfInterest });
    }

    return testData;
}

function runTestCase(data) {
    const { testNumber, numOfGBus, setOfCityRange, citiesOfInterest } = data;
    const busCounts = new Array(citiesOfInterest.length).fill(0);
    citiesOfInterest.forEach((city, idx) => {
        for (const cityRange in setOfCityRange) {
            const range = setOfCityRange[cityRange];
            if (city >= Number(range[0]) && city <= Number(range[1])) {
                busCounts[idx]++;
            }
        }
    });
    console.log(`Case #${testNumber}: ${busCounts.join(" ")}`);
}

function runAllTests(lines) {
    const testCases = parseInput(lines);
    testCases.forEach(runTestCase);
}

const lines = [];
rl.on("line", (line) => lines.push(line.trim())).on("close", () =>
    runAllTests(lines)
);
