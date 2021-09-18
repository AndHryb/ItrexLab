import { STATUSES } from '../constants.js';
import QueueController from '../api/queue/controllers/queue-controller.js';
import QueueService from '../api/queue/service/queue-service.js';
import UserService from '../api/auth/service/user-service.js';
import QueueRedisRepository from '../api/queue/repository/queue-redis-repository.js';
import UserSqlRepository from '../api/auth/repository/user-sql-repository.js';
import redis from 'redis-mock';
import SequelizeMock from 'sequelize-mock';

const usersSQLDB = new SequelizeMock();
const client = redis.createClient();
const queueRedisRepository = new QueueRedisRepository(client);
const userSqlRepository = new UserSqlRepository(usersSQLDB);
const queueService = new QueueService(queueRedisRepository);
const userService = new UserService(userSqlRepository);
const queueController = new QueueController(queueService, userService);

jest.mock('../api/auth/service/user-service.js');
jest.mock('../api/queue/service/queue-service.js');


describe('queue controller unit tests', () => {


  test('first in queueRepository patient(queueRepository not empty)', async () => {
    queueService.get.mockResolvedValue('Andrei');
    const res = await queueController.getNext();
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value).toEqual('Andrei');
  });

  test('first in queueRepository patient(queueRepository is empty)', async () => {
    queueService.get.mockResolvedValue(false);
    const res = await queueController.getNext();
    expect(res.status).toEqual(STATUSES.NotFound);
    expect(res.value).toEqual('The queue is empty');
  });

  test('add in queueRepository', async () => {
    userService.getPatientByToken.mockResolvedValue({id: 123, name: 'Andrei'});
    queueService.add.mockResolvedValue('someName');
    const res = await queueController.addToQueue('someToken');
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value).toEqual({
      message: `patient Andrei added to the queue`,
      patient: {id: 123, name: 'Andrei'},
    });
  });
});
