import dotenv from 'dotenv';

dotenv.config();

export default {
  port: 1337,
  host: 'localhost',
  dbUri: 'mongodb://localhost:27017/ts-crud-one',
  saltWorkFactor: 10,
  accessTokenTtl: 3600,
  refreshTokenTtl: 60,
  privateKey: `${process.env.ACCESS_PRIVATE_KEY}`,
  publicKey: `${process.env.ACCESS_PUBLIC_KEY}`,
};
