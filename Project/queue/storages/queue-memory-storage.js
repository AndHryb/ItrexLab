class QueueMemoryStorage {
  constructor() {
    this.queue = [];
  }

  get() {
    if (this.queue.length === 0) {
      return false;
    }
    return this.queue[0];
  }

  add(name) {
    this.queue.push(name);
    return this.queue[this.queue.length - 1];
  }

  delete() {
    if (this.queue.length === 0) {
      return false;
    }
    return this.queue.shift();
  }

  getLength() {
    return this.queue.length;
  }
}
const queueMemoryStorage = new QueueMemoryStorage();
export { queueMemoryStorage };
