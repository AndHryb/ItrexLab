import { STATUSES } from '../constants.js';
import QueueController from '../queue/controllers/queue-controller.js';
import QueueService from '../queue/service/queue-service.js';
import { queueMemoryStorage } from '../queue/storages/queue-memory-storage.js';

jest.mock('../queue/service/queue-service.js');

describe('queue controller unit tests', () => {
  const queueServise = new QueueService(queueMemoryStorage);
  const queueController = new QueueController(queueServise);

  test('first in queue patient(queue not empty)', async () => {
    queueServise.get.mockResolvedValue('Andrei');
    const res = await queueController.getNext();
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value).toEqual('Andrei');
  });

  test('first in queue patient(queue is empty)', async () => {
    queueServise.get.mockResolvedValue(false);
    const res = await queueController.getNext();
    expect(res.status).toEqual(STATUSES.BadRequest);
    expect(res.value).toEqual('The queue is empty');
  });

  test('add in queue', async () => {
    queueServise.add.mockResolvedValue('someName');
    const res = await queueController.addToQueue('someName');
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value).toEqual('patient someName added to the queue');
  });
});
