import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

export default class PatientRedisRepository {
  constructor(redisClient) {
    this.DS = 'redisPatient';
    this.client = redisClient;
  }

  async add(name, resolutionId) {
    const patientId = uuidv4();

    const addValue = promisify(this.client.hset).bind(this.client);

    const patientData = {
      name,
      resolutionId,
      regTime: (new Date()).getTime(),
    };

    await addValue(this.DS, patientId, JSON.stringify(patientData));

    return patientId;
  }

  async setResolutionID(patientId, resolutionId) {
    const getValue = promisify(this.client.hget).bind(this.client);
    const result = await getValue(this.DS, patientId);

    if (!result) { return false; }

    const data = JSON.parse(result);

    data.resolutionId = resolutionId;

    const addValue = promisify(this.client.hset).bind(this.client);
    await addValue(this.DS, patientId, JSON.stringify(data));

    return true;
  }

  async getByName(name) {
    const patientList = [];

    const getValue = promisify(this.client.hgetall).bind(this.client);
    const result = await getValue(this.DS);

    for (const patientId in result) {
      const data = JSON.parse(result[patientId]);
      if (data.name === name) {
        patientList.push(data);
      }
    }
    return patientList;
  }

  async getById(patientId) {
    const getValue = promisify(this.client.hget).bind(this.client);
    const result = await getValue(this.DS, patientId);

    if (!result) { return false; }

    return JSON.parse(result);
  }

  async delete(patientId) {
    const result = this.getById(patientId);
    const deleteValue = promisify(this.client.hdel).bind(this.client);
    await deleteValue(this.DS, patientId);

    return result;
  }
}
