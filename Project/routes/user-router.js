import express from 'express';
import path from 'path';
import Ajv from 'ajv';
import { __dirname } from '../main.js';
import { injector } from '../injector.js';
import { checkNameSchema } from '../helpers/validation-schems-ajv/checkName.js';
import { STATUSES } from '../constants.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'registration.html'));
});

userRouter.post('/form', (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: 'OK' });
});

export default userRouter;
