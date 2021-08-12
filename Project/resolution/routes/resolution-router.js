import express from 'express';
import path from 'path';
import Ajv from 'ajv';
import { resolutionControler } from '../controlers/resolution-controler.js';
import { STATUSES } from '../../constants/STATUSES.js';
import { checkResolutionSchema } from '../../helpers/validation-schems-ajv/checkResolution.js';
import { checkNameSchema } from '../../helpers/validation-schems-ajv/checkName.js';

const resolutionRouter = express.Router();
const __dirname = path.resolve();
const ajv = new Ajv();

resolutionRouter.use(express.static(path.resolve(__dirname, 'static')));

resolutionRouter.get('/doctor', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'doctor.html'));
});

resolutionRouter.put('/resolution', (req, res, next) => {
  if (ajv.validate(checkResolutionSchema, req.body)) {
    next();
  } else { res.status(STATUSES.BadRequest).json('The field must not be empty'); }
}, (req, res) => {
  console.log(req.body);
  const result = resolutionControler.addResolution(req.body);
  console.log(result);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

resolutionRouter.get('/resolution_patient', (req, res, next) => {
  if (ajv.validate(checkNameSchema, req.query.name)) {
    next();
  } else { res.status(STATUSES.BadRequest).json('Incorect patient name'); }
}, (req, res) => {
  console.log(req.query.name);
  const result = resolutionControler.getResolution(req.query.name);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

resolutionRouter.delete('/resolution', (req, res, next) => {
  if (ajv.validate(checkNameSchema, req.body)) {
    next();
  } else { res.status(STATUSES.BadRequest).json('Incorect patient name'); }
}, (req, res) => {
  console.log(req.body);
  const result = resolutionControler.deleteResolution(req.body);
  console.log(result.value);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

export default resolutionRouter;
