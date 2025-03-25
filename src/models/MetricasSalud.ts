import { DataTypes } from 'sequelize';
import db from '@/lib/sequelize';
import Paciente from './Paciente'; // Asegúrate de que el modelo se llame igual

const MetricasSalud = db.define('metricas_salud', {
  weight: DataTypes.FLOAT,
  fatPercentage: DataTypes.FLOAT,
  muscleKg: DataTypes.FLOAT,
  bodyWater: DataTypes.FLOAT,
  phy: DataTypes.INTEGER,
  muscle: DataTypes.FLOAT,
  metabolicAge: DataTypes.INTEGER,
  heartRate: DataTypes.INTEGER,
  boneKg: DataTypes.FLOAT,
  visceralFat: DataTypes.FLOAT,
  bmi: DataTypes.FLOAT,
  hip: DataTypes.FLOAT,
  arms: DataTypes.FLOAT,
  thighs: DataTypes.FLOAT,
  calves: DataTypes.FLOAT,
  chest: DataTypes.FLOAT,
  waist: DataTypes.FLOAT,
  abdomen: DataTypes.FLOAT,
  kcla: DataTypes.FLOAT,

  // Foreign key a Paciente
  pacienteUuid: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Paciente,
      key: 'uuid'
    }
  }
}, {
  freezeTableName: true,
  timestamps: true 
});

// Relación
MetricasSalud.belongsTo(Paciente, { foreignKey: 'pacienteUuid' });

export default MetricasSalud;
