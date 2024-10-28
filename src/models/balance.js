import { DataTypes } from 'sequelize';
import conectDb from '../config/db.js'
const sequelize = conectDb()
 
const Model = sequelize.define('balances', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  period: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  lotId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  initialBalance: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  inputs: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  outputs: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  state: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  tableName: 'balances'
});

Model.sync();
export default Model;