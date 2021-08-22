import { STATUSES } from '../../constants.js';
import Request from '../../helpers/request.js';

export default class ResolutionController {
  constructor(queueStorage, resolutionStorage, TTL) {
    this.queueStorage = queueStorage;
    this.resolutionStorage = resolutionStorage;
    this.TTL = TTL;
  }

  async getResolution(reqBody) {
    const res = new Request();
    const result = await this.resolutionStorage.get(reqBody);

    if (!(result)) {
      res.status = STATUSES.BadRequest;
      res.value = `The patient ${reqBody} not found in the database`;

      return res;
    }

    if (this.TTL <= (new Date()).getTime() - result.regTime) {
      res.status = STATUSES.Forbidden;
      res.value = `The resolution for patient ${reqBody} has expired`;

      return res;
    }

    res.status = STATUSES.OK;
    res.value = result.resolution;

    return res;
  }

  async addResolution(reqBody) {
    const res = new Request();
    const queueLength = await this.queueStorage.getLength();
    if (queueLength === 0) {
      res.status = STATUSES.PreconditionFailed;
      res.value = 'Can\'t added resolution. There is no one in the queue';

      return res;
    }
    const nextInQueuePatientName = await this.queueStorage.delete();
    const result = await this.resolutionStorage.add(nextInQueuePatientName, reqBody);
    if (result) {
      res.value = `Added resolution for ${nextInQueuePatientName}`;
      res.status = STATUSES.OK;
    }

    return res;
  }

  async deleteResolution(reqBody) {
    const res = new Request();
    const result = await this.resolutionStorage.delete(reqBody);

    if (!(result)) {
      res.status = STATUSES.BadRequest;
      res.value = `The patient ${reqBody} not found in the database`;

      return res;
    }
    console.log(typeof reqBody);

    res.status = STATUSES.OK;
    res.value = `The resolution for patient ${reqBody} deleted`;

    return res;
  }
}
