import bcrypt from 'bcryptjs';
import SequelizeMock from 'sequelize-mock';
import UserService from '../users/service/user-service.js';
import UserSqlRepository from '../users/repository/user-sql-repository.js';
import PatientSqlRepository from '../patient/repository/patient-sql-repository.js';

import decodeToken from '../helpers/decode-token.js';

const patientsSQLDBMock = new SequelizeMock();
const usersSQLDBMock = new SequelizeMock();

const patientSqlRepository = new PatientSqlRepository(patientsSQLDBMock);
const userSqlRepository = new UserSqlRepository(usersSQLDBMock);
const userService = new UserService(userSqlRepository, patientSqlRepository);

jest.mock('../users/service/user-service.js');
jest.mock('../users/repository/user-sql-repository.js');
jest.mock('../patient/repository/patient-sql-repository.js');
jest.mock('../helpers/decode-token.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('user service unit test', () => {
  const testTime = new Date().getTime();
  const regData = {
    email: 'andryigr@gmail.com',
    password: '1111',
    name: 'Andrei',
    birthday: 730080000000,
    gender: 'male',
  };
  const userData = {
    id: '333',
    email: 'aaa@list',
    password: '000',
    createdAt: testTime,
    updatedAt: testTime,
  };
  const patientData = {
    id: '111',
    name: 'Andrei',
    birthday: 730080000000,
    gender: 'male',
    userId: '333',
    createdAt: testTime,
    updatedAt: testTime,
  };

  test('registration test', async () => {
    userSqlRepository.checkEmail.mockResolvedValue(userData.email);
    userSqlRepository.add.mockResolvedValue(userData);
    patientSqlRepository.add.mockResolvedValue(patientData);
    userService.login.mockResolvedValue('111');
    const res = await userService.registration(regData);
    console.log(res);
    expect(res).toEqual('111');
  });

  test('registration test(email in base)', async () => {
    userSqlRepository.checkEmail.mockResolvedValue(true);
    userSqlRepository.add.mockResolvedValue(userData);
    patientSqlRepository.add.mockResolvedValue(patientData);
    userService.login.mockResolvedValue('111');
    const res = await userService.registration(regData);
    expect(res).toBeFalsy();
  });

  test('login', async () => {
    userSqlRepository.checkEmail.mockResolvedValue(false);
    bcrypt.compareSync.mockResolvedValue(true);
    const res = await userService.login(regData);
    expect(res).toEqual('111');
  });

  test('get by token ', async () => {
    decodeToken.mockResolvedValue(userData);
    patientSqlRepository.getByUserId.mockResolvedValue(patientData);
    const res = await userService.getByToken('111fff');
    expect(res).toEqual(patientData);
  });

  test('get by userId ', async () => {
    patientSqlRepository.getByUserId.mockResolvedValue(patientData);
    const res = await userService.getByUserId('111');
    expect(res).toEqual(patientData);
  });
});
