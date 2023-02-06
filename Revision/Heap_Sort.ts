export function heapSort(array: number[]) {
  // Write your code here.
  buildMaxArray(array);
  for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
    swap(0, endIdx, array);
    siftDown(0, endIdx - 1, array);
  }
  return array;
}

function buildMaxArray(array: number[]) {
  const firstParent = Math.floor((array.length - 2) / 2);
  for (let currentIdx = firstParent; currentIdx > -1; currentIdx--) {
    siftDown(currentIdx, array.length - 1, array);
  }
}

function siftDown(currentIdx: number, endIdx: number, heap: number[]) {
  let leftChildIdx = currentIdx * 2 + 1;
  while (leftChildIdx <= endIdx) {
    const rightChildIdx =
      currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
    let idxToSwap;
    if (rightChildIdx !== -1 && heap[rightChildIdx] > heap[leftChildIdx]) {
      idxToSwap = rightChildIdx;
    } else {
      idxToSwap = leftChildIdx;
    }
    if (heap[idxToSwap] > heap[currentIdx]) {
      swap(idxToSwap, currentIdx, heap);
      currentIdx = idxToSwap;
      leftChildIdx = currentIdx * 2 + 1;
    } else {
      return;
    }
  }
}

function swap(i: number, j: number, heap: number[]) {
  const temp = heap[i];
  heap[i] = heap[j];
  heap[j] = temp;
}
