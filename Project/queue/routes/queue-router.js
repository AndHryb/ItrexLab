import express from 'express';
import path from 'path';
import Ajv from 'ajv';
import { queueController } from '../controlers/queue-controller.js';
import { checkNameSchema } from '../../helpers/validation-schems-ajv/checkName.js';
import { STATUSES } from '../../constants/STATUSES.js';

const queueRouter = express.Router();
const __dirname = path.resolve();
const ajv = new Ajv();

queueRouter.use(express.static(path.resolve(__dirname, 'static')));
queueRouter.use(express.urlencoded({ extended: false }));

queueRouter.get('/patient', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'patient.html'));
});

queueRouter.get('/next_in_queue', (req, res) => {
  const result = queueController.getNext();
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).send(JSON.stringify(result.value));
});

queueRouter.put('/in_queue', (req, res, next) => {
  if (ajv.validate(checkNameSchema, req.body)) {
    next();
  } else { res.status(STATUSES.BadRequest).json('Incorect patient name'); }
}, (req, res) => {
  console.log(req.body);
  const result = queueController.addToQueue(req.body);
  console.log(result);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).send(JSON.stringify(result.value));
});

export default queueRouter;
