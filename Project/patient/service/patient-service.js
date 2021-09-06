//этот сервис не используеться

export default class PatientService {
  constructor(patientRepository, resolutionRepository) {
    this.patientRepository = patientRepository;
    this.resolutionRepository = resolutionRepository;
  }

  async add(name) {
    try {
      const result = await this.patientRepository.add(name);

      return result;
    } catch (err) {
      console.log(`Patient service add error :${err.name} : ${err.message}`);
    }
  }

  async getByName(name) {
    try {
      const result = await this.patientRepository.getByName(name);
      return result;
    } catch (err) {
      console.log(`Patient service getByName error :${err.name} : ${err.message}`);
    }
  }

  async getById(patientId) {
    try {
      const result = await this.patientRepository.getById(patientId);
      return result;
    } catch (err) {
      console.log(`Resolution service get error :${err.name} : ${err.message}`);
    }
  }

  async delete(patientId) {
    try {
      const result = await this.patientRepository.delete(patientId);
      const resolutionData = await this.resolutionRepository.getByPatientId(patientId);
      await this.resolutionRepository.delete(resolutionData.resolutionId)
      return result;
    } catch (err) {
      console.log(`Resolution service delete error :${err.name} : ${err.message}`);
    }
  }
}
