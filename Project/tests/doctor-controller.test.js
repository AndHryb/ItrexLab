import DoctorController from '../api/doctor/controller/doctor.controller.js';
import DoctorService from '../api/doctor/service/doctor.service.js';
import { STATUSES, NO_DOC_MSG } from '../constants.js';

const doctorController = new DoctorController(new DoctorService());
const doctorService = doctorController.service;

describe('doctor controller have to', () => {

    test('get all doctors', async () => {
        doctorService.getDoctors = jest.fn(() => [{ name: 'joe', id: '4', userId: '10' }]);
        const res = await doctorController.getDoctors();

        expect(res.status).toBe(STATUSES.OK);
        expect(res.value[0].name).toBe('joe');
        expect(res.value[0].id).toBe('4');
        expect(res.value[0].userId).toBe('10');
    });

    test('get by user id', async () => {
        doctorService.getByUserId = jest.fn((userId) => ({ name: 'joe', id: '4', userId }));
        const res = await doctorController.getByUserId('10');

        expect(res.name).toBe('joe');
        expect(res.id).toBe('4');
        expect(res.userId).toBe('10');
    });

    test('get by id', async () => {
        doctorService.getById = jest.fn((id) => ({ name: 'joe', id, userId: '10' }));
        const res = await doctorController.getById('4');

        expect(res.name).toBe('joe');
        expect(res.id).toBe('4');
        expect(res.userId).toBe('10');
    });

    test('get spec', async () => {
        doctorService.getSpec = jest.fn((id) => ({ name: 'joe', id, userId: '10', specialties: {name:'surgery'} }));
        const res = await doctorController.getSpec('4');

        expect(res.status).toBe(STATUSES.OK);
        expect(res.value.name).toBe('surgery');
    });

    test('failed with get by user id', async () => {
        doctorService.getByUserId = jest.fn((userId) => { throw new Error(NO_DOC_MSG) });
        const res = await doctorController.getByUserId('10');

        expect(res).toBeInstanceOf(Error);
        expect(res.message).toBe(NO_DOC_MSG);
    });

    test('failed with get by id', async () => {
        doctorService.getById = jest.fn((id) => { throw new Error(NO_DOC_MSG) });
        const res = await doctorController.getById('10');

        expect(res).toBeInstanceOf(Error);
        expect(res.message).toBe(NO_DOC_MSG);
    });

    test('failed with get all doctors', async () => {
        doctorService.getDoctors = jest.fn(() => { throw new Error(NO_DOC_MSG) });
        const res = await doctorController.getDoctors();

        expect(res.value).toBeInstanceOf(Error);
        expect(res.value.message).toBe(NO_DOC_MSG);
        expect(res.status).toBe(STATUSES.NoContent);
    });
});