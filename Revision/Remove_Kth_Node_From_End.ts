// This is an input class. Do not edit.
export class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

export function removeKthNodeFromEnd(head: LinkedList, k: number) {
  // Write your code here.
  let firstPointer: LinkedList = head;
  let secondPointer: LinkedList | null = head;

  for (let i = 0; i < k; i++) {
    if (secondPointer !== null) {
      secondPointer = secondPointer!.next;
    }
  }

  if (secondPointer === null) {
    head.value = head.next!.value;
    head.next = head.next!.next;
    return;
  }

  while (secondPointer!.next !== null) {
    firstPointer = firstPointer.next!;
    secondPointer = secondPointer!.next;
  }

  firstPointer.next = firstPointer.next!.next;
}
