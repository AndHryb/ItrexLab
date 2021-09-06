import express from 'express';
import path from 'path';
import Ajv from 'ajv';
import events from 'events';
import { __dirname } from '../main.js';
import { injector } from '../injector.js';
import { checkNameSchema } from '../helpers/validation-schems-ajv/checkName.js';
import { STATUSES } from '../constants.js';

const emitter = new events.EventEmitter();
const queueRouter = express.Router();
const ajv = new Ajv();
const queueController = injector.getQueueController();

queueRouter.get('/', (req, res) => {
  console.log('path/');
  console.log(req.headers);
  res.sendFile(path.resolve(__dirname, 'static', 'patient.html'));
});

queueRouter.get('/connect', (req, res) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });
  emitter.on('next', (name) => {
    res.write(`data: ${JSON.stringify(name)} \n\n`);
  });
});

queueRouter.get('/next_in_queue', async (req, res) => {
  const result = await queueController.getNext();
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
  console.log('next>>>>');
  console.log(result.value);
  emitter.emit('next', result.value);
});

queueRouter.get('/in_queue', async (req, res) => {
  console.log(req.headers.authorization);
  const result = await queueController.addToQueue(req.headers.authorization);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

export default queueRouter;
