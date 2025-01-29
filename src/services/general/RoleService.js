import Role from "../../models/roles.js";
import { Op } from "sequelize";
class RoleService {

  // Obtener todos los usuarios
  async getAllRoles(withstatic) {
    try {
      let ne = {
        where: {
          name: {
            [Op.ne]: "SuperAdministrador", // Not equal to 'someValue'
          },
        }
      }
      const where = withstatic ?{} : ne 
      return await Role.findAll({ where: where });


    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

}

export default new RoleService();
