import conectDb from '../../config/db.js'
const sequelize = conectDb()
import { DataTypes } from 'sequelize';

const UnitOfMeasure = sequelize.define(
  'UnitOfMeasure',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'unit_of_measures',
    timestamps: false,
  }
);

export default UnitOfMeasure;
