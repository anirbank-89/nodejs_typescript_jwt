import express from 'express';
import config from 'config';
import dotenv from 'dotenv';

dotenv.config();

import log from './logger';
import dbConnect from './db/connect';
import { deserializeUser } from './middlewares';

const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);

import indexRoute from './routes';
import postRoute from './routes/posts.route';

indexRoute(app);
postRoute(app);

app.listen(port, host, () => {
  log.info(`App is listening at http://${host}:${port}`);

  dbConnect();
});
