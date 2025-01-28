import { DataTypes } from 'sequelize';
import conectDb from '../config/db.js'
const sequelize = conectDb()
 
const Model = sequelize.define('lots', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  storeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  days: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'lots'
});

Model.sync();
export default Model;