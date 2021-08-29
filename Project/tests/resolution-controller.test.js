import { STATUSES, TTL } from '../constants.js';
import ResolutionController from '../resolution/controllers/resolution-controller.js';
import ResolutionService from '../resolution/service/resolution-service.js';
import QueueService from '../queue/service/queue-service.js';
import PatientService from '../patient/service/patient-service.js';
import { resolutionInmemoryRepository } from '../resolution/repository/resolution-inmemory-repository.js';
import { queueInmemoryRepository } from '../queue/repository/queue-inmemory-repository.js';
import { patientInmemoryRepository } from '../patient/repository/patient-inmemory-repository.js';

jest.mock('../resolution/service/resolution-service.js');
jest.mock('../queue/service/queue-service.js');
jest.mock('../patient/service/patient-service.js');

describe('resolution controller unit test', () => {
  const resolutionService = new ResolutionService(resolutionInmemoryRepository);
  const queueService = new QueueService(queueInmemoryRepository);
  const patientService = new PatientService(patientInmemoryRepository);
  const resolutionController = new ResolutionController(queueService, resolutionService, patientService, TTL);

  let resolutionData1;
  let resolutionData2;
  let patientData1;
  let patientData2;
  let patientList = [];
  const testRegTime = (new Date()).getTime();
  const resolutionId = '111';
  const patientId = '222'
  const resolutionVal = 'schizophrenia';

  beforeEach(() => {
    resolutionData1 = {
      resolutionId: '111',
      patienId: '222',
      resolution: 'schizophrenia',
      regTime: testRegTime,
    };
    // resolutionData2 = {
    //   resolution: 'schizophrenia',
    //   patientId: '232',
    //   regTime: testRegTime,
    // };
    patientData1 = {
      name: 'Andrei',
      regTime: testRegTime,
    };
    patientData2 = {
      name: 'Bob',
      regTime: testRegTime,
    };
    patientList = [
      {
        patientId: '222',
        name: 'Andrei',
        regTime: testRegTime,
      },
    ];
  });

  test('get resolutions by name', async () => {
    patientService.getByName.mockResolvedValue(patientList);
    resolutionService.getByPatientId.mockResolvedValue(resolutionData1);
    const res = await resolutionController.getResolutionsByName('Andrei');
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value).toEqual([{
      name: 'Andrei',
      id: '111',
      resolution: 'schizophrenia',
      regTime: testRegTime,
    }]);
  });

  test('get resolution by name(patient storage hasn\'t this name)', async () => {
    patientService.getByName.mockResolvedValue([]);
    resolutionService.getByPatientId.mockResolvedValue(resolutionData1);
    const res = await resolutionController.getResolutionsByName('Andrei');
    expect(res.status).toEqual(STATUSES.NotFound);
    expect(res.value).toEqual(
      'The patient Andrei not found in the database',
    );
  });

  test('add resolution data(queueRepository has patient)', async () => {
    queueService.getLength.mockResolvedValue(1);
    queueService.delete.mockResolvedValue(patientId);
    resolutionService.add.mockResolvedValue(resolutionId);
    patientService.getById.mockResolvedValue(patientData1);

    const res = await resolutionController.addResolution(resolutionVal);
    expect(res.status).toEqual(STATUSES.Created);
    expect(res.value).toEqual(`Added resolution for ${patientData1.name}`);
  });

  test('add resolution data(queue empty hasn\'t patient)', async () => {
    queueService.getLength.mockResolvedValue(0);
    queueService.delete.mockResolvedValue(patientId);
    resolutionService.add.mockResolvedValue(resolutionId);
    patientService.getById.mockResolvedValue(patientData1);

    const res = await resolutionController.addResolution(resolutionVal);
    expect(res.status).toEqual(STATUSES.PreconditionFailed);
    expect(res.value).toEqual('Can\'t added resolution. There is no one in the queueRepository');
  });

  test('delete resolution data(storage has key)', async () => {
    resolutionService.delete.mockResolvedValue(true);
    const res = await resolutionController.deleteResolution(resolutionId);
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value).toEqual(`The resolution  ${resolutionId} deleted`);
  });

  test('delete resolution data(storage hasn\'t key)', async () => {
    resolutionService.delete.mockResolvedValue(false);
    const res = await resolutionController.deleteResolution(resolutionId);
    expect(res.status).toEqual(STATUSES.NotFound);
    expect(res.value).toEqual(`The resolution ${resolutionId} not found in the database`);
  });
});
