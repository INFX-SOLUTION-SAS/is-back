import Role from "../../models/roles.js";
import User from "../../models/user.js";
import UserRole from "../../models/userRoles.js";
import conectDb from '../../config/db.js'
import whereIsDelete from "../../constans/whereIsDelete.js";
const sequelize = conectDb()


class UserService {
  // Crear un nuevo usuario
  async createUser(data) {
    try {
      const user = await User.create(data);
      const userRole = await UserRole.create({ userId: user.id, roleId: data.roleid })
      return { user, userRole };
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  // Obtener todos los usuarios
  async  getAllUsers(id,pageSize , page,filters = {}) {
    try {

      console.log('PAGE SIZE-->', pageSize)
      const offset = (page - 1) * pageSize; // Calcula el offset para la paginación
      // Construcción dinámica de filtros
      const whereCondition  = {
        ...whereIsDelete,
        client_system_id: id,
        ...filters // Agrega filtros dinámicos si se proporcionan
      };
  
      const { count, rows } = await User.findAndCountAll({
        where: whereCondition,
        include: [
          {
            model: UserRole,
            as: 'userRoles',
            include: [{ model: Role, as: 'role' }]
          }
        ],
        limit:  parseInt(pageSize), // Número de registros por página
        offset, // Punto de inicio para la paginación
        order: [['createdAt', 'DESC']] // Orden descendente por fecha de creación
      });

  
      const userReturn = rows.map(u => {
        const { userRoles, id, client_system_id, username, name, email, state } = u;
        return {
          id,
          client_system_id,
          username,
          name,
          email,
          state,
          roleid: userRoles[0]?.role?.id || null,
          rolename: userRoles[0]?.role?.name || null
        };
      });
  
      return {
        total: count,
        page,
        totalPages: Math.ceil(count / pageSize),
        data: userReturn
      };
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }
  // Obtener un usuario por ID
  async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }

  // Actualizar un usuario por ID
  async updateUser(id, data) {
    const transaction = await sequelize.transaction(); // Start transaction
    try {
      const user = await User.findByPk(id, { transaction });
      if (!user) {
        throw new Error('User not found');
      }
      console.log('data user save', user)
      console.log('data to save', data)
      // Update user fields efficiently
      await user.update(
        {
          username: data.username,
          name: data.name,
          email: data.email,
          state: data.state,
        },
        { transaction }
      );
  
      // Remove existing roles
      await UserRole.destroy({ where: { userId: user.id }, transaction });
  
      // Assign new role
      await UserRole.create({ userId: user.id, roleId: data.roleid }, { transaction });
  
      await transaction.commit(); // Commit transaction
      return user;
    } catch (error) {
      await transaction.rollback(); // Rollback on error
      throw new Error('Error updating user: ' + error.message);
    }
  }

  // Eliminar un usuario por ID
  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.update({
        isDelete: true 
      })
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}

export default new UserService();
