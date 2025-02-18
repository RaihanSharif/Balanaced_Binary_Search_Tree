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
    this.buildTree(arrIn);
  }

  // returns an array of unique sorted Integers
  #sortedSet(arr) {
    let unique = [...new Set(arr)];
    unique.sort((a, b) => parseInt(a) - parseInt(b));
    return unique;
  }

  // takes a sorted, unique array, builds a balanced binary tree
  // returns root node of tree
  #buildTreeRecur(arr, start, end) {
    if (start > end) {
      return null;
    }
    const mid = start + Math.floor((end - start) / 2);

    // make a new root out of the middle element of array
    const newRoot = new Node(arr[mid]);

    // build left and right subtree recursively
    newRoot.left = this.#buildTreeRecur(arr, start, mid - 1);
    newRoot.right = this.#buildTreeRecur(arr, mid + 1, end);
    return newRoot;
  }

  // builds an entirely new tree and replaces root attribute value
  // with result
  buildTree(arr) {
    let sortedUniqueArr = this.#sortedSet(arr);
    this.root = this.#buildTreeRecur(
      sortedUniqueArr,
      0,
      sortedUniqueArr.length
    );
    return this.root; // TODO: need to return something?
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
