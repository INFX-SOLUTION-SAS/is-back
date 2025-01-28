import express from 'express';
import WarehouseController from '../../controllers/inventory/warehouseController.js';

const router = express.Router();

// Crear una nueva bodega
router.post('/', WarehouseController.createWarehouse);

// Obtener todas las bodegas
router.get('/', WarehouseController.getAllWarehouses);

// Obtener una bodega por ID
router.get('/:id', WarehouseController.getWarehouseById);

// Actualizar una bodega
router.put('/:id', WarehouseController.updateWarehouse);

// Eliminar una bodega
router.delete('/:id', WarehouseController.deleteWarehouse);

export default router;
