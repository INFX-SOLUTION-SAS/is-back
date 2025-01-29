// services/ThirdPartyService.js
import ThirdParty from "../../models/admin/thirdparty.js";

class ThirdPartyService {
  static async createThirdParty(data) {
    try {
      const thirdParty = await ThirdParty.create(data);
      return thirdParty;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllThirdParties() {
    try {
      const thirdParties = await ThirdParty.findAll();
      return thirdParties;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getThirdPartyById(id) {
    try {
      const thirdParty = await ThirdParty.findByPk(id);
      if (!thirdParty) {
        throw new Error('ThirdParty not found');
      }
      return thirdParty;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateThirdParty(id, data) {
    try {
      const thirdParty = await ThirdParty.findByPk(id);
      if (!thirdParty) {
        throw new Error('ThirdParty not found');
      }

      // Actualizar los campos con los datos proporcionados
      await thirdParty.update(data);
      return thirdParty;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteThirdParty(id) {
    try {
      const thirdParty = await ThirdParty.findByPk(id);
      if (!thirdParty) {
        throw new Error('ThirdParty not found');
      }

      await thirdParty.destroy();
      return { message: 'ThirdParty deleted successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ThirdPartyService;
