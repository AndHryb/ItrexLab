import express from 'express';
import path from 'path';
import events from 'events';
import * as cookie from 'cookie';
import Ajv from 'ajv';
import { injector } from '../injector.js';
import { STATUSES } from '../constants.js';
import { checkDocId } from '../helpers/validation-schems-ajv/checkName.js';

const __dirname = path.resolve();
const emitter = new events.EventEmitter();
const patientRouter = express.Router();
const queueController = injector.getQueueController();
const userController = injector.getUserController();
const ajv = new Ajv();

patientRouter.get('/', async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie);
  const { token } = cookies;
  const checkToken = await userController.getPatientByToken(`Bearer ${token}`);

  if (checkToken.value.patient) {
    res.sendFile(path.resolve(__dirname, 'static', 'patient.html'));
  } else {
    res.sendFile(path.resolve(__dirname, 'static', 'login.html'));
  }
});

// queueRouter.get('/connect', (req, res) => {
//   res.writeHead(200, {
//     Connection: 'keep-alive',
//     'Content-Type': 'text/event-stream',
//     'Cache-Control': 'no-cache',
//   });
//   emitter.on('next', (name) => {
//     res.write(`data: ${JSON.stringify(name)} \n\n`);
//   });
// });

patientRouter.get('/next-in-queue', async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie);
  const { doctorToken } = cookies;

  const result = await queueController.getNext(doctorToken);

  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
  emitter.emit('next', result.value);
});

patientRouter.post('/in-queue', async (req, res, next) => {
  ajv.validate(checkDocId, req.body.docID)
    ? next()
    : res.status(STATUSES.BadRequest).json('You have to choose doctor');
}, async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie);
  const { token } = cookies;
  const { spec } = req.body;
  const result = await queueController.addToQueue(token, req.body.docID, spec);
  res.status(result.status).json(result.value);
});

patientRouter.get('/all-queues', async (req, res) => {
  const result = await queueController.getAllQueues();
  res.status(result.status).json(result.value);
});

export default patientRouter;
