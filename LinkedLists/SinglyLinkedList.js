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

//a way to make it open for changes but close for modification
const SinglyLinkedListMethods = [prependExtension, appendExtension];

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
