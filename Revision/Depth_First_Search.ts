// Do not edit the class below except
// for the depthFirstSearch method.
// Feel free to add new properties
// and methods to the class.
export class Node {
  name: string;
  children: Node[];

  constructor(name: string) {
    this.name = name;
    this.children = [];
  }

  addChild(name: string) {
    this.children.push(new Node(name));
    return this;
  }

  depthFirstSearch(array: string[]) {
    // Write your code here.
    this.depthSearch(array, this);
    return array;
  }

  depthSearch(array: string[], node: Node) {
    array.push(node.name);
    for (let idx = 0; idx < node.children.length; idx++) {
      const currentChildNode: Node = node.children[idx];
      this.depthSearch(array, currentChildNode);
    }
  }
}
