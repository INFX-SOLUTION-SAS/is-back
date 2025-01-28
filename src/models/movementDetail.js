import { DataTypes } from 'sequelize';
import conectDb from '../config/db.js'
const sequelize = conectDb()
 
const Model = sequelize.define('movement_details', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  movementId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  machineId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  time: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  activityId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'movement_details'
});

Model.sync();
export default Model;