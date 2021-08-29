import { resolutionInmemoryRepository } from '../resolution/repository/resolution-inmemory-repository.js';

describe('resolution servise unit test', () => {
  let resolutionData;
  const regTime = 1630189224236;
  const resolution = 'schizophrenia';
  const resolutionId1 = '0e84252b-6af5-417f-aedd-90e50d5682cb';
  const resolutionId2 = '7d5e6c18-3722-4a85-9de9-57e9d5818e1f';
  const resolutionId3 = 'aba9f1a4-e3b2-46de-b5f1-765f56a1d8ef';

  beforeEach(() => {
    const regTime = 1630189224236;
    const resolutionId1 = '0e84252b-6af5-417f-aedd-90e50d5682cb';
    const resolutionId2 = '7d5e6c18-3722-4a85-9de9-57e9d5818e1f';
    const resolutionId3 = 'aba9f1a4-e3b2-46de-b5f1-765f56a1d8ef';
    const resolutionId4 = 'e115b3e3-cfab-4f4b-ba55-f07301b9aa10';
    resolutionData = {
      [resolutionId1]: { patientId: 1, resolution: 'schizophrenia', regTime },
      [resolutionId2]: { patientId: 2, resolution: 'all fine', regTime },
      [resolutionId3]: { patientId: 3, resolution: 'so bad', regTime },
      [resolutionId4]: { patientId: 4, resolution: 'blabla', regTime },
    };
  });

  test('get resolution data(storage has data)', () => {
    resolutionInmemoryRepository.data = resolutionData;
    const res = resolutionInmemoryRepository.getById(resolutionId1);
    expect(res).toEqual(resolutionData[resolutionId1]);
  });

  test('get resolution data(storage has data,data hasn\'t key)', () => {
    resolutionInmemoryRepository.data = resolutionData;
    const res = resolutionInmemoryRepository.getById('2222');
    expect(res).toEqual(false);
  });

  test('get resolution data(storage empty)', () => {
    resolutionInmemoryRepository.data = {};
    const res = resolutionInmemoryRepository.getById(resolutionId2);
    expect(res).toEqual(false);
  });

  test('get resolution by patient id', () => {
    resolutionInmemoryRepository.data = resolutionData;
    const res = resolutionInmemoryRepository.getByPatientId(2);
    console.log(res);
    expect(res).toEqual({
      resolutionId: resolutionId2,
      patientId: 2,
      resolution: 'all fine',
      regTime: 1630189224236,
    });
  });

  test('add resolution data', () => {
    resolutionInmemoryRepository.data = {};
    resolutionInmemoryRepository.add(2, 'ddff');
    expect(Object.keys(resolutionInmemoryRepository).length).toEqual(1);

  });

  test('delete resolution data(storage has data)', () => {
    resolutionInmemoryRepository.data = resolutionData;
    const res = resolutionInmemoryRepository.delete(resolutionId3);
    expect(res).toEqual(true);
    expect(resolutionId3 in resolutionData).toEqual(false);
  });

  test('delete resolution data(storage hasn\'t data)', () => {
    resolutionInmemoryRepository.data = {222: 'aaa',};
    const res = resolutionInmemoryRepository.delete(222);
    expect(res).toEqual(true);
    expect(222 in resolutionInmemoryRepository.data).toEqual(false);
  });
});
