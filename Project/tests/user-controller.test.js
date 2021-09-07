import { STATUSES } from '../constants.js';
import UserController from '../users/controller/user-controller.js';
import UserService from '../users/service/user-service.js';
import UserSqlRepository from '../users/repository/user-sql-repository.js';
import PatientSqlRepository from '../patient/repository/patient-sql-repository.js';
import sequelizeInit from '../config-data-bases/sequelize/sequelize-init.js';

const sequelize = sequelizeInit();
const { usersSQLDB, patientsSQLDB } = sequelize.models;

const userSqlRepository = new UserSqlRepository(usersSQLDB);
const patientSqlRepository = new PatientSqlRepository(patientsSQLDB);
const userService = new UserService(userSqlRepository, patientSqlRepository);
const userController = new UserController(userService);

jest.mock('../users/service/user-service.js');

describe('resolution controller unit test', () => {
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

  beforeEach(() => {
  });

  test('registration(all ok)', async () => {
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
    userService.login.mockResolvedValue('--token--');
    const res = await userController.login(loginData);
    expect(res.status)
      .toEqual(STATUSES.OK);
    expect(res.value.token)
      .toEqual('--token--');
    expect(res.value.message)
      .toEqual('OK');
    expect(res.value.token)
      .toEqual('--token--');
  });

  test('login(email not found)', async () => {
    userService.login.mockResolvedValue('email!');
    const res = await userController.login(loginData);
    expect(res.status)
      .toEqual(STATUSES.NotFound);
    expect(res.value.token)
      .toBeFalsy();
    expect(res.value.message)
      .toEqual(`the login ${loginData.email} was not found in the database`);
  });

  test('login(email not found)', async () => {
    userService.login.mockResolvedValue('email!');
    const res = await userController.login(loginData);
    expect(res.status)
      .toEqual(STATUSES.NotFound);
    expect(res.value.token)
      .toBeFalsy();
    expect(res.value.message)
      .toEqual(`the login ${loginData.email} was not found in the database`);
  });

  test('login(the passwords don\'t match)', async () => {
    userService.login.mockResolvedValue('password!');
    const res = await userController.login(loginData);
    expect(res.status).toEqual(STATUSES.Unauthorized);
    expect(res.value.token).toBeFalsy();
    expect(res.value.message).toEqual(`the password for ${loginData.email}  don't match`);

  });
});
