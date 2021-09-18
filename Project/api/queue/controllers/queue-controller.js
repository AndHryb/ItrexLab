import { STATUSES, NO_PATIENT_MSG } from '../../../constants.js';
import Request from '../../../helpers/request.js';
import checkJwtToken from '../../../helpers/decode-doctor-token.js';
import { doctorController } from '../../../routes/resolution-router.js';

export default class QueueController {
  constructor(queueService, userService) {
    this.queueService = queueService;
    this.userService = userService;
  }

  async addToQueue(token, docId) {
    const res = new Request();
    try {
      const { userId } = checkJwtToken(token);
      const patient = await this.userService.getByUserId(userId);
      if (!patient) throw (new Error(NO_PATIENT_MSG));
      const result = await this.queueService.add(patient.id, docId);
      res.status = STATUSES.Created;
      res.value = result;

      return res;
    } catch (err) {
      res.status = STATUSES.NotFound;
      res.value = err;

      return res;
    }

  }

  async getNext(docToken) {
    const res = new Request();
    const { userId } = checkJwtToken(docToken);
    const { id } = await doctorController.getByUserId(userId);
    const result = await this.queueService.get(id);
    
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
