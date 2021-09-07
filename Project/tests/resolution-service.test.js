import redis from 'redis-mock';
import SequelizeMock from 'sequelize-mock';
import ResolutionService from '../resolution/service/resolution-service.js';
import ResolutionSqlRepository from '../resolution/repository/resolution-sql-repository.js';
import PatientSqlRepository from '../patient/repository/patient-sql-repository.js';
import QueueRedisRepository from '../queue/repository/queue-redis-repository';
import { TTL } from '../constants.js';
import decodeToken from '../helpers/decode-token';

const client = redis.createClient();
const patientsSQLDBMock = new SequelizeMock();
const resolutionsSQLDBMock = new SequelizeMock();

const resolutionSqlRepository = new ResolutionSqlRepository(resolutionsSQLDBMock);
const patientSqlRepository = new PatientSqlRepository(patientsSQLDBMock);
const queueRedisRepository = new QueueRedisRepository(client);
const resolutionService = new ResolutionService(queueRedisRepository, resolutionSqlRepository, patientSqlRepository, TTL);

jest.mock('../resolution/repository/resolution-sql-repository.js');
jest.mock('../patient/repository/patient-sql-repository.js');
jest.mock('../queue/repository/queue-redis-repository');
jest.mock('../helpers/decode-token');

describe('resolution service unit test', () => {
  let dataValues;
  let patientData1;
  let patientData2;
  let patientList = [];
  const testRegTime = (new Date()).getTime();
  const userID = '333';
  const resolutionId = '111';
  const patientId = '222';
  const resolutionVal = 'schizophrenia';

  beforeEach(() => {
    dataValues = {
      id: '111',
      resolution: '1111',
      createdAt: testRegTime,
      updatedAt: testRegTime,
      patientId: '222',
    };
    patientData1 = {
      name: 'Andrei',
      regTime: testRegTime,
    };
    patientData2 = {
      name: 'Bob',
      regTime: testRegTime,
    };
    patientList = [
      {
        patientId: '222',
        name: 'Andrei',
        regTime: testRegTime,
      },
    ];
  });

  test('get resolutions by name', async () => {
    patientSqlRepository.getByName.mockResolvedValue(patientList);
    resolutionSqlRepository.getByPatientId.mockResolvedValue(dataValues);
    const res = await resolutionService.getResolutionsByName('Andrei');
    expect(res).toEqual([]);
  });

  test('get resolution token', async () => {
    decodeToken.mockResolvedValue(userID);
    patientSqlRepository.getByUserId.mockResolvedValue(patientData1);
    resolutionSqlRepository.getByPatientId.mockResolvedValue(dataValues);
    const res = await resolutionService.getResolutionByToken('asd');
    expect(res).toEqual(dataValues);
  });

  test('get resolution token(token invalid)', async () => {
    decodeToken.mockResolvedValue(userID);
    patientSqlRepository.getByUserId.mockResolvedValue(false);
    resolutionSqlRepository.getByPatientId.mockResolvedValue(false);
    const res = await resolutionService.getResolutionByToken('asd');
    expect(res).toBeFalsy();
  });

  test('get resolution data by resolution id(repository has data)', async () => {
    resolutionSqlRepository.getById.mockResolvedValue(dataValues);
    const res = await resolutionService.getById(resolutionId);
    expect(res).toEqual(dataValues);
  });

  test('get resolution data by resolution id(repository hasn\'t data)', async () => {
    resolutionSqlRepository.getById.mockResolvedValue(false);
    const res = await resolutionService.getById(resolutionId);
    expect(res).toEqual(false);
  });

  test('get resolution data by patient id(repository has data)', async () => {
    resolutionSqlRepository.getByPatientId.mockResolvedValue(dataValues);
    const res = await resolutionService.getByPatientId(patientId);
    expect(res).toEqual(dataValues);
  });

  test('get resolution data by patient id(repository hasn\'t data)', async () => {
    resolutionSqlRepository.getByPatientId.mockResolvedValue(false);
    const res = await resolutionService.getByPatientId(resolutionId);
    expect(res).toEqual(false);
  });

  test('delete resolution data(repository has data)', async () => {
    resolutionSqlRepository.delete.mockResolvedValue(true);
    const res = await resolutionService.delete(resolutionId);
    expect(res).toEqual(true);
  });

  test('delete resolution data(repository hasn\'t data)', async () => {
    resolutionSqlRepository.delete.mockResolvedValue(false);
    const res = await resolutionService.delete(resolutionId);
    expect(res).toEqual(false);
  });
});
