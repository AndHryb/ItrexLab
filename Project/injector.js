import QueueController from './queue/controllers/queue-controller.js';
import ResolutionController from './resolution/controllers/resolution-controller.js';
import QueueService from './queue/service/queue-service.js';
import ResolutionService from './resolution/service/resolution-service.js';
import { queueMemoryStorage } from './queue/storages/queue-memory-storage.js';
import { queueRedisStorage } from './queue/storages/queue-redis-storage.js';
import { resolutionMemoryStorage } from './resolution/storages/resolution-memory-storage.js';
import { resolutionRedisStorage } from './resolution/storages/resolution-redis-storage.js';
import { TTL } from './constants.js';
import { envConfig } from './config.js';

class Injector {
  constructor() {
    if (envConfig.storage.name === 'redis') {
      this.queueStorage = queueRedisStorage;
      this.resolutionStorage = resolutionRedisStorage;
    } else if (envConfig.storage.name === 'memory') {
      this.queueStorage = queueMemoryStorage;
      this.resolutionStorage = resolutionMemoryStorage;
    } else {
      this.queueStorage = queueRedisStorage;
      this.resolutionStorage = resolutionRedisStorage;
    }
    this.queueServise = new QueueService(this.queueStorage);
    this.resolutionServise = new ResolutionService(this.resolutionStorage);
    this.queueController = new QueueController(this.queueServise);
    this.resolutionController = new ResolutionController(this.queueServise, this.resolutionServise, TTL);
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
