import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import doctorRouter from './resolution/routes/resolution-router.js';
import patientRouter from './queue/routes/queue-router.js';
import {envConfig} from "./config.js";

const PORT = 3000;
const app = express();
const __dirname = path.resolve();

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(bodyParser.json({ strict: false }));

app.use(doctorRouter);
app.use(patientRouter);

app.listen(envConfig.app.port, () => {
  console.log(`server starting on port ${envConfig.app.port}...`);
});
