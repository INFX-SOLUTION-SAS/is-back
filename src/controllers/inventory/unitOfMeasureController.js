import unitOfMeasureService from "../../services/inventory/unitOfMeasureService.js";

class UnitOfMeasureController {
  async getAllUnits(req, res) {
    try {
      const units = await unitOfMeasureService.getAllUnits();
      res.status(200).json(units);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las unidades de medida', error: error.message });
    }
  }
}

export default new UnitOfMeasureController();
