import connectDb from '../config/db.js';
const sequelize = connectDb();
import User from './user.js';
import Role from './roles.js';
import UserRole from './userRoles.js';

// Asociaciones
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

export { sequelize, User, Role, UserRole };