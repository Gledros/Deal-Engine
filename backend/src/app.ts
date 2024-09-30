import express, { Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'express-async-errors';
import * as rfs from 'rotating-file-stream';
import { processData } from './utils/helpers/';

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

app.get('/', (_, res: Response) => {
  res.send('Home');
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
