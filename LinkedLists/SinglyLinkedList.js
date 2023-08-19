import { NodeFactory } from "./Node.js";
//append(value) adds a new node containing value to the end of the list
const appendExtension = (value) => ({
  append(value) {
    if (!this.head) {
      return this.prepend(value); //if there is no head add one
    }

    //once there is at least one head there'll be one tail
    const previousTail = this.tail;
    const newTail = NodeFactory(value);
    previousTail.next = newTail;
    this.tail = newTail;
    this.size++;
    return this.tail;
  },
});

//prepend(value) adds a new node containing value to the start of the list
const prependExtension = (value) => ({
  prepend(value) {
    if (!this.head) {
      const node = NodeFactory(value);
      this.head = node;
      this.tail = node;
      this.size++;
      return this.head; //don do anything else
    }

    const newHead = NodeFactory(value);
    const previousHead = this.head;
    newHead.next = previousHead;
    this.head = newHead;
    this.tail = previousHead;
    this.size++;
    return this.head;
  },
});

//at(index) returns the node at the given index
const atExtension = (index) => ({
  at(index) {
    if (index < 0) return null; //check for possible index
    //from the head traverse until tail
    //or until the number of iterations is lower than the index given
    let currentNode = this.head;
    let iterations = 0;
    while (currentNode.next && iterations < index) {
      currentNode = currentNode.next;
      iterations++;
    }

    if (iterations == index) return currentNode;
    //if not the while loop has ended cause we have reached the tail
    //currentNode.next === null
    return null;
  },
});

//a way to make it open for changes but close for modification
const SinglyLinkedListMethods = [
  prependExtension,
  appendExtension,
  atExtension,
];

const SinglyLinkedListProto = () => {
  const proto = {};
  for (const extension of SinglyLinkedListMethods) {
    Object.assign(proto, extension());
  }

  return proto;
};

const SinglyLinkedList = () => {
  const basicInfo = {
    head: null,
    tail: null,
    size: 0,
  };

  const extensionComposite = SinglyLinkedListProto();

  return Object.assign(Object.create(extensionComposite), basicInfo);
};

const singlyLinkedList = SinglyLinkedList();
singlyLinkedList.prepend(5); // add to the beginning
singlyLinkedList.prepend(10); // add to the beginning
singlyLinkedList.append(15); // add to the end
console.log(singlyLinkedList);
console.log(singlyLinkedList.at(1));
