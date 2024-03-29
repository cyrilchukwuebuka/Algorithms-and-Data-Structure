// Do not edit the class below except
// for the breadthFirstSearch method.
// Feel free to add new properties
// and methods to the class.
export class Node {
  name: string;
  children: Node[];

  constructor(name: string) {
    this.name = name;
    this.children = [];
  }

  addChild(name: string): Node {
    this.children.push(new Node(name));
    return this;
  }

  breadthFirstSearch(array: string[]) {
    // Write your code here.
    const queue: Node[] = [this];
    while (queue.length > 0) {
      const current = queue.shift()!;
      array.push(current.name);
      queue.push(...current.children);
    }
    return array;
  }
}
