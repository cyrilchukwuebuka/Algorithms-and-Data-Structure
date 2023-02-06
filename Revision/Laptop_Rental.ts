export function laptopRentals(times: Tuple[]) {
  // Write your code here.
  times.sort((a, b) => (a[0] < b[0] ? -1 : 1));
  const minHeap = new MinHeap(times[0]);

  for (let i = 1; i < times.length; i++) {
    const time = times[i];
    if (time[0] >= minHeap.peak()[1]) {
      minHeap.remove();
      minHeap.insert(time);
    } else {
      minHeap.insert(time);
    }
  }

  return minHeap.length;
}

type Tuple = [number, number];

class MinHeap {
  heap: Tuple[];
  length: number;

  constructor(value: Tuple) {
    this.heap = value ? [value] : [];
    this.length = this.heap.length;
  }

  siftDown(currentIdx: number, endIdx: number, heap: Tuple[]) {
    let leftChildIdx = currentIdx * 2 + 1;
    while (leftChildIdx <= endIdx) {
      const rightChildIdx =
        currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (
        rightChildIdx !== -1 &&
        heap[rightChildIdx][1] < heap[leftChildIdx][1]
      ) {
        idxToSwap = rightChildIdx;
      } else {
        idxToSwap = leftChildIdx;
      }

      if (heap[idxToSwap][1] < heap[currentIdx][1]) {
        this.swap(idxToSwap, currentIdx, heap);
        currentIdx = idxToSwap;
        leftChildIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  peak() {
    return this.heap[0];
  }

  siftUp(currentIdx: number, heap: Tuple[]) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx][1] < heap[parentIdx][1]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  insert(value: [number, number]) {
    this.heap.push(value);
    this.length++;
    this.siftUp(this.length - 1, this.heap);
  }

  remove() {
    this.swap(0, this.length - 1, this.heap);
    const valueToRemove = this.heap.pop();
    this.length--;
    this.siftDown(0, this.length - 1, this.heap);
    return valueToRemove;
  }

  swap(i: number, j: number, heap: Tuple[]) {
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }
}



/////////////// OR  //////////////

// export function laptopRentals(times: number[][]) {
//   // Write your code here.
//   const startTime = [...times].sort((a, b) => (a[0] < b[0] ? -1 : 1));
//   const endTime = [...times].sort((a, b) => (a[1] < b[1] ? -1 : 1));
//   let numLaptop = 0;
//   let endTimeIdx = 0;

//   for (let i = 0; i < startTime.length; i++) {
//     if (startTime[i][0] < endTime[endTimeIdx][1]) {
//       numLaptop++;
//     } else {
//       endTimeIdx++;
//     }
//   }

//   return numLaptop;
// }


