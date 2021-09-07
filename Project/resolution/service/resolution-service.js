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

      console.log(patientsList);
      res = [];
      for (const elem of patientsList) {
        const result = await this.resolutionRepository.getByPatientId(elem.patientId);
        if (!result) {
          continue;
        }

        if (this.TTL < (new Date()).getTime() - result.regTime) {
          console.log(`time  ${this.TTL}` < (new Date()).getTime() - result.regTime);
          result.resolution = `The resolution for patient ${elem.name} has expired`;
        }

        if (result.resolution) {
          res.push({
            name: elem.name,
            id: result.id,
            resolution: result.resolution,
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
