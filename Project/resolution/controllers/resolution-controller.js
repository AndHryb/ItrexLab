import { STATUSES } from '../../constants.js';
import Request from '../../helpers/request.js';

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

    res.value = {
      message: `${dataList.length} patient(s) were found`,
      resolutions: dataList,
    };
    res.status = STATUSES.OK;

    return res;
  }

  async getResolutionByToken(token) {
    const res = new Request();
    const result = await this.resolutionService.getResolutionByToken(token);
    console.log('res controller result by token>>>>>');
    console.log(result);
    if (!result) {
      res.status = STATUSES.OK;
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

  async addResolution(reqBody) {
    const res = new Request();
    const result = await this.resolutionService.addResolution(reqBody);

    if (!result) {
      res.status = STATUSES.PreconditionFailed;
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
