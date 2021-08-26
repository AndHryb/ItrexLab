import { resolutionInmemoryRepository } from '../resolution/repository/resolution-inmemory-repository.js';

describe('resolution servise unit test', () => {
  let resolutionData;
  const resolutionKey = 'Andrei';
  const resolutionVal = 'schizophrenia';

  beforeEach(() => {
    resolutionData = {
      Andrei: { name: 'Andrei', resolution: 'schizophrenia', regTime: (new Date()).getTime() },
      Sergio: { name: 'Sergio', resolution: 'all fine', regTime: (new Date()).getTime() },
      Bob: { name: 'Bob', resolution: 'so bad', regTime: (new Date()).getTime() },
    };
  });

  test('get resolution data(storage has data)', () => {
    resolutionInmemoryRepository.data = resolutionData;
    const res = resolutionInmemoryRepository.get(resolutionKey);
    expect(res).toEqual(resolutionData[resolutionKey]);
  });

  test('get resolution data(storage has data,data hasn\'t key)', () => {
    resolutionInmemoryRepository.data = resolutionData;
    const res = resolutionInmemoryRepository.get('Elena');
    expect(res).toEqual(false);
  });

  test('get resolution data(storage hasn\'t data)', () => {
    resolutionInmemoryRepository.data = {};
    const res = resolutionInmemoryRepository.get(resolutionKey);
    expect(res).toEqual(false);
  });

  test('add resolution data', () => {
    resolutionInmemoryRepository.data = {};
    const res = resolutionInmemoryRepository.add(resolutionKey, resolutionVal);
    expect(res).toEqual(true);
    expect(resolutionInmemoryRepository.data[resolutionKey].name).toEqual(resolutionKey);
    expect(resolutionInmemoryRepository.data[resolutionKey].resolution).toEqual(resolutionVal);
    expect(resolutionInmemoryRepository.data[resolutionKey].regTime).toBeLessThanOrEqual((new Date()).getTime());
  });

  test('delete resolution data(storage has data)', () => {
    resolutionInmemoryRepository.data = resolutionData;
    const res = resolutionInmemoryRepository.delete(resolutionKey);
    expect(res).toEqual(true);
    expect(resolutionKey in resolutionData).toEqual(false);
  });

  test('delete resolution data(storage hasn\'t data)', () => {
    resolutionInmemoryRepository.data = {};
    const res = resolutionInmemoryRepository.delete(resolutionKey);
    expect(res).toEqual(false);
  });
});
