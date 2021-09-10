import pkg from 'sequelize';

const { DataTypes } = pkg;

export default function applyExtraSetup(sequelize) {
  const { resolutionsSQLDB, patientsSQLDB, usersSQLDB } = sequelize.models;

  patientsSQLDB.hasMany(resolutionsSQLDB, {
    foreignKey: {
      name: 'patientId',
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  resolutionsSQLDB.belongsTo(patientsSQLDB);

  usersSQLDB.hasOne(patientsSQLDB, {
    foreignKey: {
      name: 'userId',
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  patientsSQLDB.belongsTo(usersSQLDB);
}
