// models/UserRole.js
import { DataTypes } from 'sequelize';
import connectDb from '../config/db.js';

const sequelize = connectDb();

const UserRole = sequelize.define('UserRole', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'id',
    },
  },
}, {
  tableName: 'userRoles',
  timestamps: true, // If you want to track when the role was assigned
  underscored: true, // column names in snake_case
});

// Sync once during the application startup
UserRole.sync();
export default UserRole;
