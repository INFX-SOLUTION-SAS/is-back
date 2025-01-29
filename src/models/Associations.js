

import User from './user.js';
import Role from './roles.js';
import UserRole from './userRoles.js';
import ThirdParty from './admin/ThirdParty.js';
import Supplier from './admin/supplier.js';

const Associations = () => {

    User.hasMany(UserRole, { foreignKey: 'userId', as: 'userRoles' });
    UserRole.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    UserRole.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
    ThirdParty.hasOne(Supplier, { foreignKey: 'thirdPartyId' });
    Supplier.belongsTo(ThirdParty, { foreignKey: 'thirdPartyId' });

}

export default Associations