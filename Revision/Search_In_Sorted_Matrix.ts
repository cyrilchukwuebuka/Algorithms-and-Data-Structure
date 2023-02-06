type Range = [number, number];

export function searchInSortedMatrix(
  matrix: number[][],
  target: number
): Range {
  // Write your code here.
  let col = matrix[0].length - 1;
  let row = 0;

  while (row < matrix.length && col > -1) {
    let currentValue = matrix[row][col];
    if (currentValue === target) {
      return [row, col];
    } else if (currentValue > target) {
      col--;
    } else {
      row++;
    }
  }

  return [-1, -1];
}
