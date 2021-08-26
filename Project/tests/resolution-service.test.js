import ResolutionService from '../resolution/service/resolution-service.js';
import { resolutionInmemoryRepository } from '../resolution/repository/resolution-inmemory-repository.js';

jest.mock('../resolution/storages/resolution-memory-storage.js');

describe('resolution servise unit test', () => {
  const resolutionService = new ResolutionService(resolutionInmemoryRepository);
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
    resolutionInmemoryRepository.get.mockResolvedValue(resolutionData);
    const res = await resolutionService.get(resolutionKey);
    expect(res).toEqual(resolutionData);
  });

  test('get resolution data(storage hasn\'t data)', async () => {
    resolutionInmemoryRepository.get.mockResolvedValue(false);
    const res = await resolutionService.get(resolutionKey);
    expect(res).toEqual(false);
  });

  test('add resolution data', async () => {
    resolutionInmemoryRepository.add.mockResolvedValue(true);
    const res = await resolutionService.add(resolutionKey);
    expect(res).toEqual(true);
  });

  test('delete resolution data(storage has data)', async () => {
    resolutionInmemoryRepository.delete.mockResolvedValue(true);
    const res = await resolutionService.delete(resolutionKey);
    expect(res).toEqual(true);
  });

  test('delete resolution data(storage hasn\'t data)', async () => {
    resolutionInmemoryRepository.delete.mockResolvedValue(false);
    const res = await resolutionService.delete(resolutionKey);
    expect(res).toEqual(false);
  });
});
