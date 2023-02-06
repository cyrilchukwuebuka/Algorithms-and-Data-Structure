export function bubbleSort(array: number[]) {
  // Write your code here.
  let isSwapped = true;
  let counter = 0;

  while (isSwapped) {
    isSwapped = false;
    for (let i = 1; i < array.length - counter; i++) {
      if (array[i - 1] > array[i]) {
        swap(array, i - 1, i);
        isSwapped = true;
      }
    }
    counter++;
  }

  return array;
}

const swap = (array: number[], i: number, j: number) => {
  const tempValue = array[i];
  array[i] = array[j];
  array[j] = tempValue;
};


/////// OR /////////////

// export function bubbleSort(array: number[]) {
//   // Write your code here.
//   let isSwapped = true;
//   let lastIdx = array.length - 1;

//   while (isSwapped && lastIdx > 0) {
//     isSwapped = false;
//     let idx = 0;
//     while (idx < lastIdx) {
//       if (array[idx] > array[idx + 1]) {
//         const temp = array[idx];
//         array[idx] = array[idx + 1];
//         array[idx + 1] = temp;
//         isSwapped = true;
//       }
//       idx++;
//     }

//     lastIdx--;
//   }

//   return array;
// }
