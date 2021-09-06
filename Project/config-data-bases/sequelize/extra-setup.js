import pkg from 'sequelize';

const { DataTypes } = pkg;

export default function applyExtraSetup(sequelize) {
  const { resolutionsSQLDB, patientsSQLDB, usersSQLDB } = sequelize.models;

  //patientsSQLDB.hasMany(resolutionsSQLDB);

  resolutionsSQLDB.belongsTo(patientsSQLDB, {
    foreignKey: {
      name: 'patientId',
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  //usersSQLDB.hasOne(patientsSQLDB);

  patientsSQLDB.belongsTo(usersSQLDB, {
    foreignKey: {
      name: 'userId',
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
}
