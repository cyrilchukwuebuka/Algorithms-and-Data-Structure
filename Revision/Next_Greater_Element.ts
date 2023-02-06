export function nextGreaterElement(array: number[]) {
  // Write your code here.
  const stack = new Stack();
  const output = new Array(array.length).fill(-1);

  for (let idx = 2 * array.length - 1; idx > -1; idx--) {
    const i = idx % array.length;
    const value = array[i];

    while (!stack.isEmpty() && stack.peek() <= value) {
      stack.pop();
    }

    if (stack.peek() > value) output[i] = stack.peek();

    stack.push(value);
  }

  return output;
}

class Stack {
  stack: number[];

  constructor() {
    this.stack = [];
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  pop() {
    return this.stack.pop();
  }

  push(value: number) {
    return this.stack.push(value);
  }

  isEmpty() {
    return !this.stack.length;
  }
}



////////////// OR ////////////

// export function nextGreaterElement(array: number[]) {
//   // Write your code here.
//   const output: number[] = new Array(array.length).fill(-1);
//   const stack = new Stack();

//   for (let idx = 0; idx < 2 * array.length; idx++) {
//     const i = idx % array.length;
//     const value = array[i];

//     // if (stack.isEmpty()) {
//     //   stack.push(i);
//     //   continue;
//     // }

//     while (!stack.isEmpty() && array[stack.peek()] < value) {
//       output[stack.pop()!] = value;
//     }

//     stack.push(i);
//   }

//   // console.log(output)
//   return output;
// }

// class Stack {
//   stack: number[];

//   constructor() {
//     this.stack = [];
//   }

//   peek() {
//     return this.stack[this.stack.length - 1];
//   }

//   pop() {
//     return this.stack.pop();
//   }

//   push(value: number) {
//     return this.stack.push(value);
//   }

//   isEmpty() {
//     return !this.stack.length;
//   }
// }
