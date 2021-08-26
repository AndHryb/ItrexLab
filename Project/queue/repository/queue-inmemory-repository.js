class QueueInmemoryRepository {
  constructor() {
    this.queue = [];
  }

  get() {
    if (this.queue.length === 0) {
      return false;
    }
    return this.queue[0];
  }

  add(patientId) {
    this.queue.push(patientId);
    return this.queue[this.queue.length - 1];
  }

  delete() {
    if (this.queue.length === 0) {
      return false;
    }
    return this.queue.shift(); // Во всех сервисах необходимо возратить!!!
  }

  getLength() {
    return this.queue.length;
  }
}
const queueInmemoryRepository = new QueueInmemoryRepository();
export { queueInmemoryRepository };
