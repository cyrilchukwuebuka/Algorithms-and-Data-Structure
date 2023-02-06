// Feel free to add new properties and methods to the class.
export class MinMaxStack {
  minMax: number[][];
  stack: number[];

  constructor() {
    this.minMax = [];
    this.stack = [];
  }

  peek() {
    // Write your code here.
    return this.stack[this.stack.length - 1];
  }

  pop() {
    // Write your code here.
    this.minMax.pop();
    return this.stack.pop();
  }

  push(number: number) {
    // Write your code here.
    const newMinMax: number[] = [number, number];

    if (this.minMax.length) {
      let [min, max] = this.minMax[this.stack.length - 1];
      newMinMax[0] = Math.min(number, min);
      newMinMax[1] = Math.max(number, max);
    }
    this.minMax.push(newMinMax);
    this.stack.push(number);
  }

  getMin() {
    // Write your code here.
    return this.minMax[this.stack.length - 1][0];
  }

  getMax() {
    // Write your code here.
    return this.minMax[this.stack.length - 1][1];
  }
}
