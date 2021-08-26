import express from 'express';
import pkg from 'sequelize';


const { Sequelize, DataTypes, UUIDV4 } = pkg;

const PORT = 3000;

const app = express();

const sequelize = new Sequelize('clinic_db', 'root', '',{
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'clinic_db',
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully....');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


app.listen(PORT, () => {
  console.log(`server starting on port ${PORT}...`);
});

const resolutionsSQLDB = sequelize.define('resolutionsSQLDB', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },

  value: {
    type: DataTypes.STRING,
  },

  delay: {
    type: DataTypes.INTEGER,
  },
});

sequelize.sync({ force: true })
  .then(() => console.log('resolutionSQLDB table has been successfully created, if one doesn\'t exist'))
  .catch((error) => console.log('This error occurred', error));

export {resolutionsSQLDB};

const patientsSQLDB = sequelize.define('patientsSQLDB', {
  id:{
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
  },
});

patientsSQLDB.hasMany(resolutionsSQLDB, {
  foreignKey: {
    name: 'patient_id',
    type: DataTypes.UUID,
  },
});
resolutionsSQLDB.belongsTo(patientsSQLDB);

sequelize.sync({ force: true })
  .then(() => console.log('patientSQLDB table has been successfully created, if one doesn\'t exist'))
  .catch((error) => console.log('This error occurred', error));

export { patientsSQLDB };