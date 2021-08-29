import { patientInmemoryRepository } from '../patient/repository/patient-inmemory-repository.js';

describe('patient repository unit test', () => {
  const patientName = 'Andrei';
  const testData = (new Date()).getTime();
  let patientData;

  beforeEach(() => {
    patientData = {
      111: { name: 'Andrei', regTime: testData },
      222: { name: 'Andrei', regTime: testData },
      333: { name: 'Sergio', regTime: testData },
    };
  });

  test('add in repository', () => {
    patientInmemoryRepository.add(patientName);
    expect(Object.keys(patientInmemoryRepository.data).length).toEqual(1);
  });

  test('get by patient name => list data', () => {
    patientInmemoryRepository.data = patientData;
    const res = patientInmemoryRepository.getByName(patientName);
    expect(res).toEqual([
      { patientId: '111', name: patientName, regTime: testData },
      { patientId: '222', name: patientName, regTime: testData },
    ]);
  });

  test('get by patient name => list data(repository empty)', () => {
    patientInmemoryRepository.data = {};
    const res = patientInmemoryRepository.getByName(patientName);
    expect(res).toEqual([]);
  });

  test('get by patient id =>data', () => {
    patientInmemoryRepository.data = patientData;
    const res = patientInmemoryRepository.getById('333');
    expect(res).toEqual({ name: 'Sergio', regTime: testData });
  });

  test('get by patient id => data(repository empty)', () => {
    patientInmemoryRepository.data = {};
    const res = patientInmemoryRepository.getById('333');
    expect(res).toEqual(false);
  });

  test('delete by patient id => boolean', () => {
    patientInmemoryRepository.data = patientData;
    const res = patientInmemoryRepository.delete('333');
    expect(res).toEqual(true);
    expect(333 in patientInmemoryRepository.data).toEqual(false);
  });

  test('delete by patient id => boolean(repository empty)', () => {
    patientInmemoryRepository.data = patientData;
    const res = patientInmemoryRepository.delete('333');
    expect(res).toEqual(true);
    expect(333 in patientInmemoryRepository.data).toEqual(false);
  });
});
