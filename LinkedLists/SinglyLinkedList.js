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

//pop removes the last element from the list
const popExtension = () => ({
  pop() {
    //from the head traverse until tail reached then previousNode becomes the tail
    let previousNode = null;
    let currentNode = this.head;

    while (currentNode.next) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    //we are on the tail
    if (!currentNode.next) {
      this.tail = previousNode;
      previousNode.next = null; //remove pointer
      //reduce size
      this.size--;
    }
    return this.tail;
  },
});

//find(value) returns the index of the node containing value, or null if not found.
const findExtension = (value) => ({
  find(value) {
    let currentNode = this.head;
    let index = 0;
    //until tail
    while (currentNode.next && currentNode.value !== value) {
      currentNode = currentNode.next;
      index++;
    }

    if (currentNode.value === value) return index;
    return null; //we have reached the tail and its value is not equal
  },
});

//contains(value) returns true
//if the passed in value is in the list and otherwise returns false.
const containsExtension = (value) => ({
  contains(value) {
    const hasBeenFound = this.find(value); //or null or the index
    return hasBeenFound !== null; //not found false cause null === null; otherwise true
  },
});

//a way to make it open for changes but close for modification
const SinglyLinkedListMethods = [
  prependExtension,
  appendExtension,
  atExtension,
  popExtension,
  findExtension,
  containsExtension,
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
console.log(singlyLinkedList.at(1));
singlyLinkedList.append(20);
singlyLinkedList.append(25);
singlyLinkedList.pop();
console.log(singlyLinkedList.find(25));
console.log(singlyLinkedList.find(15));
console.log(singlyLinkedList.contains(25));
console.log(singlyLinkedList.contains(15));
