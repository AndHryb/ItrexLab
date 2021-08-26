import QueueService from '../queue/service/queue-service.js';
import { queueInmemoryRepository } from '../queue/repository/queue-inmemory-repository.js';

jest.mock('../queueRepository/storages/queueRepository-memory-storage.js');

describe('queueRepository service unit tests', () => {
  const queueServise = new QueueService(queueInmemoryRepository);
  const patientName = 'Andrei';

  test('method get', async () => {
    queueInmemoryRepository.get.mockResolvedValue(patientName);
    const res = await queueServise.get(patientName);
    expect(res).toEqual(patientName);
  });

  test('method get(queueRepository is empty)', async () => {
    queueInmemoryRepository.get.mockResolvedValue(false);
    const res = await queueServise.get(patientName);
    expect(res).toEqual(false);
  });

  test('method add', async () => {
    queueInmemoryRepository.add.mockResolvedValue(patientName);
    const res = await queueServise.add(patientName);
    expect(res).toEqual(patientName);
  });

  test('method delete', async () => {
    queueInmemoryRepository.delete.mockResolvedValue(patientName);
    const res = await queueServise.delete(patientName);
    expect(res).toEqual(patientName);
  });

  test('method delete(queueRepository is empty)', async () => {
    queueInmemoryRepository.delete.mockResolvedValue(false);
    const res = await queueServise.delete(patientName);
    expect(res).toEqual(false);
  });

  test('method getLength', async () => {
    queueInmemoryRepository.getLength.mockResolvedValue(3);
    const res = await queueServise.getLength();
    expect(res).toEqual(3);
  });

  test('method getLength(queueRepository is empty)', async () => {
    queueInmemoryRepository.getLength.mockResolvedValue(0); // empty
    const res = await queueServise.getLength();
    expect(res).toEqual(0);
  });
});
