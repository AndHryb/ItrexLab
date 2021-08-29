import pkg from 'sequelize';
import applyExtraSetup from './extra-setup.js';
import patientModel from './patient-model.js';
import resolutionModel from './resolution-model.js';
import { envConfig } from '../../config.js';

const { Sequelize } = pkg;

export default function sequelizeInit() {
  const sequelize = new Sequelize(process.env.SQL_DB, process.env.SQL_USER, '', {
    dialect: envConfig.storage.SQLDialect,
    host: envConfig.storage.SQLHost,
    port: envConfig.storage.SQLPort,
    database: process.env.SQL_DB,
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully....');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const modelDefiners = [
    patientModel,
    resolutionModel,
  ];

  for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
  }

  applyExtraSetup(sequelize);

  return sequelize;
}
