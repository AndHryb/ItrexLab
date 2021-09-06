import { STATUSES } from '../../constants.js';
import Request from '../../helpers/request.js';

export default class QueueController {
  constructor(queueService, userService) {
    this.queueService = queueService;
    this.userService = userService;
  }

  async addToQueue(token) {
    const res = new Request();
    const result = await this.userService.getByToken(token);
    if (!result) {
      res.value = {
        message: 'Server Error, try logging in again',
      };
      res.status = STATUSES.ServerError;

      return res;
    }
    const addQueue = await this.queueService.add(result.id);
    if (addQueue) {
      res.value = {
        message: `patient ${result.name} added to the queue`,
        patient: result,
      };
      res.status = STATUSES.Created;

      return res;
    }
    res.value = {
      message: 'You are already standing in queue',
    };
    res.status = STATUSES.BadRequest;

    return res;
  }

  async getNext() {
    const res = new Request();
    const result = await this.queueService.get();

    if (!result) {
      res.status = STATUSES.NotFound;
      res.value = 'The queue is empty';
      return res;
    }
    res.value = result;
    res.status = STATUSES.OK;
    return res;
  }
}
