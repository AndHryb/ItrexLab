import { STATUSES } from '../../constants.js';
import Request from '../../helpers/request.js';

export default class ResolutionController {
  constructor(queueService, resolutionService, patientService, TTL) {
    this.queueService = queueService;
    this.resolutionService = resolutionService;
    this.patientService = patientService;
    this.TTL = TTL;
  }

  async getResolutionsByName(reqBody) {
    const res = new Request();
    const patientsList = await this.patientService.getByName(reqBody);

    if (patientsList.length === 0) {
      res.status = STATUSES.NotFound;
      res.value = `The patient ${reqBody} not found in the database`;

      return res;
    }

    res.value = [];

    for (const elem of patientsList) {
      const result = await this.resolutionService.getByPatientId(elem.patientId);
      if (!result) {
        continue;
      }

      if (this.TTL < (new Date()).getTime() - result.regTime) {
        console.log(`time  ${this.TTL}` < (new Date()).getTime() - result.regTime);
        result.resolution = `The resolution for patient ${elem.name} has expired`;
      }

      if (result.resolution) {
        res.value.push({
          name: elem.name,
          id: result.resolutionId,
          resolution: result.resolution,
          regTime: elem.regTime,
        });
      }
    }

    res.status = STATUSES.OK;

    if (res.value.length === 0) {
      res.status = STATUSES.NotFound;
      res.value = `The resolutions for patients whose name is ${reqBody} not found in the database`;
    }

    return res;
  }

  async addResolution(reqBody) {
    const res = new Request();
    const queueLength = await this.queueService.getLength();

    if (queueLength === 0) {
      res.status = STATUSES.PreconditionFailed;
      res.value = 'Can\'t added resolution. There is no one in the queueRepository';

      return res;
    }

    const nextInQueuePatientName = await this.queueService.delete();
    const result = await this.resolutionService.add(nextInQueuePatientName, reqBody);
    const patientData = await this.patientService.getById(nextInQueuePatientName);

    if (result) {
      res.value = `Added resolution for ${patientData.name}`;
      res.status = STATUSES.Created;
    }

    return res;
  }

  async deleteResolution(reqBody) {
    const res = new Request();
    const result = await this.resolutionService.delete(reqBody);

    if (!(result)) {
      res.status = STATUSES.NotFound;
      res.value = `The resolution ${reqBody} not found in the database`;

      return res;
    }
    res.status = STATUSES.OK;
    res.value = `The resolution  ${reqBody} deleted`;

    return res;
  }
}