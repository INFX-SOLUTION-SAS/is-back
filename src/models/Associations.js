

import User from './user.js';
import Role from './roles.js';
import UserRole from './userRoles.js';
import ThirdParty from './admin/thirdparty.js'
import Supplier from './inventory/supplier.js';
const Associations = () => {

    User.hasMany(UserRole, { foreignKey: 'userId', as: 'userRoles' });
    UserRole.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    UserRole.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
    ThirdParty.hasOne(Supplier, { foreignKey: 'thirdPartyId' });
    Supplier.belongsTo(ThirdParty, { foreignKey: 'thirdPartyId', as: 'thirdparty' });
    ThirdParty.hasMany(Supplier, { foreignKey: 'thirdPartyId', as: 'suppliers' });

}

export default Associations