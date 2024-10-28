import { DataTypes } from 'sequelize';
import conectDb from '../config/db.js'
const sequelize = conectDb()
 
const Model = sequelize.define('production_lots', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  date: {
    type: DataTypes.DATE
    allowNull: false
  },
  productId: {
    type: DataTypes.UUID
    allowNull: false
  },
  lotId: {
    type: DataTypes.UUID
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER
    allowNull: false
  },
  type: {
    type: DataTypes.UUID,
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
  synchronized: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'production_lots'
});

Model.sync();
export default Model;