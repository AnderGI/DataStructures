import { NodeClass } from "../Node";
class LinkedList {
  constructor() {
    (this.head = null), (this.tail = null), (this.size = 0);
  }

  //prepend(value) adds a new node containing value to the start of the list
  prepend(value) {
    const newNode = new NodeClass(value);
    if (!this.head) {
      //No head
      this.head = newNode;
      return this.head;
    }

    //Head exists
    const previousHead = this.head;
    this.head = newNode;
    newNode.next = previousHead;
    return this.head;
  }

  //append(value) adds a new node containing value to the end of the list
  append(value) {
    const newNode = new NodeClass(value);
    //No tail
    if (!this.tail) {
      this.tail = newNode;
      return this.tail;
    }
    //Tail exists
    this.tail.next = newNode;
    this.tail = newNode;
    return this.tail;
  }
  //at(index) returns the node at the given index
  at(index) {
    if (!this.head) return null;
    let currentIndex = 0;
    let currentNode = this.head;
    while (currentNode !== null && index !== currentIndex) {
      currentNode = currentNode.next;
      currentIndex++;
    }
    if (currentNode !== null) {
      return currentNode;
    }
    return null;
  }
  //pop removes the last element from the list
  pop() {
    let currentNode = this.head;
    //until current node is the previous to the tail
    while (currentNode.next !== this.tail) {
      currentNode = currentNode.next;
    }
    //we have reached the tail previous to the tail
    currentNode.next = null;
    this.tail = currentNode;
    return this.tail;
  }
  //find(value) returns the index of the node containing value, or null if not found.
  find(value) {
    let currentNode = this.head;
    let currentIndex = 0;
    while (currentNode !== null && currentNode.value !== value) {
      currentNode = currentNode.next;
      currentIndex++;
    }

    if (currentNode === null) {
      return null;
    }
    return currentIndex;
  }
  //contains(value) returns true if the passed
  //in value is in the list and otherwise returns false.
  contains(value) {
    return this.find(value) === null ? false : true;
  }

  //toString represents your LinkedList objects as strings,
  //so you can print them out and preview them in the console.
  //The format should be: ( value ) -> ( value ) -> ( value ) -> null
  toString() {
    let message = "";
    let currentNode = this.head;
    while (currentNode !== null) {
      message += `( ${currentNode.value} ) -> `;
    }
    message += "null";
    return message;
  }

  //insertAt(value, index)
  //that inserts a new node with the provided value at the given index.
  insertAt(value, index) {
    let previousNode = null;
    let currentNode = this.head;
    let pointer = 0;
    while (currentNode !== null && pointer < index) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      pointer++;
    }

    if (currentNode === null) {
      return null;
    }

    const toInsertNode = new NodeClass(value);
    previousNode.next = toInsertNode;
    toInsertNode.next = currentNode;
    return toInsertNode;
  }

  //removeAt(index) that removes the node at the given index.
  removeAt(index) {
    let pointer = 0;
    let previousNode = null;
    let currentNode = this.head;
    while (currentNode !== null && pointer < index) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      pointer++;
    }
    if (currentNode !== null) return null;
    previousNode.next = currentNode.next;
    return previousNode;
  }
}
