export const NodeFactory = (value = null) => ({
  value,
  next: null,
});

export class NodeClass {
  constructor(value = null) {
    (this.value = value), (this.next = null);
  }
}
