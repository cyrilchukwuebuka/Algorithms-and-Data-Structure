export function selectionSort(array: number[]) {
  // Write your code here.
  selectionSortHelper(array);
  return array;
}

const selectionSortHelper = (array: number[]) => {
  for (let i = 0; i < array.length; i++) {
    let leastValueIdx = -1;
    for (let j = i; j < array.length; j++) {
      if (leastValueIdx === -1) leastValueIdx = j;
      if (array[j] < array[leastValueIdx]) leastValueIdx = j;
    }
    swap(array, i, leastValueIdx);
  }
};

const swap = (array: number[], i: number, j: number) => {
  const tempValue = array[i];
  array[i] = array[j];
  array[j] = tempValue;
};
