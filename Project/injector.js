import redis from 'redis';
import QueueController from './queue/controllers/queue-controller.js';
import ResolutionController from './resolution/controllers/resolution-controller.js';
import QueueService from './queue/service/queue-service.js';
import ResolutionService from './resolution/service/resolution-service.js';
import PatientService from './patient/service/patient-service.js';
import { queueInmemoryRepository } from './queue/repository/queue-inmemory-repository.js';
import QueueRedisRepository from './queue/repository/queue-redis-repository.js';
import { resolutionInmemoryRepository } from './resolution/repository/resolution-inmemory-repository.js';
import ResolutionRedisRepository from './resolution/repository/resolution-redis-repository.js';
import { patientInmemoryRepository } from './patient/repository/patient-inmemory-repository.js';
import PatientRedisRepository from './patient/repository/patient-redis-repository.js';
import { envConfig } from './config.js';

class Injector {
  constructor() {
    if (envConfig.storage.name === 'redis') {
      const client = redis.createClient(envConfig.storage.port);
      client.on('connect', () => {
        console.log('redis storage connected!');
      });
      client.on('error', (error) => {
        console.error(error);
      });
      client.select(0);
      client.flushdb();

      this.queueRepository = new QueueRedisRepository(client);
      this.resolutionRepository = new ResolutionRedisRepository(client);
      this.patientRepository = new PatientRedisRepository(client);
    } else if (envConfig.storage.name === 'memory') {
      this.queueRepository = queueInmemoryRepository;
      this.resolutionRepository = resolutionInmemoryRepository;
      this.patientRepository = patientInmemoryRepository;
    } else {
      this.queueRepository = queueRedisStorage;
      this.resolutionRepository = resolutionRedisStorage;
    }
    this.queueServise = new QueueService(this.patientRepository, this.queueRepository);
    this.resolutionServise = new ResolutionService(this.resolutionRepository, this.resolutionRepository);
    this.patientService = new PatientService(this.patientRepository, this.resolutionRepository);
    this.queueController = new QueueController(this.queueServise);
    this.resolutionController = new ResolutionController(this.queueServise, this.resolutionServise, this.patientService, process.env.TTL);
  }

  getQueueController() {
    return this.queueController;
  }

  getResolutionController() {
    return this.resolutionController;
  }
}
const injector = new Injector();
export { injector };
