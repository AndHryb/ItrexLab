import express from 'express';
import path from 'path';
import events from 'events';
import * as cookie from 'cookie';
import { injector } from '../injector.js';
const __dirname = path.resolve();


const emitter = new events.EventEmitter();
const queueRouter = express.Router();
const queueController = injector.getQueueController();
const userController = injector.getUserController();

queueRouter.get('/', async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie);
  const { token } = cookies;
  const checkToken = await userController.getByToken(`Bearer ${token}`);
  if (checkToken.value.patient) {
    res.sendFile(path.resolve(__dirname, 'static', 'patient.html'));
  } else {
    res.sendFile(path.resolve(__dirname, 'static', 'login.html'));
  }
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

queueRouter.get('/next-in-queue', async (req, res) => {
  const result = await queueController.getNext();
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
  emitter.emit('next', result.value);
});

queueRouter.post('/in-queue', async (req, res) => {
  const result = await queueController.addToQueue(req.headers.authorization);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

export default queueRouter;
