import { resolutionMemoryStorage } from '../resolution/storages/resolution-memory-storage.js';

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
    resolutionMemoryStorage.data = resolutionData;
    const res = resolutionMemoryStorage.get(resolutionKey);
    expect(res).toEqual(resolutionData[resolutionKey]);
  });

  test('get resolution data(storage has data,data hasn\'t key)', () => {
    resolutionMemoryStorage.data = resolutionData;
    const res = resolutionMemoryStorage.get('Elena');
    expect(res).toEqual(false);
  });

  test('get resolution data(storage hasn\'t data)', () => {
    resolutionMemoryStorage.data = {};
    const res = resolutionMemoryStorage.get(resolutionKey);
    expect(res).toEqual(false);
  });

  test('add resolution data', () => {
    resolutionMemoryStorage.data = {};
    const res = resolutionMemoryStorage.add(resolutionKey, resolutionVal);
    expect(res).toEqual(true);
    expect(resolutionMemoryStorage.data[resolutionKey].name).toEqual(resolutionKey);
    expect(resolutionMemoryStorage.data[resolutionKey].resolution).toEqual(resolutionVal);
    expect(resolutionMemoryStorage.data[resolutionKey].regTime).toBeLessThanOrEqual((new Date()).getTime());
  });

  test('delete resolution data(storage has data)', () => {
    resolutionMemoryStorage.data = resolutionData;
    const res = resolutionMemoryStorage.delete(resolutionKey);
    expect(res).toEqual(true);
    expect(resolutionKey in resolutionData).toEqual(false);
  });

  test('delete resolution data(storage hasn\'t data)', () => {
    resolutionMemoryStorage.data = {};
    const res = resolutionMemoryStorage.delete(resolutionKey);
    expect(res).toEqual(false);
  });
});
