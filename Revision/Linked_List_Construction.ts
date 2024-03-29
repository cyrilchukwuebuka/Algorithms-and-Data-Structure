// This is an input class. Do not edit.
export class Node {
  value: number;
  prev: Node | null;
  next: Node | null;

  constructor(value: number) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// Feel free to add new properties and methods to the class.
export class DoublyLinkedList {
  head: Node | null;
  tail: Node | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  setHead(node: Node) {
    // Write your code here.
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.insertBefore(this.head, node);
  }

  setTail(node: Node) {
    // Write your code here.
    if (this.tail === null) {
      this.setHead(node);
      return;
    }

    this.insertAfter(this.tail, node);
  }

  insertBefore(node: Node, nodeToInsert: Node) {
    // Write your code here.
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    this.remove(nodeToInsert);
    nodeToInsert.next = node;
    nodeToInsert.prev = node.prev;
    if (node.prev === null) {
      this.head = nodeToInsert;
    } else {
      node.prev.next = nodeToInsert;
    }
    node.prev = nodeToInsert;
  }

  insertAfter(node: Node, nodeToInsert: Node) {
    // Write your code here.
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    this.remove(nodeToInsert);
    nodeToInsert.next = node.next;
    nodeToInsert.prev = node;
    if (node.next === null) {
      this.tail = nodeToInsert;
    } else {
      node.next.prev = nodeToInsert;
    }
    node.next = nodeToInsert;
  }

  insertAtPosition(position: number, nodeToInsert: Node) {
    // Write your code here.
    if (position === 1) {
      this.setHead(nodeToInsert);
      return;
    }

    let node = this.head;
    let currentPosition = 1;
    while (node !== null && currentPosition++ !== position) node = node.next;
    if (node !== null) {
      this.insertBefore(node, nodeToInsert);
    } else {
      this.setTail(nodeToInsert);
    }
  }

  removeNodesWithValue(value: number) {
    // Write your code here.
    let node = this.head;
    while (node !== null) {
      const nodeToRemove = node;
      node = node.next;
      if (nodeToRemove !== null && nodeToRemove.value === value)
        this.remove(nodeToRemove);
    }
  }

  remove(node: Node) {
    // Write your code here.
    if (node === this.head) this.head = this.head.next;
    if (node === this.tail) this.tail = this.tail.prev;
    this.removeNodeBinding(node);
  }

  containsNodeWithValue(value: number) {
    // Write your code here.
    let node = this.head;
    while (node !== null && node.value !== value) node = node.next;
    return node !== null;
  }

  removeNodeBinding(node: Node) {
    if (node.next !== null) node.next.prev = node.prev;
    if (node.prev !== null) node.prev.next = node.next;
    node.next = null;
    node.prev = null;
  }
}
