import mongoose, { ConnectOptions } from 'mongoose';
import config from 'config';
import log from '../logger';

function dbConnect() {
  const dbUri = config.get('dbUri') as string;

  mongoose.set('strictQuery', false);
  mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      // log.info('Database connected');
      console.log('Database connected');
    })
    .catch((err) => {
      // console.log('DB connect error due to ', err.message);
      log.error('DB connect error due to ', err.message);
      process.exit(1);
    });
}

export default dbConnect;
