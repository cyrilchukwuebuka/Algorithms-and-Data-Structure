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
        const numOfPapers = Number(input[line++]);

        const citations = input[line++].split(' ').map((data) => Number(data))
        
        testData.push({ testNumber, numOfPapers, citations });
    }

    return testData;
}

const runTestCase = (data) => {
    const { testNumber, numOfPapers, citations } = data;
    
    const result = solution(numOfPapers, citations);

    console.log(`Case #${testNumber}: ${result}`);
}

const runAllTests = (lines) => {
    const testCases = parseInput(lines);
    testCases.forEach(runTestCase);
}

const lines = [];
rl.on("line", line => lines.push(line.trim())).on('close', () => runAllTests(lines))

const solution = (numOfPapers, citations) => {
    const h_scores = []
    let runningScore = 0;
    const minHeap = new MinHeap([]);

    for (let citation of citations) {
        minHeap.insert(citation)
        while (minHeap.peak() && minHeap.peak() <= runningScore) {
            minHeap.remove()
        }

        if (runningScore + 1 <= minHeap.heap.length) {
            h_scores.push(++runningScore)
        } else {
            h_scores.push(runningScore)
        }
    }

    return h_scores.join(' ')
}

class MinHeap {
    heap

    constructor(array = []) {
        this.heap = this.buildHeap(array)
    }

    peak() {
        return this.heap[0];
    }

    buildHeap(array) {
        let firstParentIdx = Math.floor((array.length - 2) / 2)
        for(let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
            this.siftDown(currentIdx, array.length - 1, array)
        }
        return array
    }

    siftUp(currentIdx, heap) {
        let parentIdx = Math.floor((currentIdx - 1) / 2)
        while (currentIdx && heap[currentIdx] < heap[parentIdx]) {
            this.swap(currentIdx, parentIdx, heap)
            currentIdx = parentIdx
            parentIdx = Math.floor((currentIdx - 1) / 2)
        }
    }

    siftDown(currentIdx, endIdx, heap) {
        let leftChildIdx = (2 * currentIdx) + 1
        while (leftChildIdx <= endIdx) {
            const rightChildIdx = (2 * currentIdx) + 2 <= endIdx ? (2 * currentIdx) + 2 : -1
            let idxToSwap;
            if (rightChildIdx !== -1 && heap[rightChildIdx] < heap[leftChildIdx]) {
                idxToSwap = rightChildIdx
            } else {
                idxToSwap = leftChildIdx
            }

            if (heap[idxToSwap] < heap[currentIdx]) {
                this.swap(idxToSwap, currentIdx, heap)
                currentIdx = idxToSwap
                leftChildIdx = (2 * currentIdx) + 1
            } else {
                return
            }
        }
    }

    insert(value) {
        this.heap.push(value)
        this.siftUp(this.heap.length - 1, this.heap)
    }

    remove() {
        this.swap(0, this.heap.length - 1, this.heap)
        const valueToRemove = this.heap.pop()
        this.siftDown(0, this.heap.length, this.heap)
        return valueToRemove
    }

    swap(i, j, heap) {
        const temp = heap[i]
        heap[i] = heap[j]
        heap[j] = temp
    }
}





// below solution also works
// Time Complexity = O(N^2)
// Space Complexity = O(N)
// const solution = (numOfPapers, citations) => {
//     let curHScore = [];
//     let runningScore = 0;

//     for (let idx = 0; idx < numOfPapers; idx++) {
//         const citation = citations[idx]
//         let counter = 0;

//         if (citation > runningScore) {
//             runningScore++

//             for (let j = idx; j >= 0; j--) {
//                 const each = citations[j];
//                 if (each >= runningScore) {
//                     counter++;
//                 }
//             }
//         }
        
//         if (!(counter >= runningScore)) {
//             runningScore = curHScore[curHScore.length - 1]
//         }
//         curHScore.push(runningScore)
        
//         runningScore = curHScore[curHScore.length - 1] ?? 0
//     }

//     return curHScore.join(' ');
// }