import User from "../../models/user.js";

class UserService {
  // Crear un nuevo usuario
  async createUser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  // Obtener todos los usuarios
  async getAllUsers( id) {
    try {
      const users = await User.findAll( {
        where : {
            clientId : id
        } 
      });
      return users;
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
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.update(data);
      return user;
    } catch (error) {
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
