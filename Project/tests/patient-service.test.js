import PatientService from '../patient/service/patient-service.js';
import { patientInmemoryRepository } from '../patient/repository/patient-inmemory-repository.js';
import { resolutionInmemoryRepository } from '../resolution/repository/resolution-inmemory-repository.js';

jest.mock('../patient/repository/patient-inmemory-repository.js');
jest.mock('../resolution/repository/resolution-inmemory-repository.js');

describe('queueRepository service unit tests', () => {
  const patientService = new PatientService(patientInmemoryRepository, resolutionInmemoryRepository);
  const name = 'Andrei';
  const patientId = '111';
  const testTime = (new Date()).getTime();
  const patientDataList = [
    {
      patientId,
      name,
      regTime: testTime,
    },
  ];
  const patientData = { name, testTime };

  test('method add', async () => {
    patientInmemoryRepository.add.mockResolvedValue(patientId);
    const res = await patientService.add(name);
    expect(res).toEqual('111');
  });

  test('method get by patient name => patient data list', async () => {
    patientInmemoryRepository.getByName.mockResolvedValue(patientDataList);
    const res = await patientService.getByName(name);
    expect(res).toEqual(patientDataList);
  });

  test('method get by patient name => patient data list(repository hasn\'t name)', async () => {
    patientInmemoryRepository.getByName.mockResolvedValue([]);
    const res = await patientService.getByName(name);
    expect(res).toEqual([]);
  });

  test('method get by patient id => patient data', async () => {
    patientInmemoryRepository.getById.mockResolvedValue(patientData);
    const res = await patientService.getById(patientId);
    expect(res).toEqual(patientData);
  });

  test('method get by patient id => patient data(repository hasn\'t id)', async () => {
    patientInmemoryRepository.getById.mockResolvedValue(false);
    const res = await patientService.getById(patientId);
    expect(res).toEqual(false);
  });

  test('method delete', async () => {
    patientInmemoryRepository.delete.mockResolvedValue(true);
    resolutionInmemoryRepository.getByPatientId.mockResolvedValue(patientData);
    resolutionInmemoryRepository.delete.mockResolvedValue(true);
    const res = await patientService.delete(patientId);
    expect(res).toEqual(true);
  });

  test('method delete (repository hasn\'t id)', async () => {
    patientInmemoryRepository.delete.mockResolvedValue(false);
    resolutionInmemoryRepository.getByPatientId.mockResolvedValue(patientData);
    resolutionInmemoryRepository.delete.mockResolvedValue(true);
    const res = await patientService.delete(patientId);
    expect(res).toEqual(false);
  });
});
