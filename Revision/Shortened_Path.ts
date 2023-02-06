export function shortenPath(path: string) {
  // Write your code here.
  let filteredPath: string[] = path.split("/").filter((string) => {
    if (string === "" || string === ".") {
      return false;
    } else {
      return true;
    }
  });

  const stack = new Stack();
  const isAbsolutePath = path[0] === "/";

  for (let string of filteredPath) {
    if (!isAbsolutePath) {
      if (string === "..") {
        if (stack.isEmpty() || stack.peek() === "..") {
          stack.push(string);
        } else {
          stack.pop();
        }
        continue;
      }
      stack.push(string);
    } else {
      if (string === "..") {
        stack.pop();
        continue;
      }
      stack.push(string);
    }
  }

  filteredPath = [];
  if (stack.isEmpty()) return "/";

  while (!stack.isEmpty()) {
    filteredPath.push(stack.pop()!);
    filteredPath.push("/");
  }

  if (!isAbsolutePath) filteredPath.pop();

  return filteredPath.reverse().join("");
}

class Stack {
  private stack: string[];

  constructor() {
    this.stack = [];
  }

  getStack() {
    return this.stack;
  }

  pop() {
    return this.stack.pop();
  }

  push(value: string) {
    return this.stack.push(value);
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  isEmpty() {
    return !this.stack.length;
  }
}
