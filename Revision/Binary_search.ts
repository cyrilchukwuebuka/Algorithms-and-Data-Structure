export function binarySearch(array: number[], target: number): number {
  // Write your code here.
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const middleIdx = Math.floor((left + right) / 2);

    if (target === array[middleIdx]) {
      return middleIdx;
    } else if (target > array[middleIdx]) {
      left = middleIdx + 1;
    } else {
      right = middleIdx - 1;
    }
  }
  return -1;
}

/////////// OR ///////////

// export function binarySearch(array: number[], target: number): number {
//   // Write your code here.
//   let left = 0;
//   let right = array.length - 1;

//   return searchForTargetValue(array, left, right, target);
// }

// const searchForTargetValue = (
//   array: number[],
//   left: number,
//   right: number,
//   target: number
// ): number => {
//   if (left > right) return -1;

//   const middle = Math.floor((left + right) / 2);

//   if (array[middle] === target) {
//     return middle;
//   } else if (array[middle] > target) {
//     return searchForTargetValue(array, left, middle - 1, target);
//   } else {
//     return searchForTargetValue(array, middle + 1, right, target);
//   }

//   return -1;
// };
