import express from 'express';
import path from 'path';
import Ajv from 'ajv';
import { __dirname } from '../main.js';
import { injector } from '../injector.js';
import { checkRegistrationFormShema } from '../helpers/validation-schems-ajv/checkRegistratioForm.js';
import { checkLoginFormShema } from '../helpers/validation-schems-ajv/checkLoginForm.js';
import { STATUSES } from '../constants.js';

const ajv = new Ajv();

const userRouter = express.Router();
const userController = injector.getUserController();

userRouter.get('/registration', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'registration.html'));
});

userRouter.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'login.html'));
});

userRouter.get('/doctor-login', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'doctor-login.html'));
});

userRouter.post('/login/doctor', async (req, res) => {
  const result = await userController.doctorLogin(req.body);
  if (result.status === 200) res.cookie('doctorToken',`${result.value}`, {
    httpOnly: true,
  });

  res.status(result.status).json(result.value);
})

userRouter.get('/username', async (req, res) => {
  const result = await userController.getByToken(req.headers.authorization);
  res.status(result.status).json(result.value);
});

userRouter.post('/registration', async (req, res, next) => {
  if (ajv.validate(checkRegistrationFormShema, req.body)) {
    next();
  } else { res.status(STATUSES.BadRequest).json('Fill out the form with the correct data'); }
}, async (req, res) => {
  const result = await userController.registration(req.body);
  res.status(result.status).json(result.value);
});

userRouter.post('/login', async (req, res, next) => {
  if (ajv.validate(checkLoginFormShema, req.body)) {
    next();
  } else { res.status(STATUSES.BadRequest).json('Fill out the form with the correct data'); }
}, async (req, res) => {
  const result = await userController.login(req.body);
  res.status(result.status).json(result.value);
});

export default userRouter;
