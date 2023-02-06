export function shiftedBinarySearch(array: number[], target: number) {
  // Write your code here.
  return shiftedBinarySearchHelper(array, target, 0, array.length - 1);
}

const shiftedBinarySearchHelper = (
  array: number[],
  target: number,
  leftIdx: number,
  rightIdx: number
) => {
  while (leftIdx <= rightIdx) {
    const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    const middleValue = array[middleIdx];
    const leftValue = array[leftIdx];
    const rightValue = array[rightIdx];

    if (target === middleValue) {
      return middleIdx;
    } else if (leftValue < middleValue) {
      if (leftValue <= target && target < middleValue) {
        rightIdx = middleIdx - 1;
      } else {
        leftIdx = middleIdx + 1;
      }
    } else {
      if (target > middleValue && target <= rightValue) {
        leftIdx = middleIdx + 1;
      } else {
        rightIdx = middleIdx - 1;
      }
    }
  }
  return -1;
};
