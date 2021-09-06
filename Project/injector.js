import redis from 'redis';
import QueueController from './queue/controllers/queue-controller.js';
import ResolutionController from './resolution/controllers/resolution-controller.js';
import UserController from './users/controller/user-controller.js';
import QueueService from './queue/service/queue-service.js';
import ResolutionService from './resolution/service/resolution-service.js';
import PatientService from './patient/service/patient-service.js';
import UserService from './users/service/user-service.js';
import { queueInmemoryRepository } from './queue/repository/queue-inmemory-repository.js';
import QueueRedisRepository from './queue/repository/queue-redis-repository.js';
import { resolutionInmemoryRepository } from './resolution/repository/resolution-inmemory-repository.js';
import ResolutionRedisRepository from './resolution/repository/resolution-redis-repository.js';
import ResolutionSqlRepository from './resolution/repository/resolution-sql-repository.js';
import { patientInmemoryRepository } from './patient/repository/patient-inmemory-repository.js';
import PatientRedisRepository from './patient/repository/patient-redis-repository.js';
import PatientSqlRepository from './patient/repository/patient-sql-repository.js';
import UserSqlRepository from './users/repository/user-sql-repository.js';
import sequelizeInit from './config-data-bases/sequelize/sequelize-init.js';
import redisInit from './config-data-bases/redis/redis-init.js';
import { TTL } from './constants.js';

import { envConfig } from './config.js';


class Injector {
  constructor(storageType) {
    if (storageType === 'redis') {
      const client = redisInit();
      this.queueRepository = new QueueRedisRepository(client);
      this.resolutionRepository = new ResolutionRedisRepository(client);
      this.patientRepository = new PatientRedisRepository(client);
    } else if (storageType === 'memory') {
      this.queueRepository = queueInmemoryRepository;
      this.resolutionRepository = resolutionInmemoryRepository;
      this.patientRepository = patientInmemoryRepository;
    } else if (storageType === 'SQL') {
      const sequelize = sequelizeInit();
      const { resolutionsSQLDB, patientsSQLDB, usersSQLDB } = sequelize.models;
      this.resolutionRepository = new ResolutionSqlRepository(resolutionsSQLDB);
      this.patientRepository = new PatientSqlRepository(patientsSQLDB);
      this.userRepository = new UserSqlRepository(usersSQLDB);
      const client = redisInit();
      this.queueRepository = new QueueRedisRepository(client);
    }
    this.queueServise = new QueueService(this.patientRepository, this.queueRepository);
    this.resolutionServise = new ResolutionService(this.queueRepository, this.resolutionRepository, this.patientRepository, TTL);
    this.userService = new UserService(this.userRepository, this.patientRepository);
    this.patientService = new PatientService(this.patientRepository, this.resolutionRepository);
    this.queueController = new QueueController(this.queueServise, this.userService);
    this.resolutionController = new ResolutionController(this.resolutionServise);
    this.userController = new UserController(this.userService);
  }

  getQueueController() {
    return this.queueController;
  }

  getResolutionController() {
    return this.resolutionController;
  }

  getUserController() {
    return this.userController;
  }
}
const injector = new Injector(envConfig.storage.name);
export { injector };
