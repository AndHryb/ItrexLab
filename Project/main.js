import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import doctorRouter from './routes/doctor_router.js';

import patientRouter from './routes/patient_router.js';

const PORT = 3000;
const app = express();
const __dirname = path.resolve();

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(bodyParser.json({ strict: false }));

app.use(doctorRouter);
app.use(patientRouter);

app.listen(PORT, () => {
  console.log(`server starting on port ${PORT}...`);
});
