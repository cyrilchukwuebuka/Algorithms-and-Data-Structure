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
        const numFabrics = Number(input[line++]);
        const fabrics = [];
        for (let i = 0; i < numFabrics; i++) {
            const fabric = input[line++].split(' ');
            fabrics.push(fabric);
        }
        testData.push({ testNumber, numFabrics, fabrics });
    }

    return testData;
}


function runTestCase(dataSet) {
    const { testNumber, numFabrics, fabrics } = dataSet;
    const adaSort = lexographicalColorSort(fabrics);
    const charlesSort = durabilitySort(fabrics);
    console.log(charlesSort)
    const count = fabricsInSamePosition(adaSort, charlesSort);
    console.log(`Case #${testNumber}: ${count}`);
}

function runAllTests(lines) {
    const testCases = parseInput(lines);
    testCases.forEach(runTestCase);
}

const lines = [];
rl.on("line", (line) => lines.push(line.trim())).on("close", () =>
    runAllTests(lines)
);

function lexographicalColorSort(fabrics) {
    const tempValue = [...fabrics];

    if (tempValue.length < 2) return tempValue;

    tempValue.sort((a, b) => {
        if (a[0] < b[0]) {
            return -1;
        } else if (a[0] === b[0]) {
            if (a[2] < b[2]) {
                return -1
            } else {
                return 1
            }
        } else {
            return 1;
        }
    });

    return tempValue;
}

function durabilitySort(fabrics) {
    const tempValue = [...fabrics]

    if (tempValue.length < 2) return tempValue;

    tempValue.sort((a, b) => {
        if (Number(a[1]) < Number(b[1])) {
            return -1;
        } else if (a[0] === b[0]) {
            if (a[2] < b[2]) {
                return -1
            } else {
                return 1
            }
        } else {
            return 1;
        }
    })

    return tempValue;
}

function fabricsInSamePosition(adaSort, charlesSort) {
    let counter = 0;
    let idx = 0;
    while (idx < adaSort.length) {
        if (adaSort[idx][2] === charlesSort[idx][2]) {
            counter++
        }
        idx++;
    }

    return counter;
}
