import { treeExtensions } from "./TreeMethods.js";

const extensionsPrototype = () => {
  const proto = {};
  for (const extension of treeExtensions) {
    Object.assign(proto, extension());
  }
  return proto;
};

const BalanceBinarySearchTree = (array) => {
  const basicData = {
    elements: [...new Set(array)],
    root: null,
  };
  const extensions = extensionsPrototype();
  return Object.assign(Object.create(extensions), basicData);
};

const BST = BalanceBinarySearchTree([200, 10, 150, 30, 300, 10, 20, 100]);
BST.prettyPrint(BST.buildTree());
