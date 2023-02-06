export function threeNumberSort(array: number[], order: number[]) {
  // Write your code here.
  let previousStop = moveDigitLeft(array, order[0]);
  moveDigitRight(array, order[2], previousStop);
  return array;
}

const moveDigitLeft = (array: number[], digit: number): number => {
  let currentIdx = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === digit) {
      swap(array, i, currentIdx);
      currentIdx++;
    }
  }
  return currentIdx - 1;
};

const moveDigitRight = (
  array: number[],
  digit: number,
  previousStop: number
) => {
  let currentIdx = array.length - 1;
  for (let i = array.length - 1; i > -1; i--) {
    if (i === previousStop) break;
    if (array[i] === digit) {
      swap(array, i, currentIdx);
      currentIdx--;
    }
  }
};

const swap = (array: number[], left: number, right: number) => {
  const tempValue = array[left];
  array[left] = array[right];
  array[right] = tempValue;
};
