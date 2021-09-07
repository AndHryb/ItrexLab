import decodeToken from '../../helpers/decode-token.js';

export default class ResolutionService {
  constructor(queueRepository, resolutionRepository, patientRepository, TTL) {
    this.queueRepository = queueRepository;
    this.resolutionRepository = resolutionRepository;
    this.patientRepository = patientRepository;
    this.TTL = TTL;
  }

  async getResolutionsByName(name) {
    let res = false;
    try {
      const patientsList = await this.patientRepository.getByName(name);
      if (patientsList.length === 0) {
        return res;
      }

      res = [];
      for (const elem of patientsList) {
        const {dataValues} = await this.resolutionRepository.getByPatientId(elem.patientId);
        if (!dataValues) {
          continue;
        }

        if (this.TTL < (new Date()).getTime() - (new Date(dataValues.createdAt)).getTime()) {
          dataValues.resolution = `The resolution for patient ${elem.name} has expired`;
        }

        if (dataValues.resolution) {
          res.push({
            name: elem.name,
            id: dataValues.id,
            resolution: dataValues.resolution,
            regTime: elem.regTime,
          });
        }
      }

      return res;
    } catch (err) {
      console.log(`Resolution service add error :${err.name} : ${err.message}`);
    }
  }

  async getResolutionByToken(token) {
    try {
      const decoded = decodeToken(token);
      const patient = await this.patientRepository.getByUserId(decoded.userId);
      const result = await this.resolutionRepository.getByPatientId(patient.id);

      return result;
    } catch (err) {
      console.log(`Resolution service getByID error :${err.name} : ${err.message}`);
    }
  }

  async addResolution(resolution) {
    const res = false;
    try {
      const queueLength = await this.queueRepository.getLength();
      if (queueLength === 0) {
        return res;
      }
      const nextInQueuePatientName = await this.queueRepository.delete();
      const result = await this.resolutionRepository.add(nextInQueuePatientName, resolution);
      const patientData = await this.patientRepository.getById(nextInQueuePatientName);
      if (result) {
        return patientData;
      }
    } catch (err) {
      console.log(`Resolution service getByID error :${err.name} : ${err.message}`);
    }
  }

  async getById(resolutionId) {
    try {
      return await this.resolutionRepository.getById(resolutionId);
    } catch (err) {
      console.log(`Resolution service getByID error :${err.name} : ${err.message}`);
    }
  }

  async getByPatientId(patieniId) {
    try {
      return await this.resolutionRepository.getByPatientId(patieniId);
    } catch (err) {
      console.log(`Resolution service getByPatientId error :${err.name} : ${err.message}`);
    }
  }

  async delete(resolutionId) {
    try {
      const result = await this.resolutionRepository.delete(resolutionId);
      return result;
    } catch (err) {
      console.log(`Resolution service delete error :${err.name} : ${err.message}`);
    }
  }
}
