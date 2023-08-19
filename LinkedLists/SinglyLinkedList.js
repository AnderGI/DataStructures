import { SinglyLinkedListMethods } from "./SinglyLinkedListMethods.js";

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
