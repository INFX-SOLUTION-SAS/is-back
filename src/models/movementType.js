import { DataTypes } from 'sequelize';
import conectDb from '../config/db.js'
const sequelize = conectDb()
 
const Model = sequelize.define('movement_type', {
  id: {    
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  inventory: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'movement_type'
});

Model.sync();
export default Model;