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

const treeExtensions = [
  sortElementsExtension,
  buildTreeExtension,
  prettyPrintExtension,
  insertNodeExtension,
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
BST.prettyPrint(BST.root);
