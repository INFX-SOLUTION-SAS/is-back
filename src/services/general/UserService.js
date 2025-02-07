import Role from "../../models/roles.js";
import User from "../../models/user.js";
import UserRole from "../../models/userRoles.js";
import conectDb from '../../config/db.js'
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
  async getAllUsers(id) {
    try {
      const users = await User.findAll({
        where: {
          client_system_id: id
        },
        include: [
          {
            model: UserRole,
            as: 'userRoles', // Debe coincidir con la asociación en User.ts
            include: [{ model: Role, as: 'role' }] // Debe coincidir con la asociación en UserRole.ts
          }
        ]
      });

      const usereturn = users.map(u => {
        const { userRoles, id,
          client_system_id,
          username,
          name,
          email,
          state, } = u

        return {
          id,
          client_system_id,
          username,
          name,
          email,
          state, roleid: userRoles[0].role.id, rolename: userRoles[0].role.name
        }

      })

      return usereturn
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
      await user.destroy();
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}

export default new UserService();
