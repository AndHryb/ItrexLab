import pkg from 'sequelize';

const { DataTypes, UUIDV4 } = pkg;

export default function resolutionModel(sequelize) {
  const model = sequelize.define('resolutionsSQLDB', {
    resolutionId: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },

    resolution: {
      type: DataTypes.STRING,
    },
  });

  sequelize.sync({ force: true })
    .then(() => console.log('resolutionSQLDB table has been successfully created, if one doesn\'t exist'))
    .catch((error) => console.log('This error occurred', error));

  return model;
}
