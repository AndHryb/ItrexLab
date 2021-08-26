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

  delete(resolutionId) {
    return delete this.data[resolutionId];
  }
}

const resolutionInmemoryRepository = new ResolutionInmemoryRepository();
export { resolutionInmemoryRepository };
