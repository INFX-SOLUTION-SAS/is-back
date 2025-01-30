import express from 'express';
import SupplierController from '../../controllers/inventory/supplierController.js';

const router = express.Router();

router.post('/', SupplierController.create); // Crear producto
router.get('/', SupplierController.getAll); // Obtener todos los productos
router.get('/:id', SupplierController.getById); // Obtener producto por ID
router.put('/:id', SupplierController.update); // Actualizar producto
router.delete('/:id', SupplierController.delete); // Eliminar producto

export default router;