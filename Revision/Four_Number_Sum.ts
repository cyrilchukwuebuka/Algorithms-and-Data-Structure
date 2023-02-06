export function fourNumberSum(array: number[], targetSum: number) {
  // Write your code here.
  const pairSum: { [key: string]: number[][] } = {};
  const output: number[][] = [];

  for (let i = 0; i < array.length; i++) {
    const num1 = array[i];
    for (let j = i + 1; j < array.length; j++) {
      const num2 = array[j];
      const diff = targetSum - (num1 + num2);
      if (diff in pairSum) {
        for (let arr of pairSum[diff]) {
          output.push([...arr, num1, num2]);
        }
      }
    }

    for (let j = i - 1; j > -1; j--) {
      const num2 = array[j];
      const sum = num1 + num2;
      if (sum in pairSum) {
        pairSum[sum].push([num1, num2]);
      } else {
        pairSum[sum] = [[num1, num2]];
      }
    }
  }

  return output;
}
