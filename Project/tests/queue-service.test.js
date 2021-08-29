import QueueService from '../queue/service/queue-service.js';
import { queueInmemoryRepository } from '../queue/repository/queue-inmemory-repository.js';
import { patientInmemoryRepository } from '../patient/repository/patient-inmemory-repository.js';

jest.mock('../queue/repository/queue-inmemory-repository.js');
jest.mock('../patient/repository/patient-inmemory-repository.js');

describe('queueRepository service unit tests', () => {
  const queueService = new QueueService(patientInmemoryRepository, queueInmemoryRepository);
  const patientName = 'Andrei';
  const patientID = '0e84252b-6af5-417f-aedd-90e50d5682cb';
  const patientData = {
    name: 'Andrei',
    regTime: 1630189224236,
  };

  test('method get', async () => {
    queueInmemoryRepository.get.mockResolvedValue(patientID);
    patientInmemoryRepository.getById.mockResolvedValue(patientData);
    const res = await queueService.get();
    expect(res).toEqual('Andrei');
  });

  test('method get(queueRepository is empty)', async () => {
    queueInmemoryRepository.get.mockResolvedValue(false);
    patientInmemoryRepository.getById.mockResolvedValue(false);
    const res = await queueService.get();
    expect(res).toEqual(undefined);
  });

  test('method add', async () => {
    patientInmemoryRepository.add.mockResolvedValue(patientID);
    queueInmemoryRepository.add.mockResolvedValue(patientID);
    const res = await queueService.add(patientName);
    expect(res).toEqual(patientName);
  });

  test('method delete', async () => {
    queueInmemoryRepository.delete.mockResolvedValue(patientID);
    const res = await queueService.delete();
    expect(res).toEqual(patientID);
  });

  test('method delete(queueRepository is empty)', async () => {
    queueInmemoryRepository.delete.mockResolvedValue(false);
    const res = await queueService.delete(patientName);
    expect(res).toEqual(false);
  });

  test('method getLength', async () => {
    queueInmemoryRepository.getLength.mockResolvedValue(3);
    const res = await queueService.getLength();
    expect(res).toEqual(3);
  });

  test('method getLength(queueRepository is empty)', async () => {
    queueInmemoryRepository.getLength.mockResolvedValue(0); // empty
    const res = await queueService.getLength();
    expect(res).toEqual(0);
  });
});
