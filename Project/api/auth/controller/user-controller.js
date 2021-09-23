import { STATUSES } from '../../../constants.js';
import Request from '../../../helpers/request.js';

export default class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async registration(data) {
    const res = new Request();
    const result = await this.userService.registration(data);

    if (result) {
      res.value = {
        message: 'The user has been successfully registered',
        token: result,
      };
      res.status = STATUSES.Created;

      return res;
    }
    res.value = {
      message: 'Email address is exist',
    };
    res.status = STATUSES.Conflict;

    return res;
  }

  async login(data) {
    const res = new Request();
    const result = await this.userService.login(data);
    if (!result.email) {
      res.status = STATUSES.Unauthorized;
      res.value = {
        message: `the email ${data.email} was not found in the database`,
      };
      return res;
    }
    if (!result.password) {
      res.status = STATUSES.Unauthorized;
      res.value = {
        message: `the password for ${data.email}  don't match`,
      };
      return res;
    }
    if (result.token) {
      res.status = STATUSES.OK;
      res.value = {
        message: 'OK',
        token: result.token,
      };
    }
    return res;
  }

  async getPatientByToken(token) {
    const res = new Request();
    const result = await this.userService.getPatientByToken(token);
    if (!result) {
      res.status = STATUSES.ServerError;
      res.value = {
        message: 'Server Error.Try logging in again',
      };
    }
    res.status = STATUSES.OK;
    res.value = {
      patient: result,
    };

    return res;
  }

  async getDoctorByToken(token) {
    const res = new Request();
    const result = await this.userService.getDoctorByToken(token);
    if (!result) {
      res.status = STATUSES.ServerError;
      res.value = {
        message: 'Server Error.Try logging in again',
      };
    }
    res.status = STATUSES.OK;
    res.value = {
      doctor: result,
    };

    return res;
  }

  async doctorLogin(data) {
    const res = new Request();
    try {
      const { email, password } = data;
      const result = await this.userService.doctorLogin(email, password);

      res.status = STATUSES.OK;
      res.value = result;

      return res;
    } catch (err) {
      res.status = STATUSES.Unauthorized;
      res.value = err.message;

      return res;
    }
  }
}
