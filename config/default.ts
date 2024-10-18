import dotenv from 'dotenv';

dotenv.config();

export default {
  port: Number(process.env.port) ,
  host: process.env.host,
  dbUri: process.env.dbUri,
  saltWorkFactor: 10,
  accessTokenTtl: 3600,
  refreshTokenTtl: 60,
  privateKey: `${process.env.ACCESS_PRIVATE_KEY}`,
  publicKey: `${process.env.ACCESS_PUBLIC_KEY}`,
};
