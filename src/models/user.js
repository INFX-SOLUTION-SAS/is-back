import { DataTypes } from 'sequelize';
import conectDb from '../config/db.js'
const sequelize = conectDb()
import Role from './roles.js';
import UserRole from './userRoles.js';

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  client_system_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  lastCompany: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 1
  },
  isDelete:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:false
  }
}
  ,
  {
    indexes: [
      {
        unique: true,
        fields: ['username', 'client_system_id'] // Restricción única compuesta
      }
    ]
  }
  , {
    tableName: 'users'
  });


export default User;