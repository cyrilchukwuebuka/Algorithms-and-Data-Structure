export function sortKSortedArray(array: number[], k: number) {
  // Write your code here.
  kSortArrayHelper(array, k);
  return array;
}

const kSortArrayHelper = (array: number[], k: number) => {
  const heap = new MinHeap(array.slice(0, Math.min(k + 1, array.length)));

  let sortIdx = 0;
  for (let idx = k + 1; idx < array.length; idx++) {
    const minElement = heap.remove()!;
    array[sortIdx] = minElement;
    sortIdx++;

    const nextElement = array[idx];
    heap.insert(nextElement);
  }

  while (!heap.isEmpty()) {
    const minElement = heap.remove()!;
    array[sortIdx] = minElement;
    sortIdx++;
  }

  return array;
};

export class MinHeap {
  heap: number[];
  length: number;

  constructor(array: number[]) {
    this.heap = this.buildHeap(array);
    this.length = this.heap.length;
  }

  buildHeap(array: number[]) {
    const firstParentIdx = this.getParentIdx(array.length - 1);
    for (let currentIdx = firstParentIdx; currentIdx > -1; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  siftDown(currentIdx: number, endIdx: number, heap: number[]) {
    let leftChildIdx = this.getLeftChildIdx(currentIdx);
    while (leftChildIdx <= endIdx) {
      const rightChildIdx =
        this.getRightChildIdx(currentIdx) <= endIdx
          ? this.getRightChildIdx(currentIdx)
          : -1;
      let idxToSwap;
      if (rightChildIdx !== -1 && heap[rightChildIdx] < heap[leftChildIdx]) {
        idxToSwap = rightChildIdx;
      } else {
        idxToSwap = leftChildIdx;
      }

      if (heap[idxToSwap] < heap[currentIdx]) {
        this.swap(idxToSwap, currentIdx, heap);
        currentIdx = idxToSwap;
        leftChildIdx = this.getLeftChildIdx(currentIdx);
      } else {
        return;
      }
    }
  }

  siftUp(currentIdx: number, heap: number[]) {
    let parentIdx = this.getParentIdx(currentIdx);
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = this.getParentIdx(currentIdx);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  peak() {
    return this.heap[0];
  }

  insert(value: number) {
    this.heap.push(value);
    this.length++;
    this.siftUp(this.length - 1, this.heap);
  }

  remove() {
    this.swap(0, this.length - 1, this.heap);
    const nodeToRemove = this.heap.pop();
    this.length--;
    this.siftDown(0, this.length - 1, this.heap);
    return nodeToRemove;
  }

  swap(i: number, j: number, heap: number[]) {
    const tempValue = heap[i];
    heap[i] = heap[j];
    heap[j] = tempValue;
  }

  getParentIdx(childIdx: number) {
    return Math.floor((childIdx - 1) / 2);
  }

  getLeftChildIdx(parentIdx: number) {
    return parentIdx * 2 + 1;
  }

  getRightChildIdx(parentIdx: number) {
    return parentIdx * 2 + 2;
  }
}


///////// OR ////////////

// export function sortKSortedArray(array: number[], k: number) {
//   // Write your code here.
//   const minHeapWithKElements = new MinHeap(
//     array.slice(0, Math.min(k + 1, array.length))
//   );

//   let nextIndexToInsertElement = 0;
//   for (let idx = k + 1; idx < array.length; idx++) {
//     const minElement = minHeapWithKElements.remove()!;
//     array[nextIndexToInsertElement] = minElement;
//     nextIndexToInsertElement++;

//     const currentElement = array[idx];
//     minHeapWithKElements.insert(currentElement);
//   }

//   while (!minHeapWithKElements.isEmpty()) {
//     const minElement = minHeapWithKElements.remove()!;
//     array[nextIndexToInsertElement] = minElement;
//     nextIndexToInsertElement++;
//   }

//   return array;
// }

// export class MinHeap {
//   heap: number[];

//   constructor(array: number[]) {
//     this.heap = this.buildHeap(array);
//   }

//   isEmpty() {
//     return this.heap.length === 0;
//   }

//   buildHeap(array: number[]) {
//     const firstParentIdx = Math.floor((array.length - 2) / 2);
//     for (let currentIdx = firstParentIdx; currentIdx > -1; currentIdx--) {
//       this.siftDown(currentIdx, array.length - 1, array);
//     }
//     return array;
//   }

//   siftDown(currentIdx: number, endIdx: number, heap: number[]) {
//     let childOneIdx = currentIdx * 2 + 1;
//     while (childOneIdx <= endIdx) {
//       const childTwoIdx =
//         currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
//       let idxToSwap;
//       if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
//         idxToSwap = childTwoIdx;
//       } else {
//         idxToSwap = childOneIdx;
//       }
//       if (heap[idxToSwap] < heap[currentIdx]) {
//         this.swap(currentIdx, idxToSwap, heap);
//         currentIdx = idxToSwap;
//         childOneIdx = currentIdx * 2 + 1;
//       } else {
//         return;
//       }
//     }
//   }

//   siftUp(currentIdx: number, heap: number[]) {
//     let parentIdx = Math.floor((currentIdx - 1) / 2);
//     while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
//       this.swap(currentIdx, parentIdx, heap);
//       currentIdx = parentIdx;
//       parentIdx = Math.floor((currentIdx - 1) / 2);
//     }
//   }

//   peek() {
//     return this.heap[0];
//   }

//   remove() {
//     this.swap(0, this.heap.length - 1, this.heap);
//     const valueToRemove = this.heap.pop();
//     this.siftDown(0, this.heap.length - 1, this.heap);
//     return valueToRemove;
//   }

//   insert(value: number) {
//     this.heap.push(value);
//     this.siftUp(this.heap.length - 1, this.heap);
//   }

//   swap(i: number, j: number, heap: number[]) {
//     const temp = heap[j];
//     heap[j] = heap[i];
//     heap[i] = temp;
//   }
// }
