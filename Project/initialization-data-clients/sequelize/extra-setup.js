import pkg from 'sequelize';

const { DataTypes } = pkg;

export default function applyExtraSetup(sequelize) {
  const { resolutionsSQLDB, patientsSQLDB } = sequelize.models;
  //patientsSQLDB.hasMany(resolutionsSQLDB);

  resolutionsSQLDB.belongsTo(patientsSQLDB, {
    foreignKey: {
      name: 'patientId',
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
}
