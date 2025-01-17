import Role from '../models/roles.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const RoleSeeder = async () => {
    Role.sync();
    let role = await Role.findOne()
    if (role == null) {

        const rolescreate =[  {
            id: '16b7cbff-3d0b-4dff-bc9c-5f96efa51e91',
            name: "SuperAdministrador"
        },
        {
            id: '16b7cbff-3d0b-4dff-bc9c-5f96efa51e92',
            name: "Administrador"
        },
        {
            id: '16b7cbff-3d0b-4dff-bc9c-5f96efa51e93',
            name: "Operativo"
        },
        {
            id: '16b7cbff-3d0b-4dff-bc9c-5f96efa51e94',
            name: "Consulta"
        }]
        await Role.bulkCreate(rolescreate);
    }

}

export default RoleSeeder