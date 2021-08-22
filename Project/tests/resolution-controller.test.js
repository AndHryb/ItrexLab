import { STATUSES, TTL } from '../constants.js';
import ResolutionController from '../resolution/controllers/resolution-controller.js';
import ResolutionService from '../resolution/service/resolution-service.js';
import QueueService from '../queue/service/queue-service.js';
import { resolutionMemoryStorage } from '../resolution/storages/resolution-memory-storage.js';
import { queueMemoryStorage } from '../queue/storages/queue-memory-storage.js';

jest.mock('../resolution/service/resolution-service.js');
jest.mock('../queue/service/queue-service.js');

describe('resolution controller unit test', () => {
  const resolutionService = new ResolutionService(resolutionMemoryStorage);
  const queueService = new QueueService(queueMemoryStorage);
  const resolutionController = new ResolutionController(queueService, resolutionService, TTL);

  let resolutionData;
  const resolutionKey = 'Andrei';
  const resolutionVal = 'schizophrenia';

  beforeEach(() => {
    resolutionData = {
      name: 'Andrei',
      resolution: 'schizophrenia',
      regTime: (new Date()).getTime(),
    };
  });

  test('get resolution data(storage has data)', async () => {
    resolutionService.get.mockResolvedValue(resolutionData);
    const res = await resolutionController.getResolution();
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value).toEqual(resolutionData.resolution);
  });

  test('get resolution data(storage hasn\'t data)', async () => {
    resolutionService.get.mockResolvedValue(false);
    const res = await resolutionController.getResolution(resolutionKey);
    expect(res.status).toEqual(STATUSES.BadRequest);
    expect(res.value).toEqual(`The patient ${resolutionKey} not found in the database`);
  });

  test('add resolution data(queue has patient)', async () => {
    queueService.getLength.mockResolvedValue(1); // queue has 1 patient
    queueService.delete.mockResolvedValue(resolutionKey);
    resolutionService.add.mockResolvedValue(resolutionData);

    const res = await resolutionController.addResolution(resolutionKey, resolutionVal);
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value).toEqual(`Added resolution for ${resolutionKey}`);
  });

  test('add resolution data(queue hasn\'t patient)', async () => {
    queueService.getLength.mockResolvedValue(0); // queue is empty
    queueService.delete.mockResolvedValue(false);
    resolutionService.add.mockResolvedValue(resolutionData);

    const res = await resolutionController.addResolution(resolutionKey, resolutionVal);
    expect(res.status).toEqual(STATUSES.PreconditionFailed);
    expect(res.value).toEqual('Can\'t added resolution. There is no one in the queue');
  });

  test('delete resolution data(storage has key)', async () => {
    resolutionService.delete.mockResolvedValue(true);
    const res = await resolutionController.deleteResolution(resolutionKey);
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value).toEqual(`The resolution for patient ${resolutionKey} deleted`);
  });

  test('delete resolution data(storage hasn\'t key)', async () => {
    resolutionService.delete.mockResolvedValue(false);
    const res = await resolutionController.deleteResolution(resolutionKey);
    expect(res.status).toEqual(STATUSES.BadRequest);
    expect(res.value).toEqual(`The patient ${resolutionKey} not found in the database`);
  });
});
