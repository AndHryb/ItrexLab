import ResolutionService from '../resolution/service/resolution-service.js';
import { resolutionInmemoryRepository } from '../resolution/repository/resolution-inmemory-repository.js';

jest.mock('../resolution/repository/resolution-inmemory-repository.js');

describe('resolution service unit test', () => {
  const resolutionService = new ResolutionService(resolutionInmemoryRepository);
  let resolutionData;
  const patientId = '111';
  const resolutionId = '222';
  const resolutionVal = 'schizophrenia';
  const testTime = (new Date()).getTime();

  beforeEach(() => {
    resolutionData = {
      resolutionId,
      patientId,
      resolution: 'schizophrenia',
      regTime: testTime,
    };
  });
  test('add resolution data', async () => {
    resolutionInmemoryRepository.add.mockResolvedValue(resolutionId);
    const res = await resolutionService.add(patientId, resolutionVal);
    expect(res).toEqual(resolutionId);
  });

  test('get resolution data by resolution id(repository has data)', async () => {
    resolutionInmemoryRepository.getById.mockResolvedValue(resolutionData);
    const res = await resolutionService.getById(resolutionId);
    expect(res).toEqual(resolutionData);
  });

  test('get resolution data by resolution id(repository hasn\'t data)', async () => {
    resolutionInmemoryRepository.getById.mockResolvedValue(false);
    const res = await resolutionService.getById(resolutionId);
    expect(res).toEqual(false);
  });

  test('get resolution data by patient id(repository has data)', async () => {
    resolutionInmemoryRepository.getByPatientId.mockResolvedValue(resolutionData);
    const res = await resolutionService.getByPatientId(resolutionId);
    expect(res).toEqual(resolutionData);
  });

  test('get resolution data by patient id(repository hasn\'t data)', async () => {
    resolutionInmemoryRepository.getByPatientId.mockResolvedValue(false);
    const res = await resolutionService.getByPatientId(resolutionId);
    expect(res).toEqual(false);
  });

  test('delete resolution data(repository has data)', async () => {
    resolutionInmemoryRepository.delete.mockResolvedValue(true);
    const res = await resolutionService.delete(resolutionId);
    expect(res).toEqual(true);
  });

  test('delete resolution data(repository hasn\'t data)', async () => {
    resolutionInmemoryRepository.delete.mockResolvedValue(false);
    const res = await resolutionService.delete(resolutionId);
    expect(res).toEqual(false);
  });
});
