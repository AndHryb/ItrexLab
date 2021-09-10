import decodeToken from '../../../helpers/decode-token.js';

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

      patientsList.forEach((elem, i) => {
        const { dataValues } = elem;

        const resolutionsForThisPatient = [];

        dataValues.resolutionsSQLDBs.forEach((resElem, i) => {
          let resolutionValue;
          if (this.TTL < (new Date()).getTime() - (new Date(resElem.dataValues.createdAt)).getTime()) {
            resolutionValue = `The resolution for patient ${elem.dataValues.name} has expired`;
          } else { resolutionValue = resElem.dataValues.resolution; }
          resolutionsForThisPatient[i] = {
            resolution: resolutionValue,
            id: resElem.dataValues.id,
          };
        });

        if (resolutionsForThisPatient.length !== 0) {
          res[i] = {
            name: dataValues.name,
            resolutions: resolutionsForThisPatient,
            regTime: dataValues.createdAt,
          };
        }
      });

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
    try {
      const queueLength = await this.queueRepository.getLength();
      if (queueLength === 0) {
        return false;
      }
      const patientId = await this.queueRepository.delete();
      if (!patientId){
        return false
      }
      await this.resolutionRepository.add(patientId, resolution);

      return patientId;
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
