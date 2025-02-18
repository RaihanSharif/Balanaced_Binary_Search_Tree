class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// TODO: remove duplicate values or check for duplicates before inserting
// new element
class Tree {
  root = null;

  constructor(arrIn) {
    this.arr = arrIn;
  }

  buildTree(arr) {
    if (root === null) {
      // create a new root
    }
  }

  #buildTreeHelper(arr, start, end) {
    if (start > end) {
      return null;
    }
  }

  // returns an array of unique sorted Integers
  #sortedSet(arr) {
    let unique = [...new Set(arr)];
    unique.sort((a, b) => parseInt(a) - parseInt(b));
    return unique;
  }

  insert(value) {}

  deleteItem(value) {}

  find(value) {}

  // TODO: Error if no callback function is supplied
  levelOrder(callback) {}

  // TODO: Error if no callback function is supplied
  inOrder(callback) {}

  // TODO: Error if no callback function is supplied
  preOrder(callback) {}

  // TODO: Error if no callback function is supplied
  postOrder(callback) {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
