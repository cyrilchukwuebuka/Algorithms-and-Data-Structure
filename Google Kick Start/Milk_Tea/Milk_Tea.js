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
        const [numFriends, numForbiddenTypes, binaryOptions] = input[line++].split(' ').map(data => Number(data));

        const friendsOptions = [];
        for (let i = 0; i < numFriends; i++) {
            const data = input[line++];
            friendsOptions.push(data);
        }

        const forbiddenTypes = [];
        for (let i = 0; i < numForbiddenTypes; i++) {
            const data = input[line++];
            forbiddenTypes.push(data);
        }

        testData.push({ testNumber, friendsOptions, forbiddenTypes, binaryOptions });
    }

    return testData;
}

function runTestCase(data) {
    const { testNumber, friendsOptions, forbiddenTypes, binaryOptions } = data;
    const result = solution(friendsOptions, forbiddenTypes, binaryOptions)
    let score = null;
    if (result.length > 0) {
        score = result[0].score
    }
    console.log(`Case #${testNumber}: ${score}`);
}

function runAllTests(lines) {
    const testCases = parseInput(lines);
    testCases.forEach(runTestCase);
}

const lines = [];
rl.on("line", (line) => lines.push(line.trim())).on("close", () =>
    runAllTests(lines)
);

class ScoreTea {
    score;
    tea;

    constructor(score, tea) {
        this.score = score;
        this.tea = tea;
    }

    increment() {
        this.score += 1;
    }

    compareTo(scoreTea) {
        return this.score - scoreTea.score;
    }
}

class ScoreTeaSet {
    set;
    size;

    constructor(array) {
        this.set = array;
        this.size = array.length;
    }
}

function sortFilter(set, targetCount) {
    set.sort((a, b) => a.score < b.score ? -1 : 1)

    const newSet = new Array();
    for (let i = 0; i < targetCount; i++) {
        newSet.push(set[i])
    }

    return newSet;
}

function score(preferences, teaSet) {
    for (let scoreTea of teaSet) {
        for (let idx in scoreTea.tea) {
            const char = scoreTea.tea[idx];
            for (let option of preferences) {
                if (char.charAt(0) !== option.charAt(idx)) {
                    scoreTea.increment();
                }
            }
        }
    }
}

function createSet(set) {
    const newSet = new Array();
    for (let i = 0; i < set.length; i++) {
        const newTea = set[i].tea + '0';
        newSet.push(new ScoreTea(0, newTea))
    }

    for (let i = 0; i < set.length; i++) {
        const newTea = set[i].tea + '1';
        newSet.push(new ScoreTea(0, newTea))
    }

    return newSet;
}

function validScoreTeas(friendsOptions, targetCount, binaryOptions, scoreTeaSet, scoreTeaSetList) {
    for (let i = 1; i <= binaryOptions; i++) {
        const prevScoreTeaSet = scoreTeaSetList[i - 1];
        let newSet = createSet(prevScoreTeaSet.set);
        if (newSet.length > targetCount) {
            score(friendsOptions, newSet)
            newSet = sortFilter(newSet, targetCount)
        }
        scoreTeaSet = new ScoreTeaSet(newSet, targetCount);
        scoreTeaSetList.push(scoreTeaSet)
    }
}

function filterForbiddenTea(scoreSet, forbiddenSet) {
    const newSet = [];
    for (let data of scoreSet) {
        let isForbidden = false;
        for (let option of forbiddenSet) {
            if (option === data.tea) isForbidden = true
        }

        if (!isForbidden) newSet.push(data);
    };
    return newSet
}

function solution(friendsOptions, forbiddenTypes, binaryOptions) {
    const scoreTeaSetList = new Array();
    const targetCount = Math.min(binaryOptions, (2 ** binaryOptions) - 1) + 1;
    let scoreTeaSet = new ScoreTeaSet([new ScoreTea(0, '')]);
    scoreTeaSetList.push(scoreTeaSet);

    validScoreTeas(friendsOptions, targetCount, binaryOptions, scoreTeaSet, scoreTeaSetList);

    const finalScoreSetResult = scoreTeaSetList[scoreTeaSetList.length - 1].set

    return filterForbiddenTea(finalScoreSetResult, forbiddenTypes);
}
