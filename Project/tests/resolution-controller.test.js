import { STATUSES} from '../constants.js';
import ResolutionController from '../api/resolution/controllers/resolution-controller.js';
import ResolutionService from '../api/resolution/service/resolution-service.js';
import ResolutionSqlRepository from '../api/resolution/repository/resolution-sql-repository.js';
import SequelizeMock from 'sequelize-mock';


const resolutionsSQLDB = new SequelizeMock();
const resolutionSqlRepository = new ResolutionSqlRepository(resolutionsSQLDB);
const resolutionService = new ResolutionService(resolutionSqlRepository);
const resolutionController = new ResolutionController(resolutionService);

jest.mock('../resolution/service/resolution-service.js');

describe('resolution controller unit test', () => {
  let resolutionData1;
  let patientData1;
  let patientData2;
  let patientList = [];
  const testRegTime = (new Date()).getTime();
  const resolutionId = '111';
  const resolutionVal = 'schizophrenia';

  beforeEach(() => {
    resolutionData1 = {
      resolutionId: '111',
      patienId: '222',
      resolution: 'schizophrenia',
      regTime: testRegTime,
    };
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
      {
        patientId: '232',
        name: 'Andrei',
        regTime: testRegTime,
      },
    ];
  });

  test('get resolutions by name', async () => {
    resolutionService.getResolutionsByName.mockResolvedValue(patientList);
    const res = await resolutionController.getResolutionsByName('Andrei');
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value.resolutions).toEqual(patientList);
    expect(res.value.message).toEqual(`${patientList.length} patient(s) were found`);
  });

  test('get resolution by name(patient storage hasn\'t this name)', async () => {
    resolutionService.getResolutionsByName.mockResolvedValue(false);
    const res = await resolutionController.getResolutionsByName('Andrei');
    expect(res.status).toEqual(STATUSES.NotFound);
    expect(res.value.resolutions).toBeFalsy();
    expect(res.value.message).toEqual(
      'The patient Andrei not found in the database',
    );
  });

  test('add resolution data(queueRepository has patient)', async () => {
    resolutionService.addResolution.mockResolvedValue(patientData1);
    const res = await resolutionController.addResolution(resolutionVal);
    expect(res.status).toEqual(STATUSES.Created);
    expect(res.value).toEqual(patientData1);
  });

  test('add resolution data(queue empty hasn\'t patient)', async () => {
    resolutionService.addResolution.mockResolvedValue(false);
    const res = await resolutionController.addResolution(resolutionVal);
    expect(res.status).toEqual(STATUSES.Conflict);
    expect(res.value.message).toEqual('Can\'t added resolution. There is no one in the queueRepository');
  });

  test('delete resolution data(storage has key)', async () => {
    resolutionService.delete.mockResolvedValue(patientData2);
    const res = await resolutionController.deleteResolution(resolutionId);
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value.message).toEqual(`The resolution  ${resolutionId} deleted`);
  });

  test('delete resolution data(storage hasn\'t key)', async () => {
    resolutionService.delete.mockResolvedValue(false);
    const res = await resolutionController.deleteResolution(resolutionId);
    expect(res.status).toEqual(STATUSES.NotFound);
    expect(res.value.message).toEqual(`The resolution ${resolutionId} not found in the database`);
  });

  test('get resolution by token (token valid)', async () => {
    resolutionService.getResolutionByToken.mockResolvedValue(resolutionData1);
    const res = await resolutionController.getResolutionByToken(resolutionId);
    expect(res.status).toEqual(STATUSES.OK);
    expect(res.value.resolution).toEqual(resolutionData1);
  });

  test('get resolution by token (token invalid)', async () => {
    resolutionService.getResolutionByToken.mockResolvedValue(false);
    const res = await resolutionController.getResolutionByToken(resolutionId);
    expect(res.status).toEqual(STATUSES.NotFound);
    expect(res.value.message).toEqual('The resolution not found in the database.Make an appointment with a doctor.');
  });
});
