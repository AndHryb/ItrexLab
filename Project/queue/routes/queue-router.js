import express from 'express';
import path from 'path';
import Ajv from 'ajv';
import {injector} from '../../injector.js';
import { checkNameSchema } from '../../helpers/validation-schems-ajv/checkName.js';
import { STATUSES } from '../../constants.js';

const queueRouter = express.Router();
const ajv = new Ajv();

const queueController = injector.getQueueController();

queueRouter.get('/patient', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'patient.html'));
});

queueRouter.get('/next_in_queue', async (req, res) => {
  const result = await queueController.getNext();
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).send(JSON.stringify(result.value));
});

queueRouter.post('/in_queue', async (req, res, next) => {
  if (ajv.validate(checkNameSchema, req.body)) {
    await next();
  } else { res.status(STATUSES.BadRequest).json('Incorect patient name'); }
}, async (req, res) => {
  const result = await queueController.addToQueue(req.body);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).send(JSON.stringify(result.value));
});

export default queueRouter;
