import { DataTypes } from 'sequelize';
import conectDb from '../config/db.js'
const sequelize = conectDb()
 
const Model = sequelize.define('movements', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  lotId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  activityId: {
    type: Number,
    allowNull: false
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  days: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  ticket: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  synchronized: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
  }
}, {
  tableName: 'movements'
});


Model.sync();
export default Model;