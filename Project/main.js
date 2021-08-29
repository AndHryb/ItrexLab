import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import resolutionRouter from './routes/resolution-router.js';
import queueRouter from './routes/queue-router.js';
import { envConfig } from './config.js';

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(bodyParser.json({ strict: false }));

app.use( resolutionRouter);
app.use( queueRouter);

app.listen(envConfig.app.port, () => {
  console.log(`server starting on port ${envConfig.app.port}...`);
});
