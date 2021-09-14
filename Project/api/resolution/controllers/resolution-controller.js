import { STATUSES } from '../../../constants.js';
import Request from '../../../helpers/request.js';
import checkJwtToken from '../../../helpers/decode-doctor-token.js';
import { doctorController } from '../../../routes/resolution-router.js';

export default class ResolutionController {
  constructor(resolutionService) {
    this.resolutionService = resolutionService;
  }

  async getResolutionsByName(reqBody) {
    const res = new Request();
    const dataList = await this.resolutionService.getResolutionsByName(reqBody);

    if (!dataList) {
      res.status = STATUSES.NotFound;
      res.value = {
        message: `The patient ${reqBody} not found in the database`,
      };
      return res;
    }
    res.status = STATUSES.OK;
    res.value = {
      message: `${dataList.length} patient(s) were found`,
      resolutions: dataList,
    };


    return res;
  }

  async getResolutionByToken(token) {
    const res = new Request();
    const result = await this.resolutionService.getResolutionByToken(token);
    if (!result) {
      res.status = STATUSES.NotFound;
      res.value = {
        message: 'The resolution not found in the database.Make an appointment with a doctor.',
      };
      return res;
    }
    res.status = STATUSES.OK;
    res.value = {
      resolution: result,
    };

    return res;
  }

  async addResolution(reqBody, docToken) {
    const res = new Request();
    const { userId } = checkJwtToken(docToken);
    const doc = await doctorController.getByUserId(userId);

    const result = await this.resolutionService.addResolution(reqBody.value, doc.id, reqBody.spec);

    if (!result) {
      res.status = STATUSES.Conflict;
      res.value = {
        message: 'Can\'t added resolution. There is no one in the queueRepository',
      };

      return res;
    }
    res.value = result;
    res.status = STATUSES.Created;

    return res;
  }

  async deleteResolution(reqBody) {
    const res = new Request();
    const result = await this.resolutionService.delete(reqBody);

    if (!(result)) {
      res.status = STATUSES.NotFound;
      res.value = {
        message: `The resolution ${reqBody} not found in the database`,
      };

      return res;
    }
    res.status = STATUSES.OK;
    res.value = {
      message: `The resolution  ${reqBody} deleted`,
    };

    return res;
  }
}
