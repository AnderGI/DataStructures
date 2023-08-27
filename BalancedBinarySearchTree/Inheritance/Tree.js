import { sort } from "../../Utils/MergeSort.js";
import { Node } from "./Node.js";
const array = [3, 1, 4, 67, 54, 32, 7, 5, 89, 2, 21, 34];
export class BST {
  constructor(elements) {
    this.elements = sort([...new Set(elements)]);
    this.root = this.buildTree();
  }
  buildTree(array = this.elements) {
    if (array.length === 0) return null;
    const middleIndex = Math.floor(array.length / 2);
    const rootNode = new Node(array[middleIndex]);
    const leftArray = array.slice(0, middleIndex);
    const rightArray = array.slice(middleIndex + 1);
    rootNode.right = this.buildTree(rightArray);
    rootNode.left = this.buildTree(leftArray);
    return rootNode;
  }
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
  }
  /**
   *
   * @param {*} nodeValue Value to add
   * @param {*} currentNode The node to compare
   * @returns the root node with the new value added.
   * The function compares the value of the root node with the value to
   * insert. Once the rootNode is null we are on a leaf node it creates
   * a new node with that value and inserts that node at that position
   */
  insert(nodeValue, currentNode = this.root) {
    if (!currentNode) return new Node(nodeValue);
    else if (currentNode.data > nodeValue)
      currentNode.left = this.insert(nodeValue, currentNode.left);
    else if (currentNode.data < nodeValue)
      currentNode.right = this.insert(nodeValue, currentNode.right);

    return currentNode;
  }
  delete(nodeValue, currentNode = this.root) {
    //Find node to delete by comparing values
    if (nodeValue > currentNode.data) {
      currentNode.right = this.delete(nodeValue, currentNode.right);
    } else if (nodeValue < currentNode.data) {
      currentNode.left = this.delete(nodeValue, currentNode.left);
    } else if (nodeValue === currentNode.data) {
      //It it has two leaf nodes
      if (currentNode.left !== null && currentNode.right !== null) {
        //Find the minimum node that is higher than the current node
        //Go to the right once then left until null
        let previousNode = null;
        let smallestHigherNode = currentNode.right;
        while (smallestHigherNode.left !== null) {
          //node to remove the smallestHighestNode
          if (smallestHigherNode.left.left === null)
            previousNode = smallestHigherNode;
          smallestHigherNode = smallestHigherNode.left;
        }
        //we are in the minimum
        currentNode.data = smallestHigherNode.data;
        previousNode.left = null;
      }
      //If it has one leaf node
      else if (currentNode.left !== null && currentNode.right === null) {
        const leftChildNode = currentNode.left;
        currentNode = leftChildNode;
      } else if (currentNode.left === null && currentNode.right !== null) {
        const rightChildNode = currentNode.right;
        currentNode = rightChildNode;
      }
      //Delete when it has no leaf nodes
      else if (!currentNode.left && !currentNode.right) {
        currentNode = null;
      }
    }
    return currentNode;
  }
  find(value, currentNode = this.root) {
    if (!value || !currentNode) return null;
    else if (value === currentNode.data) return currentNode;
    else if (value > currentNode.data)
      return this.find(value, currentNode.right);
    else if (value < currentNode.data)
      return this.find(value, currentNode.left);
  }
  levelOrder() {
    const levelOrder = [];
    const queu = [];
    let currentNode = this.root;
    queu.push(currentNode);
    while (queu.length) {
      const node = queu.shift();
      if (node.left) queu.push(node.left);
      if (node.right) queu.push(node.right);
      levelOrder.push(node.data);
    }
    return levelOrder;
  }
  inorder(currentNode = this.root, inorderArray = []) {
    if (!currentNode) return null;
    this.inorder(currentNode.left, inorderArray);
    inorderArray.push(currentNode.data);
    this.inorder(currentNode.right, inorderArray);
    return inorderArray;
  }
  preorder(currentNode = this.root, preorderArray = []) {
    if (!currentNode) return null;
    preorderArray.push(currentNode.data);
    this.preorder(currentNode.left, preorderArray);
    this.preorder(currentNode.right, preorderArray);
    return preorderArray;
  }
  postorder(currentNode = this.root, postorderArray = []) {
    if (!currentNode) return null;
    this.postorder(currentNode.left, postorderArray);
    this.postorder(currentNode.right, postorderArray);
    postorderArray.push(currentNode.data);
    return postorderArray;
  }
  height(node) {
    //Maximum number of edges between node and leaf node
    //if node is leaf node height of zero thereby if node is null -1
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(node = this.root) {
    //maximum number of edges between root node and node
    let numberOfEdges = 0;
    let currentNode = this.root;
    while (node.data !== currentNode.data) {
      if (node.data > currentNode.data) {
        currentNode = currentNode.right;
      } else if (node.data < currentNode.data) {
        currentNode = currentNode.left;
      }
      numberOfEdges++;
    }
    return numberOfEdges;
  }
  isBalanced() {
    const leftSubtreeHeigh = this.height(this.root.left);
    const rightSubtreeHeigh = this.height(this.root.right);
    return Math.abs(leftSubtreeHeigh - rightSubtreeHeigh) <= 1;
  }
  rebalance() {
    //INORDER keeps the elements ordered by their value
    //since we traverse first to the lowest one, then save its value,
    //and then to the following highest number
    this.elements = this.inorder();
    this.root = this.buildTree();
  }
}

const bst = new BST(array);
bst.prettyPrint();
console.log(bst.depth(bst.find(34)));
console.log(bst.height(bst.find(34)));
