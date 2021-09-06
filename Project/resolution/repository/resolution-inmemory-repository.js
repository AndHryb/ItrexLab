import { v4 as uuidv4 } from 'uuid';

class ResolutionInmemoryRepository {
  constructor() {
    this.data = {};
  }

  add(patientId, resolution) {
    const resolutionId = uuidv4();
    this.data[resolutionId] = {
      resolution,
      patientId,
      regTime: (new Date()).getTime(),
    };

    return resolutionId;
  }

  getById(resolutionId) {
    if (!(resolutionId in this.data)) {
      return false;
    }
    return this.data[resolutionId];
  }

  getByPatientId(patientId) {
    const keys = Object.keys(this.data);
    let result;
    keys.forEach((elem) => {
      if (this.data[elem].patientId === patientId) {
        result = {
          resolutionId: elem,
          patientId,
          resolution: this.data[elem].resolution,
          regTime: this.data[elem].regTime,
        };
      }
    });

    if (!result) {
      return false;
    }

    return result;
  }

  delete(resolutionId) {
    const result = this.getById(resolutionId);
    delete this.data[resolutionId];
    if(!result){
      return false;
    }
    return result.patientId;
  }
}

const resolutionInmemoryRepository = new ResolutionInmemoryRepository();
export { resolutionInmemoryRepository };
