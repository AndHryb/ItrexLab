import express from 'express';
import path from 'path';
import Ajv from 'ajv';
import {__dirname} from '../main.js';
import { injector } from '../injector.js';
import { STATUSES } from '../constants.js';
import { checkResolutionSchema } from '../helpers/validation-schems-ajv/checkResolution.js';
import { checkNameSchema } from '../helpers/validation-schems-ajv/checkName.js';
import arrSerialize from '../helpers/array-serialize.js';

const resolutionRouter = express.Router();
const ajv = new Ajv();
const resolutionController = injector.getResolutionController();

resolutionRouter.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'doctor.html'));
});

resolutionRouter.post('/resolution', async (req, res, next) => {
  if (ajv.validate(checkResolutionSchema, req.body.value)) {
    next();
  } else { res.status(STATUSES.BadRequest).json('The field must not be empty'); }
}, async (req, res) => {
  const result = await resolutionController.addResolution(req.body.value);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

resolutionRouter.get('/resolution_patient', async (req, res) => {
  const result = await resolutionController.getResolutionByToken(req.headers.authorization);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

resolutionRouter.get('/resolution_patient/:name', async (req, res, next) => {
  if (ajv.validate(checkNameSchema, req.params.name)) {
    next();
  } else { res.status(STATUSES.BadRequest).json('Incorrect patient name'); }
}, async (req, res) => {
  const result = await resolutionController.getResolutionsByName(req.params.name);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

resolutionRouter.delete('/resolution', async (req, res, next) => {
  console.log(req.body);
  if (req.body.value) {
    next();
  } else { res.status(STATUSES.BadRequest).json('Incorrect patient name'); }
}, async (req, res) => {
  const result = await resolutionController.deleteResolution(req.body.value);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

export default resolutionRouter;
