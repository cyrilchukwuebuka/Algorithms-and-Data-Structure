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
        const noOfPapers = Number(input[line++]);
        const data = input[line++].split(" ").map((value) => Number(value));
        testData.push({ testNumber, noOfPapers, data });
    }

    return testData;
}

function calculateHindex(N, citations) {
    const ans = [];
    const minHeap = new MinHeap([]);
    let hIndex = 0;
    for (let i = 0; i < N; i++) {
        if (citations[i] > hIndex) {
            minHeap.insert(citations[i])
        }

        while (minHeap.length !== 0 && minHeap.peek() <= hIndex) {
            minHeap.remove()
        }

        if (minHeap.length >= hIndex + 1) {
            hIndex++;
        }
        ans.push(hIndex);
    }
    return ans.join(' ');
}

function runTestCase(dataSet) {
    const { testNumber, noOfPapers, data } = dataSet;
    const scores = calculateHindex(noOfPapers, data);
    console.log(`Case #${testNumber}: ${scores}`);
}

function runAllTests(lines) {
    const testCases = parseInput(lines);
    testCases.forEach(runTestCase);
}

const lines = [];
rl.on("line", (line) => lines.push(line.trim())).on("close", () =>
    runAllTests(lines)
);


class MinHeap {
    heap;
    length;

    constructor(array) {
        this.heap = this.buildHeap(array);
        this.length = this.heap.length;
    }

    buildHeap(array) {
        const length = array.length - 1;
        const firstParentIdx = Math.floor((length - 1) / 2);
        for (let currentIdx = firstParentIdx; currentIdx > -1; currentIdx--) {
            this.siftDown(currentIdx, length, array);
        }
        return array;
    }

    siftDown(currentIdx, endIdx, heap) {
        let leftChildIdx = this.getLeftChildIdx(currentIdx);
        while (leftChildIdx <= endIdx) {
            const rightChildIdx = this.getRightChildIdx(currentIdx) <= endIdx ? this.getRightChildIdx(currentIdx) : -1;
            let idxToSwap;
            if (rightChildIdx !== -1) {
                if (heap[rightChildIdx] < heap[leftChildIdx]) {
                    idxToSwap = rightChildIdx
                } else {
                    idxToSwap = leftChildIdx;
                }
            } else {
                idxToSwap = leftChildIdx;
            }

            if (heap[idxToSwap] < heap[currentIdx]) {
                this.swap(heap, idxToSwap, currentIdx);
                currentIdx = idxToSwap;
                leftChildIdx = this.getLeftChildIdx(currentIdx);
            } else {
                return
            }
        }
    }

    siftUp(currentIdx, heap) {
        let parentIdx = this.getParentIdx(currentIdx);
        while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
            this.swap(heap, currentIdx, parentIdx);
            currentIdx = parentIdx;
            parentIdx = this.getParentIdx(currentIdx);
        }
    }

    peek() {
        return this.heap[0];
    }


    remove() {
        if (this.heap.length < 1) return;
        this.swap(this.heap, 0, this.heap.length - 1);
        const nodeValueToRemove = this.heap.pop();
        this.length--;
        this.siftDown(0, this.heap.length - 1, this.heap);
        return nodeValueToRemove;
    }

    insert(value) {
        this.heap.push(value);
        this.length++;
        this.siftUp(this.heap.length - 1, this.heap)
    }

    swap(heap, i, j) {
        const tempValue = heap[i];
        heap[i] = heap[j];
        heap[j] = tempValue;
    }

    getParentIdx(childIdx) {
        return Math.floor((childIdx - 1) / 2);
    }

    getLeftChildIdx(parentIdx) {
        return parentIdx * 2 + 1;
    }

    getRightChildIdx(parentIdx) {
        return parentIdx * 2 + 2;
    }
}