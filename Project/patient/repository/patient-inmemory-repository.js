import { v4 as uuidv4 } from 'uuid';

class PatientInmemoryRepository {
  constructor() {
    this.data = {};
  }

  add(name, resolutionId) {
    const patientId = uuidv4();

    this.data[patientId] = {
      name,
      resolutionId,
      regTime: (new Date()).getTime(),
    };
    return patientId;
  }

  setResolutionID(patientId, resolutionId) {
    this.data[patientId].resolutionId = resolutionId;

    if (!resolutionId) { return false; }

    return true;
  }

  getByName(name) {
    const patientList = [];

    for (const patientId in this.data) {
      if (this.data[patientId].name === name) {
        patientList.push(this.data[patientId]);
      }
    }

    return patientList;
  }

  getById(patientId) {
    if (!(patientId in this.data)) {
      return false;
    }
    return this.data[patientId];
  }

  delete(patientId) {
    return delete this.data[patientId];
  }
}

const patientInmemoryRepository = new PatientInmemoryRepository();

export { patientInmemoryRepository };
