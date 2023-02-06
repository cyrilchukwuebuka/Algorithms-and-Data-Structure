export function countInversions(array: number[]) {
  // Write your code here.
  return countSubArrayInversions(array, 0, array.length);
}

function countSubArrayInversions(
  array: number[],
  start: number,
  end: number
): number {
  if (end - start <= 1) return 0;

  const middle = Math.floor((start + end) / 2);
  const leftInversions = countSubArrayInversions(array, start, middle);
  const rightInversions = countSubArrayInversions(array, middle, end);
  return (
    leftInversions +
    rightInversions +
    mergeSortAndCountInversions(array, start, middle, end)
  );
}

function mergeSortAndCountInversions(
  array: number[],
  start: number,
  middle: number,
  end: number
) {
  const sortedArray: number[] = [];

  let left = start;
  let right = middle;
  let inversions = 0;

  while (left < middle && right < end) {
    if (array[left] <= array[right]) {
      sortedArray.push(array[left]);
      left++;
    } else {
      inversions += middle - left;
      sortedArray.push(array[right]);
      right++;
    }
  }

  sortedArray.push(...array.slice(left, middle), ...array.slice(right, end));
  for (let idx = 0; idx < sortedArray.length; idx++) {
    const num = sortedArray[idx];
    array[start + idx] = num;
  }

  return inversions;
}
