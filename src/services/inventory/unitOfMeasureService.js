import UnitOfMeasure from "../../models/inventory/unitOfmesuare.js";

class UnitOfMeasureService {
  async getAllUnits() {
    try {
      return await UnitOfMeasure.findAll();
    } catch (error) {
      console.error('Error al obtener las unidades de medida:', error);
      throw new Error('No se pudieron obtener las unidades de medida');
    }
  }
}

export default new UnitOfMeasureService();
