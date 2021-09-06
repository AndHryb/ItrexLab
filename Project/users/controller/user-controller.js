import { STATUSES } from '../../constants.js';
import Request from '../../helpers/request.js';

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
      message: 'This email is already busy, try another one...',
    };
    res.status = STATUSES.ServerError;

    return res;
  }

  async login(data) {
    const res = new Request();
    const result = await this.userService.login(data);
    if (result === 'email!') {
      res.status = STATUSES.NotFound;
      res.value = {
        message: `the login ${data.email} was not found in the database`,
      };
      return res;
    }
    if (result === 'password!') {
      res.status = STATUSES.Unauthorized;
      res.value = {
        message: `the password for ${data.email}  don't match`,
      };
      return res;
    }
    res.status = STATUSES.OK;
    res.value = {
      message: 'OK',
      token: result,
    };
    return res;
  }

  async getByToken(token) {
    const res = new Request();
    const result = await this.userService.getByToken(token);
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
}
