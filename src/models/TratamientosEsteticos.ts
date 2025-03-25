import { DataTypes } from 'sequelize';
import db from '@/lib/sequelize'; 
import Paciente from './Paciente'; 

const TratamientosEsteticos = db.define('tratamientos_esteticos', {
  pacienteId: {
    type: DataTypes.UUID, 
    allowNull: false,
    references: {
      model: Paciente,
      key: 'uuid',
    },
  },
  cavitation: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  radioFrequency: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lipoLaser: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  vacuum: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  gluteCups: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  woodTherapy: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lymphaticDrainage: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  detox: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  mesotherapy: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  passiveGym: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  freezeTableName: true,
  timestamps: true,
});

// Relaciones
TratamientosEsteticos.belongsTo(Paciente, {
  foreignKey: 'pacienteId',
  targetKey: 'uuid',
});

export default TratamientosEsteticos;
