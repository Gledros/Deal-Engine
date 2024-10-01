import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'express-async-errors';
import * as rfs from 'rotating-file-stream';
import mongoose from 'mongoose';
import router from './api';
import { processData } from './utils/helpers/';
import path from 'path';

processData();

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.APP_ENV || 'dev';

const rfsStream = rfs.createStream(process.env.LOG_FILE || 'log.txt', {
  size: process.env.LOG_SIZE || '10M',
  interval: process.env.LOG_INTERVAL || '1d',
  compress: 'gzip',
  path: `${__dirname}/logs`
});

app.use(
  morgan(process.env.LOG_FORMAT || 'dev', {
    stream: process.env.LOG_FILE ? rfsStream : process.stdout
  })
);

if (env == 'dev' && process.env.LOG_FILE)
  app.use(morgan(process.env.LOG_FORMAT || 'dev'));

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/v1', router);

const frontendPath = '../../frontend/dist/frontend/browser';

app.use(express.static(path.join(__dirname, frontendPath)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, frontendPath, '/index.html'));
});

const init = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB}`);

    app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

init();

export default app;
