class Queue {
  constructor() {
    this.queue = [];
  }

  get() {
    if (this.queue.length === 0) {
      return 'The queue is empty';
    }
    return this.queue[this.queue.length - 1];
  }

  add(name) {
    if (this.queue.indexOf(name) !== -1) {
      return 'the entered name is incorrect';
    }
    this.queue.unshift(name);
    return `${name} added to the queue`;
  }

  remove() {
    if (this.queue.length === 0) {
      return 'The queue is empty';
    }
    return this.queue.pop();
  }
}
const PatientQueue = new Queue();
export {PatientQueue };
