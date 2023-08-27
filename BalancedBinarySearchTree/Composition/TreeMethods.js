import { NodeBST } from "./Node.js";
import { sort } from "../../Utils/MergeSort.js";

const buildTreeExtension = () => ({
  treeCreation(array) {
    if (array.length === 0) return null;
    const middleIndex = Math.floor(array.length / 2);
    const treeRoot = NodeBST(array[middleIndex]);
    treeRoot.right = this.treeCreation(array.slice(middleIndex + 1));
    treeRoot.left = this.treeCreation(array.slice(0, middleIndex));
    return treeRoot;
  },
  buildTree(areElemenetsSorted = false) {
    this.elements = areElemenetsSorted ? this.inorder() : sort(this.elements);
    this.root = this.treeCreation(this.elements);
    return this.root;
  },
});

const prettyPrintExtension = () => ({
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
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

const levelOrderExtension = () => ({
  levelOrderIt() {
    const levelOrderArray = [];
    const queu = [];
    queu.push(this.root);
    while (queu.length > 0) {
      const currentEl = queu.shift();
      if (currentEl.left) queu.push(currentEl.left);
      if (currentEl.right) queu.push(currentEl.right);
      levelOrderArray.push(currentEl.data);
    }

    return levelOrderArray;
  },
});

const depthFirstTraversalExtension = () => ({
  inorder(node = this.root, inorderArray = []) {
    if (!node) return;
    this.inorder(node.left, inorderArray);
    inorderArray.push(node.data);
    this.inorder(node.right, inorderArray);
    return inorderArray;
  },
  preorder(node = this.root, preorderArray = []) {
    if (!node) return;
    preorderArray.push(node.data);
    this.preorder(node.left, preorderArray);
    this.preorder(node.right, preorderArray);
    return preorderArray;
  },
  postorder(node = this.root, postorderArray = []) {
    if (!node) return;
    this.preorder(node.left, postorderArray);
    this.preorder(node.right, postorderArray);
    postorderArray.push(node.data);
    return postorderArray;
  },
});

const depthExtension = () => ({
  //number of edges between root node and node
  findDepth(node, currentNode = this.root, depth = 0) {
    if (node === null || currentNode === null) return;
    if (node.data === currentNode.data) return depth;
    else if (node.data < currentNode.data)
      return this.findDepth(
        node,
        (currentNode = currentNode.left),
        (depth += 1)
      );
    else if (node.data > currentNode.data)
      return this.findDepth(
        node,
        (currentNode = currentNode.right),
        (depth += 1)
      );
  },
});

const heightExtension = () => ({
  //number of edges between node and leaf node
  findHeight(node) {
    if (!node) return -1;
    const rightHeight = this.findHeight(node.right);
    const leftHeight = this.findHeight(node.left);
    return Math.max(leftHeight, rightHeight) + 1;
  },
});

const balanceExtension = () => ({
  isBalanced(rootNode = this.root) {
    if (rootNode === null) return -1;
    const leftHeight = this.isBalanced(rootNode.left);
    const rightHeight = this.isBalanced(rootNode.right);
    return Math.abs(leftHeight - rightHeight) <= 1;
  },
  rebalance() {
    return this.buildTree(true);
  },
});

export const treeExtensions = [
  buildTreeExtension,
  prettyPrintExtension,
  insertNodeExtension,
  deleteNodeExtension,
  findNodeExtension,
  levelOrderExtension,
  depthFirstTraversalExtension,
  depthExtension,
  heightExtension,
  balanceExtension,
];
