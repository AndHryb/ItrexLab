import redis from 'redis';
import { promisify } from 'util';
import { envConfig } from '../../config.js';

const client = redis.createClient(envConfig.storage.port);

client.on('connect', () => {
  console.log('resolution redis storage connected!');
});
client.on('error', (error) => {
  console.error(error);
});

client.select(0);
client.flushdb();

class ResolutionRedisStorage {
  constructor() {
    this.DS = 'redisResolution';
  }

  async add(key, val) {
    const uniqCheck = promisify(client.hexists).bind(client);
    const uniqResult = await uniqCheck(this.DS, key);
    if (uniqResult) {
      return 'We can\'t add a duplicate value';
    }
    const addValue = promisify(client.hset).bind(client);

    const patientData = {
      name: key,
      resolution: val,
      regTime: (new Date()).getTime(),
    };

    const result = await addValue(this.DS, key, JSON.stringify(patientData));

    return result;
  }

  async get(key) {
    const getValue = promisify(client.hget).bind(client);
    const result = await getValue(this.DS, key);

    return JSON.parse(result);
  }

  async delete(key) {
    const result = this.get(key);
    const deleteValue = promisify(client.hdel).bind(client);
    await deleteValue(this.DS, key);

    return result;
  }
}
const resolutionRedisStorage = new ResolutionRedisStorage();
export { resolutionRedisStorage };
