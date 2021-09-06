import express from 'express';
import path from 'path';
import Ajv from 'ajv';
import { __dirname } from '../main.js';
import { injector } from '../injector.js';
import { checkNameSchema } from '../helpers/validation-schems-ajv/checkName.js';
import { STATUSES } from '../constants.js';

const userRouter = express.Router();
const userController = injector.getUserController();

userRouter.get('/registration', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'registration.html'));
});

userRouter.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'login.html'));
});

userRouter.get('/username', async (req, res) => {
  const result = await userController.getByToken(req.headers.authorization);
  res.status(result.status).json(result.value);
});

userRouter.post('/registration/form', async (req, res) => {
  console.log(req.body);
  const result = await userController.registration(req.body);
  res.status(result.status).json(result.value);
});

userRouter.post('/login/form', async (req, res) => {
  console.log(req.body);
  const result = await userController.login(req.body);
  res.status(result.status).json(result.value);
});

export default userRouter;
