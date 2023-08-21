import { NodeBST } from "./Node.js";

const sortElementsExtension = () => ({
  sortElements(array) {
    if (array.length === 1) return array;
    const middleIndex = Math.floor(array.length / 2);
    const rightArray = array.splice(middleIndex);
    const leftArray = array;
    return this.order(
      this.sortElements(leftArray),
      this.sortElements(rightArray)
    );
  },
  order(leftArray, rightArray) {
    const sortedElements = [];
    while (leftArray.length && rightArray.length) {
      if (leftArray[0] > rightArray[0]) {
        sortedElements.push(rightArray.shift());
      } else if (leftArray[0] < rightArray[0]) {
        sortedElements.push(leftArray.shift());
      }
    }
    return [...sortedElements, ...leftArray, ...rightArray];
  },
});

const buildTreeExtension = () => ({
  treeCreation(array) {
    if (array.length === 0) return null;
    const middleIndex = Math.floor(array.length / 2);
    const treeRoot = NodeBST(array[middleIndex]);
    treeRoot.right = this.treeCreation(array.slice(middleIndex + 1));
    treeRoot.left = this.treeCreation(array.slice(0, middleIndex));
    return treeRoot;
  },
  buildTree() {
    this.elements = this.sortElements(this.elements);
    this.root = this.treeCreation(this.elements);
  },
});

const prettyPrintExtension = () => ({
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  },
});

const insertNodeExtension = () => ({
  insert(node, currentNode = this.root) {
    if (!currentNode) return null;
    if (node.data > currentNode.data) {
      if (!currentNode.right) {
        currentNode.right = node;
        return node;
      }
      this.insert(node, currentNode.right);
    } else if (node.data < currentNode.data) {
      if (!currentNode.left) {
        currentNode.left = node;
        return node;
      }
      this.insert(node, currentNode.left);
    }
  },
});

const deleteNodeExtension = () => ({
  delete(value, node = this.root) {
    //SEARCH FOR CORRESPONDING NODE
    if (value > node.data) node.right = this.delete(value, node.right);
    else if (value < node.data) node.left = this.delete(value, node.left);
    else {
      //LOOK FOR HOW MANY LEAF NODES IT HAS
      //NO LEAF NODES
      if (node.left !== null && node.right !== null) {
        let previousNode;
        let currentNode = node.right;
        while (currentNode.left) {
          previousNode = currentNode;
          currentNode = currentNode.left;
        }
        previousNode.left = null;
        node.data = currentNode.data;
      } else if (node.left !== null || node.right !== null) {
        //ONE LEAF NODE
        if (node.left !== null && node.right === null) {
          //LEAFT LEAF NODE YES RIGHT ONE NO
          node = node.left;
          node.left = null;
        } else if (node.left === null && node.right !== null) {
          //RIGHT LEAF NODE YES LEFT ONE NO
          node = node.right;
          node.right = null;
        }
      } else if (node.left === null && node.right === null) {
        node = null;
      }
    }
    return node;
  },
});

const findNodeExtension = () => ({
  //Write a find function which accepts a value and returns the node with the given value.
  find(value = 7, currentNode = this.root) {
    if (!currentNode) return null;
    else if (value === currentNode.data) return currentNode;
    else if (value > currentNode.data)
      return this.find(value, (currentNode = currentNode.right));
    else if (value < currentNode.data)
      return this.find(value, (currentNode = currentNode.left));
  },
});

const treeExtensions = [
  sortElementsExtension,
  buildTreeExtension,
  prettyPrintExtension,
  insertNodeExtension,
  deleteNodeExtension,
  findNodeExtension,
];

const extensionsPrototype = () => {
  const proto = {};
  for (const extension of treeExtensions) {
    Object.assign(proto, extension());
  }
  return proto;
};

const BalanceBinarySearchTree = (array) => {
  const basicData = {
    elements: array,
    root: null,
  };
  const extensions = extensionsPrototype();
  return Object.assign(Object.create(extensions), basicData);
};

const BST = BalanceBinarySearchTree([3, 5, 2, 12, 56, 43, 1, 7, 6, 23]);
BST.buildTree();
BST.insert(NodeBST(25));
BST.insert(NodeBST(32));
BST.insert(NodeBST(47));
BST.prettyPrint(BST.root);

BST.delete(43);
console.log("");
console.log("43 DELETED TWO LEAF NODES");
BST.prettyPrint(BST.root);
console.log(BST.find());
console.log(BST.find(25));
