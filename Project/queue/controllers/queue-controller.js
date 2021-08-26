import {STATUSES} from "../../constants.js";
import Request from "../../helpers/request.js";

export default class QueueController {
  constructor(queueService) {
    this.queueService = queueService;
  }

  async addToQueue(reqBody) {
    const res = new Request();
    res.status = STATUSES.OK;
    const result = await this.queueService.add(reqBody);
    if (result) {
      res.value = `patient ${result} added to the queue`;
    }

    return res;
  }

  async getNext() {
    const res = new Request();
    res.status = STATUSES.OK;
    const result = await this.queueService.get();


    if (!result) {
      res.status = STATUSES.BadRequest;
      res.value = 'The queueRepository is empty';
      return res;
    }
    res.value = result;

    return res;
  }
}
