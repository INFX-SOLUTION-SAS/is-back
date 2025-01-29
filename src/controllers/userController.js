import UserService from "../services/general/UserService.js";

class UserController {
  // Crear un usuario
  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Obtener todos los usuarios
  async getAllUsers(req, res) {
    try {
      const {
        client_system_id
      } = req.query
      const users = await UserService.getAllUsers(client_system_id);
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Obtener un usuario por ID
  async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Actualizar un usuario
  async updateUser(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Eliminar un usuario
  async deleteUser(req, res) {
    try {
      const result = await UserService.deleteUser(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();
