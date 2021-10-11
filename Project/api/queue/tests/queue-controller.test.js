import redis from 'redis-mock';
import SequelizeMock from 'sequelize-mock';
import { STATUSES } from '../../../constants.js';
import QueueController from '../controllers/queue-controller.js';
import QueueService from '../service/queue-service.js';
import UserService from '../../auth/service/user-service.js';
import DoctorService from '../../doctor/service/doctor.service.js';
import QueueRedisRepository from '../repository/queue-redis-repository.js';
import UserSqlRepository from '../../auth/repository/user-sql-repository.js';
import DoctorRepository from '../../doctor/repository/doctor.repository.js';
import checkJwtToken from '../../../helpers/decode-token.js';

const usersSQLDB = new SequelizeMock();
const doctorSQLDB = new SequelizeMock();
const specialtiesSQLDB = new SequelizeMock();
const client = redis.createClient();

const queueRedisRepository = new QueueRedisRepository(client);
const userSqlRepository = new UserSqlRepository(usersSQLDB);
const doctorRepository = new DoctorRepository(doctorSQLDB, specialtiesSQLDB);

const queueService = new QueueService(queueRedisRepository);
const doctorService = new DoctorService(doctorRepository);
const userService = new UserService(userSqlRepository);
const queueController = new QueueController(queueService, userService, doctorService);

jest.mock('../../auth/service/user-service.js');// UserService
jest.mock('../service/queue-service.js');// QueueService
jest.mock('../../doctor/service/doctor.service.js');// DoctorService
jest.mock('../../../helpers/decode-doctor-token.js');// checkJwtToken


const docData = { id: '444', name: 'Sergei' };

describe('queue controller unit tests', () => {

  test('first in queueRepository patient(queueRepository not empty)', async () => {
    checkJwtToken.mockResolvedValue({ userID: '222' });
    doctorService.getByUserId.mockResolvedValue(docData);
    queueService.get.mockResolvedValue('Andrei');
    const res = await queueController.getNext();
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value).toEqual('Andrei');
  });

  test('first in queueRepository patient(queueRepository is empty)', async () => {
    checkJwtToken.mockResolvedValue({ userID: '222' });
    doctorService.getByUserId.mockResolvedValue(docData);
    queueService.get.mockResolvedValue(false);
    const res = await queueController.getNext();
    expect(res.status).toEqual(STATUSES.NotFound);
    expect(res.value).toEqual('The queue is empty');
  });

  test('add in queueRepository', async () => {
    checkJwtToken.mockResolvedValue({ userID: '222' });
    userService.getByUserId.mockResolvedValue(docData);
    queueService.add.mockResolvedValue('111', '222');
    const res = await queueController.addToQueue('someToken');
    expect(res.status).toEqual(STATUSES.Created);
    expect(res.value).toEqual('111');
  });
});
