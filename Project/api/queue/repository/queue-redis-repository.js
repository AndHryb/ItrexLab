import { promisify } from 'util';

export default class QueueRedisRepository {
  constructor(redisClient) {
    this.client = redisClient;
  }

  async get(docId) {
    const listLength = await this.getLength(docId);
    if (listLength === 0) {
      return false;
    }
    const firstInQueue = promisify(this.client.lindex).bind(this.client);
    const result = await firstInQueue(docId, 0);
    console.log(result);
    return result;
  }

  async add(patientId, docId) {
    const addResult = promisify(this.client.rpush).bind(this.client);
    await addResult(docId, patientId);

    return patientId;
  }

  async delete(docId) {
    const listLength = await this.getLength(docId);
    if (listLength === 0) {
      return false;
    }
    const popResult = promisify(this.client.lpop).bind(this.client);
    const result = await popResult(docId);

    return result;
  }

  async getLength(docId) {
    const listLength = promisify(this.client.llen).bind(this.client);
    const result = await listLength(docId);

    return result;
  }
}
