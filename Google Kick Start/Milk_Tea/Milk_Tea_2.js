const _readline = require("readline");
let rl = _readline.createInterface(process.stdin, process.stdout);
// const fs = require("fs");
// const rl = _readline.createInterface({
//     input: fs.createReadStream("../input.txt"),
// });

const parseInput = (input) => {
    let line = 0;

    const numOfTestCases = Number(input[line++]);

    const testData = [];
    for (let testNumber = 1; testNumber <= numOfTestCases; testNumber++) {
        const [numFriends, numForbiddenMilkTeas, binaryOptions] = input[line++].split(' ').map(data => Number(data));

        const friendsPreferences = [];
        for (let i = 0; i < numFriends; i++) {
            const data = input[line++];
            friendsPreferences.push(data.trim());
        }

        const forbiddenMilkTeas = [];
        for (let i = 0; i < numForbiddenMilkTeas; i++) {
            const data = input[line++];
            forbiddenMilkTeas.push(data.trim());
        }

        testData.push({ testNumber, friendsPreferences, forbiddenMilkTeas, binaryOptions });
    }

    return testData;
}

const runTestCase = (data) => {
    const { testNumber, friendsPreferences, forbiddenMilkTeas, binaryOptions } = data;

    const targetCount = forbiddenMilkTeas.length + 1;

    let scoreMilkTeaList = new Array();
    scoreMilkTeaList.push(new ScoreMilkTea('', 0));

    for (let i = 0; i < binaryOptions; i++) {
        const nextSet = new Array();

        for (let scoreMilkTea of scoreMilkTeaList) {
            expand(nextSet, scoreMilkTea, friendsPreferences)
        }

        scoreMilkTeaList = sortFilter(nextSet, targetCount)
    }

    for (let scoreMilkTea of scoreMilkTeaList) {
        if (isForbiddenTea(scoreMilkTea.milkTea, forbiddenMilkTeas)) continue;
        console.log(`Case #${testNumber}: ${scoreMilkTea.score}`);
        return;
    }

    console.log(`Case #${testNumber}: 0`);
}

const runAllTests = (lines) => {
    const testCases = parseInput(lines);
    testCases.forEach(runTestCase);
}

const lines = [];
rl.on("line", line => lines.push(line.trim())).on('close', () => runAllTests(lines))

class ScoreMilkTea {
    milkTea;
    score;

    constructor(milkTea, score) {
        this.milkTea = milkTea;
        this.score = score;
    }

    increment() {
        this.score += 1;
    }

    compareTo(scoreMilkTea) {
        return this.score - scoreMilkTea.score;
    }
}

const sortFilter = (milkTeaSet, targetCount) => {
    milkTeaSet.sort((a, b) => a.compareTo(b))

    if (milkTeaSet.length <= targetCount) {
        return milkTeaSet
    }

    let filteredMilkTeaSet = []
    for (let i = 0; i < targetCount; i++) {
        filteredMilkTeaSet.push(milkTeaSet[i])
    }

    return filteredMilkTeaSet
}

const score = (milkTea, prevScore, teas) => {
    let curScore = 0;
    const idx = milkTea.length - 1;
    for (const tea of teas) {
        if (tea[idx] !== milkTea[idx]) curScore += 1;
    }

    return prevScore + curScore;
}

const expand = (scoreMilkTeaList, scoreMilkTea, teas) => {
    const milkTeaZero = scoreMilkTea.milkTea + '0'
    let newScore = score(milkTeaZero, scoreMilkTea.score, teas)
    // console.log(newScore, teas)
    scoreMilkTeaList.push(new ScoreMilkTea(milkTeaZero, newScore))

    const milkTeaOne = scoreMilkTea.milkTea + '1'
    newScore = score(milkTeaOne, scoreMilkTea.score, teas)
    // console.log(newScore)
    scoreMilkTeaList.push(new ScoreMilkTea(milkTeaOne, newScore))
}

const isForbiddenTea = (milkTea, forbiddenMilkTeas) => {
    for (const forbiddenMilkTea of forbiddenMilkTeas) {
        if (forbiddenMilkTea === milkTea) return true
    }

    return false;
}
















// const _readline = require("readline");
// // let rl = _readline.createInterface(process.stdin, process.stdout);
// const fs = require("fs");
// const rl = _readline.createInterface({
//     input: fs.createReadStream("../input.txt"),
// });

// const parseInput = (input) => {
//     let line = 0;

//     const numOfTestCases = Number(input[line++]);

//     const testData = [];
//     for (let testNumber = 1; testNumber <= numOfTestCases; testNumber++) {
//         const [numFriends, numForbiddenMilkTeas, binaryOptions] = input[line++].split(' ').map(data => Number(data));

//         const friendsPreferences = [];
//         for (let i = 0; i < numFriends; i++) {
//             const data = input[line++];
//             friendsPreferences.push(data.trim());
//         }

