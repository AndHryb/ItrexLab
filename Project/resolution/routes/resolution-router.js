import express from 'express';
import path from 'path';
import Ajv from 'ajv';
import {injector} from '../../injector.js';
import { STATUSES } from '../../constants.js';
import { checkResolutionSchema } from '../../helpers/validation-schems-ajv/checkResolution.js';
import { checkNameSchema } from '../../helpers/validation-schems-ajv/checkName.js';

const resolutionRouter = express.Router();
const ajv = new Ajv();
const resolutionControler = injector.getResolutionController();

resolutionRouter.get('/doctor', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'doctor.html'));
});

resolutionRouter.post('/resolution', async (req, res, next) => {
  if (ajv.validate(checkResolutionSchema, req.body)) {
    await next();
  } else { res.status(STATUSES.BadRequest).json('The field must not be empty'); }
}, async (req, res) => {
  console.log(req.body);
  const result = await resolutionControler.addResolution(req.body);
  console.log(result);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

resolutionRouter.get('/resolution_patient/:name', async (req, res, next) => {
  console.log(`this is param ${req.params.name}`);
  if (ajv.validate(checkNameSchema, req.params.name)) {
    await next();
  } else { res.status(STATUSES.BadRequest).json('Incorect patient name'); }
}, async (req, res) => {
  console.log(req.params.name);
  const result = await resolutionControler.getResolution(req.params.name);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

resolutionRouter.delete('/resolution', async (req, res, next) => {
  if (ajv.validate(checkNameSchema, req.body)) {
    await next();
  } else { res.status(STATUSES.BadRequest).json('Incorect patient name'); }
}, async (req, res) => {
  console.log(req.body);
  const result = await resolutionControler.deleteResolution(req.body);
  console.log(result.value);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

export default resolutionRouter;
