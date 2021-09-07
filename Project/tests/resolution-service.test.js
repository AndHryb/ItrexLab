import ResolutionService from '../resolution/service/resolution-service.js';
import ResolutionSqlRepository from '../resolution/repository/resolution-sql-repository.js';
import PatientSqlRepository from '../patient/repository/patient-sql-repository.js';
import QueueRedisRepository from '../queue/repository/queue-redis-repository';
import sequelizeInit from '../config-data-bases/sequelize/sequelize-init.js';
import redisInit from '../config-data-bases/redis/redis-init.js';
import { TTL } from '../constants.js';

const sequelize = sequelizeInit();
const { patientsSQLDB, resolutionsSQLDB } = sequelize.models;

const resolutionSqlRepository = new ResolutionSqlRepository(resolutionsSQLDB);
const patientSqlRepository = new PatientSqlRepository(patientsSQLDB);
const queueRedisRepository = new QueueRedisRepository(redisInit());
const resolutionService = new ResolutionService(queueRedisRepository, resolutionSqlRepository, patientSqlRepository, TTL);

jest.mock('../resolution/repository/resolution-sql-repository.js');
jest.mock('../patient/repository/patient-sql-repository.js');
jest.mock('../queue/repository/queue-redis-repository');

describe('resolution service unit test', () => {
  let resolutionData1;
  let patientData1;
  let patientData2;
  let patientList = [];
  const testRegTime = (new Date()).getTime();
  const resolutionId = '111';
  const resolutionVal = 'schizophrenia';

  beforeEach(() => {
    resolutionData1 = {
      id: '111',
      patientId: '222',
      resolution: 'schizophrenia',
      regTime: testRegTime,
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
        id: '222',
        name: 'Andrei',
        regTime: testRegTime,
      },
    ];
  });

  test('get resolutions by name', async () => {
    patientSqlRepository.getByName.mockResolvedValue(patientList);
    resolutionSqlRepository.getByPatientId(resolutionData1);
    const res = await resolutionService.getResolutionsByName('Andrei');
    expect(res).toEqual([{
      name: 'Andrei',
      id: resolutionData1.id,
      resolution: resolutionData1.resolution,
      regTime: resolutionData1.regTime,
    }]);
  });

  test('add resolution data', async () => {
    resolutionSqlRepository.add.mockResolvedValue(resolutionId);
    const res = await resolutionService.add(patientId, resolutionVal);
    expect(res).toEqual(resolutionId);
  });

  test('get resolution data by resolution id(repository has data)', async () => {
    resolutionSqlRepository.getById.mockResolvedValue(resolutionData);
    const res = await resolutionService.getById(resolutionId);
    expect(res).toEqual(resolutionData);
  });

  test('get resolution data by resolution id(repository hasn\'t data)', async () => {
    resolutionSqlRepository.getById.mockResolvedValue(false);
    const res = await resolutionService.getById(resolutionId);
    expect(res).toEqual(false);
  });

  test('get resolution data by patient id(repository has data)', async () => {
    resolutionSqlRepository.getByPatientId.mockResolvedValue(resolutionData);
    const res = await resolutionService.getByPatientId(resolutionId);
    expect(res).toEqual(resolutionData);
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
