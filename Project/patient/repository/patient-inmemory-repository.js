import { v4 as uuidv4 } from 'uuid';

class PatientInmemoryRepository {
  constructor() {
    this.data = {};
  }

  add(name) {
    const patientId = uuidv4();

    this.data[patientId] = {
      name,
      regTime: (new Date()).getTime(),
    };
    return patientId;
  }

  getByName(name) {
    const patientList = [];

    for (const patientId in this.data) {
      if (this.data[patientId].name === name) {
        patientList.push({
          patientId,
          name: this.data[patientId].name,
          regTime: this.data[patientId].regTime,
        });
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
    const res = patientId in this.data;
    delete this.data[patientId];

    return res;
  }
}

const patientInmemoryRepository = new PatientInmemoryRepository();

export { patientInmemoryRepository };
