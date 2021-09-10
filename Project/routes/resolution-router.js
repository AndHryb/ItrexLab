import express from 'express';
import path from 'path';
import Ajv from 'ajv';
import { injector } from '../injector.js';
import { STATUSES } from '../constants.js';
import { checkResolutionSchema } from '../helpers/validation-schems-ajv/checkResolution.js';
import { checkNameSchema } from '../helpers/validation-schems-ajv/checkName.js';

const __dirname = path.resolve();
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

resolutionRouter.get('/resolution/me', async (req, res) => {
  const result = await resolutionController.getResolutionByToken(req.headers.authorization);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

resolutionRouter.get('/resolution-patient', async (req, res, next) => {
  if (ajv.validate(checkNameSchema, req.query.name)) {
    next();
  } else { res.status(STATUSES.BadRequest).json('Incorrect patient name'); }
}, async (req, res) => {
  const result = await resolutionController.getResolutionsByName(req.query.name);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

resolutionRouter.delete('/resolution', async (req, res, next) => {
  if (req.body.value) {
    next();
  } else { res.status(STATUSES.BadRequest).json('Incorrect patient name'); }
}, async (req, res) => {
  const result = await resolutionController.deleteResolution(req.body.value);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

export default resolutionRouter;
