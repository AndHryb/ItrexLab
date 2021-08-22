export default class QueueService {
  constructor(storage) {
    this.queue = storage;
  }

  async get() {
    try {
      const result = await this.queue.get();
      return result;
    } catch (err) {
      console.log(`QueueServise get error : ${err.name} : ${err.message}`);
    }
  }

  async add(name) {
    try {
      const result = await this.queue.add(name);
      return result;
    } catch (err) {
      console.log(`QueueServise add error : ${err.name} : ${err.message}`);
    }
  }

  async delete() {
    try {
      return await this.queue.delete();
    } catch (err) {
      console.log(`QueueServise delete error : ${err.name} : ${err.message}`);
    }
  }

  async getLength() {
    try {
      return await this.queue.getLength();
    } catch (err) {
      console.log(`QueueServise getLength error : ${err.name} : ${err.message}`);
    }
  }
}
