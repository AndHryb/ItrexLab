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
      console.log(`Queue Servise get error : ${err.name} : ${err.message}`);
    }
  }

  async add(name) {
    try {
      const createdPatient = await this.patientRepository.add(name);
      await this.queueRepository.add(createdPatient);

      return name;
    } catch (err) {
      console.log(`QueueServise add error : ${err.name} : ${err.message}`);
    }
  }

  async delete() {
    try {
      return await this.queueRepository.delete();
    } catch (err) {
      console.log(`QueueServise delete error : ${err.name} : ${err.message}`);
    }
  }

  async getLength() {
    try {
      return await this.queueRepository.getLength();
    } catch (err) {
      console.log(`QueueServise getLength error : ${err.name} : ${err.message}`);
    }
  }
}
