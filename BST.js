class Node {
  constructor(data, par = null) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = par;
  }
}

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
  #buildTreeRecur(arr, start, end, par) {
    if (start > end) {
      return null;
    }
    const mid = start + Math.floor((end - start) / 2);

    // make a new root out of the middle element of array
    const newRoot = new Node(arr[mid], par);

    // build left and right subtree recursively
    newRoot.left = this.#buildTreeRecur(arr, start, mid - 1, newRoot);
    newRoot.right = this.#buildTreeRecur(arr, mid + 1, end, newRoot);
    return newRoot;
  }

  // builds an entirely new tree and replaces root attribute value
  // with result
  buildTree(arr) {
    let sortedUniqueArr = this.#sortedSet(arr);
    this.root = this.#buildTreeRecur(
      sortedUniqueArr,
      0,
      sortedUniqueArr.length - 1,
      null
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

  isLeaf(n) {
    if (n === null) return null;
    if (n.left === null && n.right === null) {
      return true;
    } else {
      return false;
    }
  }

  #isSingleChildNode(n) {
    if (n === null) return null;

    if (
      (n.left === null && n.right !== null) ||
      (n.left !== null && n.right === null)
    ) {
      return true;
    }
    return false;
  }
  // takes a node with a single child only, and deletes it from the tree
  #delOneChildNode(node) {
    let par = node.parent;
    let child = null;

    if (node.left === null) {
      child = node.right;
    } else {
      child = node.left;
    }

    child.parent = node.parent;

    // check if the node to delete is a left or child
    if (node.parent.left == node) {
      node.parent.left = child;
    } else {
      node.parent.right = child;
    }
    return node.data;
  }

  // check in the main delete method that this is a double node

  #isDoubleNode(node) {
    return (node.left !== null) & (node.right !== null);
  }
  getLeftMost(node) {
    if (node.left === null) return node;
    if (node.left !== null) return this.getLeftMost(node.left);
  }

  #delDoubleNode(node) {
    const repalcement = this.getLeftMost(node.right);
    console.log(`this node replaces the target to be delete: `, repalcement);
    let tempData = repalcement.data;
    this.deleteItem(repalcement.data);
    node.data = tempData;
  }

  deleteItem(value) {
    const item = this.find(value);

    if (item === null) {
      return null;
    }

    if (this.isLeaf(item)) {
      const par = item.parent;
      if (item === par.left) {
        par.left = null;
        return item.data;
      }
      if (item === par.right) {
        par.right = null;
        return item.data;
      }
    } else if (this.#isSingleChildNode(item)) {
      this.#delOneChildNode(item);
    } else if (this.#isDoubleNode(item)) {
      this.#delDoubleNode(item);
    }
  }

  #recursiveSearch(node, value) {
    if (node === null) {
      return null;
    }
    if (value < node.data) {
      return this.#recursiveSearch(node.left, value);
    }
    if (value > node.data) {
      return this.#recursiveSearch(node.right, value);
    }
    if (node.data === value) {
      return node;
    }
  }

  find(value) {
    return this.#recursiveSearch(this.root, value);
  }

  levelOrder(callback, root = this.root) {
    if (root === null) return null;
    if (callback === null) throw new Error("callback not provided");

    const queue = []; // stores the values of the traversal
    queue.push(root);
    while (queue.length !== 0) {
      let current = queue[0];
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
      callback(current.data);
      queue.splice(0, 1);
    }
  }

  // in order traversal gives you a sorted list
  inOrder(callback, root = this.root) {
    if (root === null) return null;
    if (callback === null) throw new Error("callback no provided");

    this.inOrder(callback, root.left);
    callback(root.data);
    this.inOrder(callback, root.right);
  }

  // TODO: Error if no callback function is supplied
  preOrder(callback, root = this.root) {
    if (root === null) return null;
    if (callback === null) return new Error("callback not provided");

    callback(root.data);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  // TODO: Error if no callback function is supplied
  postOrder(callback, root = this.root) {
    if (root === null) return null;
    if (callback === null) return new Error("callback not provided");
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root.data);
  }

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

let tr1 = new Tree([2, 3, 4, 5, 8, 9, 10, 12, 13, 15, 17, 20, 25]);
let tr2 = new Tree([1, 2, 3, 4, 5, 6, 9, 10, 11, 12]);

// prettyPrint(tr1.root);
// console.log(
//   "-----------------------------------------------------------------"
// );
// tr1.deleteItem(1);
// prettyPrint(tr1.root);
// console.log(
//   "-----------------------------------------------------------------"
// );
// tr1.deleteItem(15);
// prettyPrint(tr1.root);
// console.log(
//   "-----------------------------------------------------------------"
// );
// tr1.deleteItem(5);
// prettyPrint(tr1.root);
// console.log(
//   "-----------------------------------------------------------------"
// );

// tr1.deleteItem(13);
// prettyPrint(tr1.root);
// console.log(
//   "-----------------------------------------------------------------"
// );

// tr1.deleteItem(12);
// prettyPrint(tr1.root);
// console.log(
//   "-----------------------------------------------------------------"
// );

// // doesn't insert duplicates
// tr1.insert(3);
// prettyPrint(tr1.root);
// console.log(
//   "-----------------------------------------------------------------"
// );

// tr1.insert(5);
// prettyPrint(tr1.root);
// console.log(
//   "-----------------------------------------------------------------"
// );
prettyPrint(tr1.root);

// tr1.deleteItem(3);
// prettyPrint(tr1.root);
// console.log("_______________________________________");
// tr1.deleteItem(10);
// prettyPrint(tr1.root);
// console.log("_______________________________________");
// tr1.deleteItem(12);
// prettyPrint(tr1.root);

tr1.deleteItem(4);
prettyPrint(tr1.root);
console.log(`level order`);
tr1.levelOrder(console.log);
console.log(`inOrder`);
tr1.inOrder(console.log);
console.log(`preOrder`);
tr1.preOrder(console.log);
console.log(`postOrder`);
tr1.postOrder(console.log);
