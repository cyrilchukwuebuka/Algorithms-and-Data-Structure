// This is an input class. Do not edit.
export class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

export function mergeLinkedLists(headOne: LinkedList, headTwo: LinkedList) {
  // Write your code here.
  let first: LinkedList | null = headOne;
  let pointer: LinkedList | null = null;
  let second: LinkedList | null = headTwo;

  while (first !== null && second !== null) {
    if (first.value < second.value) {
      pointer = first;
      first = first.next;
    } else {
      if (pointer !== null) pointer.next = second;
      pointer = second;
      second = second.next;
      pointer.next = first;
    }
  }
  if (first === null) pointer!.next = second;

  return headOne.value < headTwo.value ? headOne : headTwo;
}

////////// OR ////////////

// // This is an input class. Do not edit.
// export class LinkedList {
//   value: number;
//   next: LinkedList | null;

//   constructor(value: number) {
//     this.value = value;
//     this.next = null;
//   }
// }

// export function mergeLinkedLists(headOne: LinkedList, headTwo: LinkedList) {
//   // Write your code here.
//   recursiveMerge(headOne, headTwo, null);
//   return headOne.value < headTwo.value ? headOne : headTwo;
// }

// const recursiveMerge = (first: LinkedList | null, second: LinkedList | null, pointer: LinkedList | null) => {
//   if (first === null) {
//     pointer!.next = second;
//     return;
//   }
//   if (second === null) return;

//   if (first.value < second.value) {
//     recursiveMerge(first.next, second, first)
//   } else {
//     if (pointer !== null) pointer.next = second
//     const newNode = second.next;
//     second.next = first
//     recursiveMerge(first, newNode, second)
//   }
// }


