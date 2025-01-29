// models/UserRole.js
import { DataTypes } from 'sequelize';
import connectDb from '../config/db.js';
import User from './user.js';
import Role from './roles.js';
const sequelize = connectDb();

const UserRole = sequelize.define('UserRole', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'userRoles',
  timestamps: true, // If you want to track when the role was assigned
  underscored: true, // column names in snake_case
});


// Sync once during the application startup
export default UserRole;
