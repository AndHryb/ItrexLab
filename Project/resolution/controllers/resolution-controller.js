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
    console.log('listlengt');
    console.log(patientsList);

    if (patientsList.length === 0) {
      res.status = STATUSES.NotFound;
      res.value = `The patient ${reqBody} not found in the database`;

      return res;
    }

    res.value = [];

    for (const elem of patientsList) {
      const result = await this.resolutionService.getById(elem.resolutionId);
      console.log(result.regTime);
      console.log(this.TTL);

      if (this.TTL < (new Date()).getTime() - result.regTime) {
        console.log(`time  ${this.TTL}` < (new Date()).getTime() - result.regTime);
        result.resolution = `The resolution for patient ${elem.name} has expired`;
      }

      if (result.resolution) {
        res.value.push({
          name: elem.name,
          id: elem.resolutionId,
          resolution: result.resolution,
          regTime: elem.regTime,
        });
      }
    }

    res.status = STATUSES.OK;

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
    await this.patientService.setResolutionID(nextInQueuePatientName, result);
    const patientData = await this.patientService.getById(nextInQueuePatientName);

    if (result) {
      res.value = `Added resolution for ${patientData.name}`;
      res.status = STATUSES.OK;
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
