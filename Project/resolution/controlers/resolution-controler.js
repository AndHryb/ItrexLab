import { resolutionDS } from '../service/resolution-service.js';
import { PatientQueue } from '../../queue/service/queue-service.js';
import Request from '../../helpers/request.js';
import { STATUSES } from '../../constants/STATUSES.js';

class ResolutionControler {
  getResolution(reqBody) {
    const res = new Request();
    const result = resolutionDS.get(reqBody);
    console.log(result);

    if (!(result)) {
      res.status = 400;
      res.value = `The patient ${reqBody} not found in the database`;
      return res;
    }

    if (resolutionDS.TTL <= (new Date()).getTime() - result.regTime) {
      res.status = 200;
      res.value = `The resolution for patient ${reqBody} has expired`;

      return res;
    }

    res.status = 200;
    res.value = result.resolution;

    return res;
  }

  addResolution(reqBody) {
    const res = new Request();
    if (PatientQueue.queue.length === 0) {
      res.status = 400;
      res.value = 'Can\'t added resolution. There is no one in the queue';

      return res;
    }
    const nextInQueuePatientName = PatientQueue.remove();
    const result = resolutionDS.add(nextInQueuePatientName, reqBody);
    if (result) {
      res.value = `Added resolution for ${nextInQueuePatientName}`;
      res.status = 200;
    }

    return res;
  }

  deleteResolution(reqBody) {
    const res = new Request();
    if (!(reqBody in resolutionDS.data)) {
      res.status = 400;
      res.value = `The patient ${reqBody} not found in the database`;

      return res;
    }
    const result = resolutionDS.remove(reqBody);
    if (result) {
      res.status = STATUSES.NoContent;
      res.value = `The resolution for patient ${reqBody} deleted`;
    }

    return res;
  }
}

const resolutionControler = new ResolutionControler();
export { resolutionControler };
