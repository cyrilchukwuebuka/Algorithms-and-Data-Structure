
const Days = [1, 0, 1, 0, 1];
const k = 1;
// [3, 4]

class Heap {
    heap;
    comparisonFunc;
    length;

    constructor(comparisonFunc, array) {
        this.comparisonFunc = comparisonFunc;
        this.heap = this.buildHeap(array);
        this.length = this.heap.length;
    }

    buildHeap(array) {
        const firstParentIdx = this.getParentIdx(array.length - 1);
        for (let currentIdx = firstParentIdx; currentIdx > -1; currentIdx--) {
            this.siftDown(currentIdx, array.length - 1, array);
        }
        return array;
    }

    siftDown(currentIdx, endIdx, heap) {
        let leftChildIdx = this.getLeftChildIdx(currentIdx);
        while (leftChildIdx <= endIdx) {
            const rightChildIdx = this.getRightChildIdx(currentIdx) <= endIdx ? this.getRightChildIdx(currentIdx) : -1;
            let idxToSwap;
            if (rightChildIdx !== -1) {
                if (this.comparisonFunc(heap[rightChildIdx], heap[leftChildIdx])) {
                    idxToSwap = rightChildIdx;
                } else {
                    idxToSwap = leftChildIdx;
                }
            } else {
                idxToSwap = leftChildIdx;
            }

            if (this.comparisonFunc(heap[idxToSwap], heap[currentIdx])) {
                this.swap(idxToSwap, currentIdx, heap);
                currentIdx = idxToSwap;
                leftChildIdx = this.getLeftChildIdx(currentIdx);
            } else {
                return;
            }
        }
    }

    siftUp(currentIdx, heap) {
        let parentIdx = this.getParentIdx(currentIdx);
        while (currentIdx > 0) {
            if (this.comparisonFunc(heap[currentIdx], heap[parentIdx])) {
                this.swap(currentIdx, parentIdx, heap);
                currentIdx = parentIdx;
                parentIdx = this.getParentIdx(currentIdx)
            } else {
                return
            }
        }
    }

    remove() {
        this.swap(0, this.length - 1, this.heap);
        const nodeToRemove = this.heap.pop();
        this.length--;
        this.siftDown(0, this.length - 1, this.heap);
        return nodeToRemove;
    }

    insert(value) {
        this.heap.push(value);
        this.length++;
        this.siftUp(this.length - 1, this.heap);
    }

    peek() {
        return this.heap[0];
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

    swap(i, j, heap) {
        const temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
}

function MAX_HEAP_FUNC(a, b) {
    return a > b;
}

function MIN_HEAP_FUNC(a, b) {
    return a < b;
}

function predictDays(days, k) {
    let output = [];
    const prevDays = new Heap(MAX_HEAP_FUNC, []);
    const nextDays = new Heap(MIN_HEAP_FUNC, days.slice(1, k + 2));
    console.log(days, k)
    
    let currentIdx = 0;
    while (currentIdx < days.length) {
        const curValue = days[currentIdx];
        if ((prevDays.peek() === undefined || curValue >= prevDays.peek()) && (nextDays.peek() === undefined || curValue <= nextDays.peek())) {
            output.push(currentIdx);
        }
        
        if (prevDays.length === k) {
            prevDays.remove()
        }
        prevDays.insert(days[currentIdx]);
        
        if (nextDays.length === k + 1) {
            nextDays.remove()
        }

        if (currentIdx + k + 1 < days.length) {
            nextDays.insert(days[currentIdx + k + 1])
        }

        currentIdx++
    }

    console.log(output)
}

predictDays(Days, k)

