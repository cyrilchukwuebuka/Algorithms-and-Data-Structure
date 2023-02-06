export function balancedBrackets(string: string) {
  // Write your code here.
  const bracketMaps: Record<string, string> = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  const bracketList: Record<string, boolean> = {
    "(": true,
    ")": true,
    "[": true,
    "]": true,
    "{": true,
    "}": true,
  };

  const stack = new Stack();

  for (let char of string) {
    if (char in bracketList) {
      if (char in bracketMaps) {
        stack.push(char);
        continue;
      }
      if (!stack.isEmpty() && bracketMaps[stack.getLastValue()] === char) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.isEmpty();
}

class Stack {
  stack: string[];

  constructor() {
    this.stack = [];
  }

  pop() {
    return this.stack.pop();
  }

  push(value: string) {
    return this.stack.push(value);
  }

  getLastValue() {
    return this.stack[this.stack.length - 1];
  }

  isEmpty() {
    return !this.stack.length;
  }
}
