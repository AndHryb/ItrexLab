import { STATUSES } from '../constants.js';
import QueueController from '../queue/controllers/queue-controller.js';
import QueueService from '../queue/service/queue-service.js';
import { queueInmemoryRepository } from '../queue/repository/queue-inmemory-repository.js';

jest.mock('../queueRepository/service/queueRepository-service.js');

describe('queueRepository controller unit tests', () => {
  const queueServise = new QueueService(queueInmemoryRepository);
  const queueController = new QueueController(queueServise);

  test('first in queueRepository patient(queueRepository not empty)', async () => {
    queueServise.get.mockResolvedValue('Andrei');
    const res = await queueController.getNext();
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value).toEqual('Andrei');
  });

  test('first in queueRepository patient(queueRepository is empty)', async () => {
    queueServise.get.mockResolvedValue(false);
    const res = await queueController.getNext();
    expect(res.status).toEqual(STATUSES.BadRequest);
    expect(res.value).toEqual('The queueRepository is empty');
  });

  test('add in queueRepository', async () => {
    queueServise.add.mockResolvedValue('someName');
    const res = await queueController.addToQueue('someName');
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value).toEqual('patient someName added to the queueRepository');
  });
});
