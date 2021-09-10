import SequelizeMock from 'sequelize-mock';
import { STATUSES } from '../constants.js';
import UserController from '../api/auth/controller/user-controller.js';
import UserService from '../api/auth/service/user-service.js';
import UserSqlRepository from '../api/auth/repository/user-sql-repository.js';
import PatientSqlRepository from '../api/patient/repository/patient-sql-repository.js';

const { usersSQLDB, patientsSQLDB } = new SequelizeMock();

const userSqlRepository = new UserSqlRepository(usersSQLDB);
const patientSqlRepository = new PatientSqlRepository(patientsSQLDB);
const userService = new UserService(userSqlRepository, patientSqlRepository);
const userController = new UserController(userService);

jest.mock('../users/service/user-service.js');

describe('user controller unit test', () => {
  const registrationData = {
    email: 'andryigr@gmail.com',
    password: '1111',
    name: 'Andrei Hrybouski',
    birthday: 635385600000,
    gender: 'male',
  };
  const loginData = {
    email: 'andryigr@gmail.com',
    password: '1111',
  };
  let resData;

  beforeEach(() => {
    resData = {
      email: true,
      password: true,
      token: undefined,
    };
  });

  test('registration(all ok)', async () => {
    resData.token = '--token--';
    userService.registration.mockResolvedValue('--token--');
    const res = await userController.registration(registrationData);
    expect(res.status)
      .toEqual(STATUSES.Created);
    expect(res.value.token)
      .toEqual('--token--');
    expect(res.value.message)
      .toEqual('The user has been successfully registered');
  });

  test('registration(email is already busy)', async () => {
    userService.registration.mockResolvedValue(false);
    const res = await userController.registration(registrationData);
    expect(res.status)
      .toEqual(STATUSES.ServerError);
    expect(res.value.message)
      .toEqual('This email is already busy, try another one...');
  });

  test('login(all ok)', async () => {
    resData.token = '--token--';
    userService.login.mockResolvedValue(resData);
    const res = await userController.login(loginData);
    expect(res.status)
      .toEqual(STATUSES.OK);
    expect(res.value.token)
      .toEqual('--token--');
    expect(res.value.message)
      .toEqual('OK');
  });

  test('login(email not found)', async () => {
    resData.email = false;
    userService.login.mockResolvedValue(resData);
    const res = await userController.login(loginData);
    expect(res.status).toEqual(STATUSES.Unauthorized);
    expect(res.value.token).toBeFalsy();
    expect(res.value.message).toEqual(`the email ${loginData.email} was not found in the database`);
  });

  test('login(the passwords don\'t match)', async () => {
    resData.email = true;
    resData.password = false;
    userService.login.mockResolvedValue(resData);
    const res = await userController.login(loginData);
    expect(res.status).toEqual(STATUSES.Unauthorized);
    expect(res.value.token).toBeFalsy();
    expect(res.value.message).toEqual(`the password for ${loginData.email}  don't match`);
  });
});
