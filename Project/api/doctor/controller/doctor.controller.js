import { STATUSES } from '../../../constants.js';
import Request from '../../../helpers/request.js';

export default class DoctorController {
    constructor(service) {
        this.service = service;
    }

    async getDoctors() {
        const result = new Request();
        try {
            const res = await this.service.getDoctors();
            result.status = STATUSES.OK;
            result.value = res
            return result;
        } catch(err) {
            console.log(err);
            result.status = STATUSES.ServerError;
            result.value = err;
            return result;
        }
    }

    async getByUserId(userId) {
        try {
            const res = await this.service.getByUserId(userId);
            return res;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async getSpec(docId) {
        try {
            const res = await this.service.getSpec(docId);
            return res.specialties;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async getById(id) {
        try {
            const res = await this.service.getById(id);
            return res;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}