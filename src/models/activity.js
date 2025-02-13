import { DataTypes } from 'sequelize';
import conectDb from '../config/db.js'
const sequelize = conectDb()
 
const Model = sequelize.define('activities', {
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
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }, 
  initial: {    
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'activities'
});

Model.sync();
export default Model;