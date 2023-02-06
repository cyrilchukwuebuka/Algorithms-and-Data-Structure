export function insertionSort(array: number[]) {
  // Write your code here.
  let lastIdx = 0;
  while (lastIdx < array.length - 1) {
    if (array[lastIdx] > array[lastIdx + 1]) {
      swap(array, lastIdx, lastIdx + 1);
      let currentIdx = lastIdx - 1;
      while (currentIdx > -1) {
        if (array[currentIdx] <= array[currentIdx + 1]) break;
        swap(array, currentIdx, currentIdx + 1);
        currentIdx--;
      }
    }
    lastIdx++;
  }

  return array;
}

const swap = (array: number[], left: number, right: number) => {
  const tempValue = array[left];
  array[left] = array[right];
  array[right] = tempValue;
};


///////// OR ///////////

// export function insertionSort(array: number[]) {
//   // Write your code here.
//   insertionSortHelper(array);
//   return array;
// }

// const insertionSortHelper = (array: number[]) => {
//   for (let i = 1; i < array.length; i++) {
//     if (array[i - 1] > array[i]) {
//       putDigitInPlace(array, i);
//     }
//   }
// };

// const putDigitInPlace = (array: number[], startIdx: number) => {
//   while (startIdx > -1 && array[startIdx] < array[startIdx - 1]) {
//     const tempValue = array[startIdx - 1];
//     array[startIdx - 1] = array[startIdx];
//     array[startIdx] = tempValue;
//     startIdx--;
//   }
// };