//         const forbiddenMilkTeas = [];
//         for (let i = 0; i < numForbiddenMilkTeas; i++) {
//             const data = input[line++];
//             forbiddenMilkTeas.push(data.trim());
//         }

//         testData.push({ testNumber, friendsPreferences, forbiddenMilkTeas, binaryOptions });
//     }

//     return testData;
// }

// const runTestCase = (data) => {
//     const { testNumber, friendsPreferences, forbiddenMilkTeas, binaryOptions } = data;

//     const targetCount = forbiddenMilkTeas.length + 1;

//     let scoreMilkTeaList = new ScoreMilkTeaSet([new ScoreMilkTea('', 0)], targetCount);
//     // scoreMilkTeaList.push(new ScoreMilkTea('', 0));

//     for (let i = 0; i < binaryOptions; i++) {
//         const nextSet = new ScoreMilkTeaSet([], targetCount);

//         for (let scoreMilkTea of scoreMilkTeaList.getSet()) {
//             // console.log(scoreMilkTea)
//             expand(nextSet, scoreMilkTea, friendsPreferences)
//             break
//         }

//         console.log(nextSet.getSet())

//         scoreMilkTeaList = nextSet;
//         // scoreMilkTeaList = sortFilter(nextSet, targetCount)
//     }

//     // console.log(scoreMilkTeaList)

//     for (let scoreMilkTea of scoreMilkTeaList) {
//         if (!filterForbiddenTea(scoreMilkTea.milkTea, forbiddenMilkTeas)) {
//             // console.log(`Case #${testNumber}: ${''}`);
//         }
//     }
// }

// const runAllTests = (lines) => {
//     const testCases = parseInput(lines);
//     testCases.forEach(runTestCase);
// }

// const lines = [];
// rl.on("line", line => lines.push(line.trim())).on('close', () => runAllTests(lines))

// class ScoreMilkTea {
//     milkTea;
//     score;

//     constructor(milkTea, score) {
//         this.milkTea = milkTea;
//         this.score = score;
//     }

//     increment() {
//         this.score += 1;
//     }

//     compareTo(scoreMilkTea) {
//         return this.score - scoreMilkTea.score;
//     }
// }

// class ScoreMilkTeaSet {
//     set;
//     size;
//     targetCount;

//     constructor(array, targetCount) {
//         this.set = this.sortFilter(array, targetCount);
//         this.size = array.length;
//         this.targetCount = targetCount;
//     }

//     getSet() {
//         return this.set
//     }

//     add(scoreMilkTea) {
//         this.set.push(scoreMilkTea)
//         this.set = this.sortFilter(this.set, this.targetCount)
//     }

//     sortFilter(milkTeaSet, targetCount) {
//         if (milkTeaSet.length === 0) return milkTeaSet;

//         milkTeaSet.sort((a, b) => a.compareTo(b))

//         if (milkTeaSet.length <= targetCount) {
//             return milkTeaSet
//         }

//         let filteredMilkTeaSet = []
//         for (let i = 0; i < targetCount; i++) {
//             filteredMilkTeaSet.push(milkTeaSet[i])
//         }

//         return filteredMilkTeaSet
//     }

//     clear() {
//         this.set = []
//     }
// }

// const sortFilter = (milkTeaSet, targetCount) => {
//     if (milkTeaSet.length === 0) return milkTeaSet;

//     milkTeaSet.sort((a, b) => a.compareTo(b))

//     if (milkTeaSet.length <= targetCount) {
//         return milkTeaSet
//     }

//     let filteredMilkTeaSet = []
//     for (let i = 0; i < targetCount; i++) {
//         filteredMilkTeaSet.push(milkTeaSet[i])
//     }

//     return filteredMilkTeaSet
// }

// const score = (milkTea, prevScore, teas) => {
//     let curScore = 0;
//     const idx = milkTea.length - 1;
//     for (const tea of teas) {
//         if (tea[idx] !== milkTea[idx]) curScore += 1;
//     }

//     return prevScore + curScore
// }

// const expand = (scoreMilkTeaList, scoreMilkTea, teas) => {
//     console.log(scoreMilkTeaList)
//     const milkTeaZero = scoreMilkTea.milkTea + '0'
//     let newScore = score(milkTeaZero, scoreMilkTea.score, teas)
//     // // console.log(newScore, teas)
//     scoreMilkTeaList.add(new ScoreMilkTea(milkTeaZero, newScore))

//     const milkTeaOne = scoreMilkTea.milkTea + '1'
//     newScore = score(milkTeaOne, scoreMilkTea.score, teas)
//     // // console.log(newScore)
//     scoreMilkTeaList.add(new ScoreMilkTea(milkTeaOne, newScore))
// }









// const filterForbiddenTea = () => {
//     return false;
// }




// const createSet = () => {

// }

// const validScoreTeas = () => { }
