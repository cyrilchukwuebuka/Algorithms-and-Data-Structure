export function sortStack(stack: number[], top = 0) {
  // Write your code here.
  if (stack.length === 0) return stack;

  sort(stack);

  return stack;
}

const sort = (stack: number[]) => {
  if (stack.length === 0) return;

  let top = stack.pop() as number;
  sort(stack);

  insert(stack, top);
};

const insert = (stack: number[], top: number) => {
  if (stack.length === 0) {
    stack.push(top);
    return;
  }

  let tempValue = 0;
  if (stack[stack.length - 1] > top) {
    tempValue = stack.pop() as number;
    insert(stack, top);
    stack.push(tempValue);
    return;
  }

  stack.push(top);
};
