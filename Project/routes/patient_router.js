import express from 'express';
import path from 'path';
import { addToQueue } from '../api/controlers/queue_controller.js';
import { getResolution} from '../api/controlers/data_store_controller.js';

const patientRouter = express.Router();
const __dirname = path.resolve();

patientRouter.use(express.static(path.resolve(__dirname, 'static')));
patientRouter.use(express.urlencoded({ extended: false }));

patientRouter.get('/patient', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'patient.html'));
});

patientRouter.post('/add_patient', (req, res) => {
  console.log(req.body);
  const result = addToQueue(req.body);
  console.log(result);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).send(JSON.stringify(result.value));
});

patientRouter.post('/get_resolution_patient', (req, res) => {
  console.log(req.body);
  const result = getResolution(req.body);
  console.log(result);
  res.set('Content-Type', 'application/json;charset=utf-8');
  res.status(result.status).send(JSON.stringify(result.value));
});

export default patientRouter;
