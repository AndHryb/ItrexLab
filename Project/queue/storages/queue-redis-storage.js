import redis from 'redis';
import { promisify } from 'util';
import { envConfig } from '../../config.js';

const client = redis.createClient(envConfig.storage.port);

client.on('connect', () => {
  console.log('queue redis storage connected!');
});
client.on('error', (error) => {
  console.error(error);
});

client.select(0);
client.flushdb();

class QueueRedisStorage {
  async get() {
    const listLength = await this.getLength();
    if (listLength === 0) {
      return false;
    }
    const firstInQueue = promisify(client.lindex).bind(client);
    const result = await firstInQueue('queue', 0);

    return result;
  }

  async add(name) {
    const addResult = promisify(client.rpush).bind(client);
    await addResult('queue', name);

    return name;
  }

  async delete() {
    const listLength = await this.getLength();
    if (listLength === 0) {
      return false;
    }
    const popResult = promisify(client.rpop).bind(client);
    const result = await popResult('queue');

    return result;
  }

  async getLength() {
    const listLength = promisify(client.llen).bind(client);
    const result = await listLength('queue');

    return result;
  }
}
const queueRedisStorage = new QueueRedisStorage();

export {queueRedisStorage};
