import { STATUSES } from '../constants.js';
import QueueController from '../queue/controllers/queue-controller.js';
import QueueService from '../queue/service/queue-service.js';
import UserService from '../users/service/user-service.js';
import QueueRedisRepository from '../queue/repository/queue-redis-repository.js';
import UserSqlRepository from '../users/repository/user-sql-repository.js';
import redisInit from '../config-data-bases/redis/redis-init.js';
import sequelizeInit from '../config-data-bases/sequelize/sequelize-init.js';
const sequelize = sequelizeInit();
const { usersSQLDB } = sequelize.models;

const queueRedisRepository = new QueueRedisRepository(redisInit());
const userSqlRepository = new UserSqlRepository(usersSQLDB);
const queueService = new QueueService(queueRedisRepository);
const userService = new UserService(userSqlRepository);
const queueController = new QueueController(queueService, userService);

jest.mock('../users/service/user-service.js');
jest.mock('../queue/service/queue-service.js');


describe('queueRepository controller unit tests', () => {


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
    userService.getByToken.mockResolvedValue({id: 123, name: 'Andrei'});
    queueService.add.mockResolvedValue('someName');
    const res = await queueController.addToQueue('someToken');
    expect(res.status).toEqual(STATUSES.Created);
    expect(res.value).toEqual({
      message: `patient Andrei added to the queue`,
      patient: {id: 123, name: 'Andrei'},
    });
  });
});
