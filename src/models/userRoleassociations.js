// associations.js or in the model definition files
import User from './user.js';
import Role from './roles.js';
import UserRole from './userRoles.js';
// Defining relationships
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: 'userId',
  otherKey: 'roleId',
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: 'roleId',
  otherKey: 'userId',
});

export { User, Role, UserRole };