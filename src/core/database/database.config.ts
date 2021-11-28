import * as dotenv from 'dotenv';
dotenv.config();
const rejectUnauthorized = process.env.SSL_REJECT_UNAUTHORIZED === 'true';
export const databaseConfig = {
  development: {
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DEVELOPMENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    pool: {
      max: parseInt(process.env.MAX_POOL),
      min: parseInt(process.env.MIN_POOL),
      idle: parseInt(process.env.IDLE_POOL),
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: rejectUnauthorized,
      },
    },
    pool: {
      max: parseInt(process.env.MAX_POOL),
      min: parseInt(process.env.MIN_POOL),
      idle: parseInt(process.env.IDLE_POOL),
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: rejectUnauthorized,
      },
    },
    pool: {
      max: parseInt(process.env.MAX_POOL),
      min: parseInt(process.env.MIN_POOL),
      idle: parseInt(process.env.IDLE_POOL),
    },
  },
};
