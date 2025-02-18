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
      sortedUniqueArr.length - 1
    );
    return this.root; // TODO: need to return something?
  }

  insert(value) {
    const newNode = new Node(value);

    let currNode = this.root;

    while (true) {
      console.log("current data not null");
      if (value === currNode.data) {
        break;
      }
      if (newNode.data < currNode.data) {
        if (currNode.left !== null) {
          currNode = currNode.left;
        } else {
          currNode.left = newNode;
          return currNode.left;
        }
      } else if (newNode.data > currNode.data) {
        if (currNode.right !== null) {
          currNode = currNode.right;
        } else {
          currNode.right = newNode;
          return currNode.right;
        }
      }
    }
  }

  #getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }
  deleteItem(value) {
    // deleting a node
    // replace node value with the
  }

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

let tr1 = new Tree([1, 3, 5, 8, 9, 10, 12, 13, 15]);
let tr2 = new Tree([1, 2, 3, 4, 5, 6, 9, 10, 11, 12]);
