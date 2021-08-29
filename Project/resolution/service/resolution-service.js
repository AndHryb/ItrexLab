export default class ResolutionService {
  constructor(resolutionRepository) {
    this.resolutionRepository = resolutionRepository;
  }

  async add(patientId, resolution) {
    try {
      const result = await this.resolutionRepository.add(patientId, resolution);

      return result;
    } catch (err) {
      console.log(`Resolution service add error :${err.name} : ${err.message}`);
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
