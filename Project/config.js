import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV;
console.log(`process.env = ${process.env.NODE_ENV}`);

const memory = {
  app: {
    port: process.env.PORT || 3000,
  },
  storage: {
    name: 'memory',
    host: process.env.REPOSITORY_HOST,
    port: 6379,
  },
};

const redis = {
  app: {
    port: process.env.PORT || 3000,
  },
  storage: {
    name: 'redis',
    host: process.env.REPOSITORY_HOST,
    port: 6379,
  },
};
const test = {
  app: {
    port: process.env.PORT || 3000,
  },
  storage: {
    name: process.env.TEST_STORAGE,
    host: process.env.REPOSITORY_HOST,
    port: 6379,
  },
};
const sql = {
  app: {
    port: process.env.PORT || 3000,
  },
  storage: {
    name: 'SQL',
    host: process.env.REPOSITORY_HOST,
    port: 6379,
    SQLPort: 3306,
    SQLHost: process.env.SQL_HOST,
    SQLDialect: 'mysql',
  },
};
const config = {
  memory,
  redis,
  test,
  sql,
};
const envConfig = config[env];

export { envConfig };
