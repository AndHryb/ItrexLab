import express from 'express';
import path from 'path';
import Ajv from 'ajv';
import * as cookie from 'cookie';
import { injector } from '../injector.js';
import { STATUSES } from '../constants.js';
import { checkResolutionSchema } from '../helpers/validation-schems-ajv/checkResolution.js';
import { checkNameSchema } from '../helpers/validation-schems-ajv/checkName.js';
import checkJwtToken from '../helpers/decode-token.js';
import checkDoctorTocken from '../helpers/checkJwtDoctor.js';

const __dirname = path.resolve();
const doctorRouter = express.Router();
const ajv = new Ajv();
const resolutionController = injector.getResolutionController();
const doctorController = injector.getDoctorController();

doctorRouter.get('/', checkDoctorTocken, (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'doctor.html'));
});

doctorRouter.post('/resolution', async (req, res, next) => {
  if (ajv.validate(checkResolutionSchema, req.body.value)) {
    next();
  } else { res.status(STATUSES.BadRequest).json('The field must not be empty'); }
}, async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie);
  const { doctorToken } = cookies;
  const result = await resolutionController.addResolution(req.body, doctorToken);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

doctorRouter.get('/resolution/me', async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie);
  const { token } = cookies;
  const result = await resolutionController.getResolutionByToken(token);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

doctorRouter.get('/resolution-patient', async (req, res, next) => {
  if (ajv.validate(checkNameSchema, req.query.name)) {
    next();
  } else { res.status(STATUSES.BadRequest).json('Incorrect patient name'); }
}, async (req, res) => {
  const result = await resolutionController.getResolutionsByName(req.query.name);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

doctorRouter.delete('/resolution', async (req, res, next) => {
  if (req.body.value) {
    next();
  } else { res.status(STATUSES.BadRequest).json('Incorrect patient name'); }
}, async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie);
  const { doctorToken } = cookies;
  const result = await resolutionController.deleteResolution(req.body.value, doctorToken);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

doctorRouter.get('/all', async (req, res) => {
  const result = await doctorController.getDoctors();
  res.status(result.status).json(result.value);
});

doctorRouter.get('/specialities', async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie);
  const { doctorToken } = cookies;
  const { userId } = checkJwtToken(doctorToken);
  const doctor = await doctorController.getByUserId(userId);
  const result = await doctorController.getSpec(doctor.id);
  res.status(result.status).json(result.value);
});

export default doctorRouter;
