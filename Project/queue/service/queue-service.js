export default class QueueService {
  constructor(patientRepository, queueRepository) {
    this.patientRepository = patientRepository;
    this.queueRepository = queueRepository;
  }

  async get() {
    try {
      const result = await this.queueRepository.get();
      const patient = await this.patientRepository.getById(result);

      return patient.name;
    } catch (err) {
      console.log(`Queue Service get error : ${err.name} : ${err.message}`);
    }
  }

  async add(patientId) {
    try {
      const result = await this.queueRepository.add(patientId);
      if(result){
        return result;
      }
      return false;
    } catch (err) {
      console.log(`QueueService add error : ${err.name} : ${err.message}`);
    }
  }

  async delete() {
    try {
      return await this.queueRepository.delete();
    } catch (err) {
      console.log(`QueueService delete error : ${err.name} : ${err.message}`);
    }
  }

  async getLength() {
    try {
      return await this.queueRepository.getLength();
    } catch (err) {
      console.log(`QueueService getLength error : ${err.name} : ${err.message}`);
    }
  }
}
