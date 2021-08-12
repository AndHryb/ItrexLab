import { PatientQueue } from '../service/queue-service.js';
import Request from '../../helpers/request.js';
import { STATUSES } from '../../constants/STATUSES.js';

class QueueController {
  addToQueue(reqBody) {
    const res = new Request();
    res.status = STATUSES.OK;
    const result = PatientQueue.add(reqBody);
    if (result) {
      res.value = `patient ${reqBody.value} added to the queue`;
      return res;
    }
    if (!result) {
      res.status = STATUSES.BadRequest;
      res.value = `the patient with the name: ${reqBody} is already in the queue`;
    }

    return res;
  }

  getNext() {
    const res = new Request();
    res.status = STATUSES.OK;
    const result = PatientQueue.get();

    if (!result) {
      res.status = STATUSES.BadRequest;
      res.value = 'The queue is empty';
      return res;
    }
    res.value = PatientQueue.get();

    return res;
  }
}

const queueController = new QueueController();
export {queueController};
