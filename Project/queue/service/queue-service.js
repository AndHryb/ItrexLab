class QueueService {
  constructor() {
    this.queue = [];
  }

  get() {
    if (this.queue.length === 0) {
      return false;
    }
    return this.queue[this.queue.length - 1];
  }

  add(name) {
    if (this.queue.indexOf(name) !== -1) {
      return false;
    }
    this.queue.unshift(name);
    return true;
  }

  remove() {
    if (this.queue.length === 0) {
      return 'The queue is empty';
    }
    return this.queue.pop();
  }
}
const PatientQueue = new QueueService();
export { PatientQueue };
