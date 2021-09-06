import pkg from 'sequelize';

const { DataTypes, UUIDV4 } = pkg;

export default function patientModel(sequelize) {
  const model = sequelize.define('patientsSQLDB', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATEONLY,
    },
  });

  sequelize.sync({ force: true })
    .then(() => console.log('patientSQLDB table has been successfully created, if one doesn\'t exist'))
    .catch((error) => console.log('This error occurred', error));

  return model;
}
