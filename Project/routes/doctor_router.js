import express from 'express';
import path from 'path';
import { getNext } from '../api/controlers/queue_controller.js';
import {addResolution, getResolution, deleteResolution} from '../api/controlers/data_store_controller.js';

const doctorRouter = express.Router();
const __dirname = path.resolve();

doctorRouter.use(express.static(path.resolve(__dirname, 'static')));

doctorRouter.get('/doctor', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'doctor.html'));
});

doctorRouter.get('/next_in_queue', (req, res) => {
  console.log(req.body);
  const result = getNext(req.body);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).send(JSON.stringify(result.value));
});

doctorRouter.post('/add_resolution', (req, res) => {
  console.log(req.body);
  const result = addResolution(req.body);
  console.log(result);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).send(JSON.stringify(result.value));
});

doctorRouter.post('/show_resolution', (req, res) => {
  console.log(req.body);
  const result = getResolution(req.body);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

doctorRouter.post('/delete_resolution', (req, res) => {
  console.log(req.body);
  const result = deleteResolution(req.body);
  console.log(result);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).json(result.value);
});

export default doctorRouter;
