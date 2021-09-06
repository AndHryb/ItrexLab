import { promisify } from 'util';

export default class QueueRedisRepository {
  constructor(redisClient) {
    this.client = redisClient;
  }

  async get() {
    const listLength = await this.getLength();
    if (listLength === 0) {
      return false;
    }
    const firstInQueue = promisify(this.client.lindex).bind(this.client);
    const result = await firstInQueue('queue', 0);
    return result;
  }

  async add(patientId) {
    const addResult = promisify(this.client.rpush).bind(this.client);
    await addResult('queue', patientId);

    return patientId;
  }

  async delete() {
    const listLength = await this.getLength();
    if (listLength === 0) {
      return false;
    }
    const popResult = promisify(this.client.lpop).bind(this.client);
    const result = await popResult('queue');

    return result;
  }

  async getLength() {
    const listLength = promisify(this.client.llen).bind(this.client);
    const result = await listLength('queue');

    return result;
  }
}
