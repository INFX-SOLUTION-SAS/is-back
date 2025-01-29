import warehouseService from "../../services/inventory/warehouseService.js";
// Crear una nueva bodega

class WarehouseController {
 createWarehouse = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const { client_system_id } = req.query
    const warehouse = await warehouseService.createWarehouse({ name, description, status,client_system_id });
    res.status(200).json({ data : warehouse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las bodegas
 getAllWarehouses = async (req, res) => {
  try {
    const { client_system_id } = req.query;

    const warehouses = await warehouseService.getAllWarehouses(client_system_id);
    res.status(200).json(warehouses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener una bodega por ID
 getWarehouseById = async (req, res) => {
  try {
    const warehouse = await warehouseService.getWarehouseById(req.params.id);
    res.status(200).json(warehouse);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

// Actualizar una bodega
updateWarehouse = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const warehouse = await warehouseService.updateWarehouse(req.params.id, { name, description, status });
    res.status(200).json({ warehouse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una bodega
 deleteWarehouse = async (req, res) => {
  try {
    const message = await warehouseService.deleteWarehouse(req.params.id);
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

}
export default new WarehouseController()
