import {STATUSES} from "../../constants.js";
import Request from "../../helpers/request.js";

export default class QueueController {
  constructor(queue) {
    this.patientQueue = queue;
  }

  async addToQueue(reqBody) {
    const res = new Request();
    res.status = STATUSES.OK;
    const result = await this.patientQueue.add(reqBody);
    if (result) {
      res.value = `patient ${result} added to the queue`;
    }

    return res;
  }

  async getNext() {
    const res = new Request();
    res.status = STATUSES.OK;
    const result = await this.patientQueue.get();

    if (!result) {
      res.status = STATUSES.BadRequest;
      res.value = 'The queue is empty';
      return res;
    }
    res.value = result;

    return res;
  }
}
