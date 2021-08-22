import QueueService from '../queue/service/queue-service.js';
import { queueMemoryStorage } from '../queue/storages/queue-memory-storage.js';

jest.mock('../queue/storages/queue-memory-storage.js');

describe('queue service unit tests', () => {
  const queueServise = new QueueService(queueMemoryStorage);
  const patientName = 'Andrei';

  test('method get', async () => {
    queueMemoryStorage.get.mockResolvedValue(patientName);
    const res = await queueServise.get(patientName);
    expect(res).toEqual(patientName);
  });

  test('method get(queue is empty)', async () => {
    queueMemoryStorage.get.mockResolvedValue(false);
    const res = await queueServise.get(patientName);
    expect(res).toEqual(false);
  });

  test('method add', async () => {
    queueMemoryStorage.add.mockResolvedValue(patientName);
    const res = await queueServise.add(patientName);
    expect(res).toEqual(patientName);
  });

  test('method delete', async () => {
    queueMemoryStorage.delete.mockResolvedValue(patientName);
    const res = await queueServise.delete(patientName);
    expect(res).toEqual(patientName);
  });

  test('method delete(queue is empty)', async () => {
    queueMemoryStorage.delete.mockResolvedValue(false);
    const res = await queueServise.delete(patientName);
    expect(res).toEqual(false);
  });

  test('method getLength', async () => {
    queueMemoryStorage.getLength.mockResolvedValue(3);
    const res = await queueServise.getLength();
    expect(res).toEqual(3);
  });

  test('method getLength(queue is empty)', async () => {
    queueMemoryStorage.getLength.mockResolvedValue(0); // empty
    const res = await queueServise.getLength();
    expect(res).toEqual(0);
  });
});
