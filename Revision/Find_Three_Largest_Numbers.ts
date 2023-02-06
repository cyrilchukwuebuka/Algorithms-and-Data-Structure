export function findThreeLargestNumbers(array: number[]) {
  // Write your code here.
  const threeLargestNumber: number[] = new Array(3).fill(-Infinity);

  for (let num of array) {
    if (threeLargestNumber[2] <= num) {
      putDigitInPlace(threeLargestNumber, num, 2);
    } else if (threeLargestNumber[1] <= num) {
      putDigitInPlace(threeLargestNumber, num, 1);
    } else if (threeLargestNumber[0] <= num) {
      putDigitInPlace(threeLargestNumber, num, 0);
    }
  }
  return threeLargestNumber;
}

const putDigitInPlace = (array: number[], digit: number, targetIdx: number) => {
  for (let i = 0; i < array.length; i++) {
    if (i === targetIdx) {
      array[i] = digit;
      break;
    } else {
      array[i] = array[i + 1];
    }
  }
};
