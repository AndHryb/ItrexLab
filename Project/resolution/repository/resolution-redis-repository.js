import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

export default class ResolutionRedisRepository {
  constructor(redisClient) {
    this.DS = 'redisResolution';
    this.client = redisClient;
  }

  async add(patientId, resolution) {
    const resolutionId = uuidv4();

    const addValue = promisify(this.client.hset).bind(this.client);

    const patientData = {
      resolution,
      patientId,
      regTime: (new Date()).getTime(),
    };

    await addValue(this.DS, resolutionId, JSON.stringify(patientData));

    return resolutionId;
  }

  async getById(resolutionId) {
    const getValue = promisify(this.client.hget).bind(this.client);
    const result = await getValue(this.DS, resolutionId);

    if (!result) { return false; }

    return JSON.parse(result);
  }

  async delete(resolutionId) {
    const result = this.getById(resolutionId);
    const deleteValue = promisify(this.client.hdel).bind(this.client);
    await deleteValue(this.DS, resolutionId);

    return result;
  }
}
