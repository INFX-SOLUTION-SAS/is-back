// controllers/ThirdPartyController.js
import ThirdPartyService from "../../services/admin/thirdpartService.js";

class ThirdPartyController {
  // Crear un tercer partido
  static async createThirdParty(req, res) {
    try {
      const data = req.body;
      const thirdParty = await ThirdPartyService.createThirdParty(data);
      res.status(200).json(thirdParty);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener todos los terceros
  static async getAllThirdParties(req, res) {
    try {
      const thirdParties = await ThirdPartyService.getAllThirdParties();
      res.status(200).json(thirdParties);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener un tercer partido por ID
  static async getThirdPartyById(req, res) {
    const { id } = req.params;
    try {
      const thirdParty = await ThirdPartyService.getThirdPartyById(id);
      res.status(200).json(thirdParty);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Actualizar un tercer partido por ID
  static async updateThirdParty(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const thirdParty = await ThirdPartyService.updateThirdParty(id, data);
      res.status(200).json(thirdParty);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar un tercer partido por ID
  static async deleteThirdParty(req, res) {
    const { id } = req.params;
    try {
      const result = await ThirdPartyService.deleteThirdParty(id);
      res.status(204).json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default ThirdPartyController;
