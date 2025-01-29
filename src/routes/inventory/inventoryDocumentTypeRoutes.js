import express from 'express';
import InventoryDocumentTypeController from '../../controllers/inventory/InventoryDocumentTypeInventoryController.js';

const router = express.Router();

// Ruta para crear un nuevo tipo de documento
router.post('/', InventoryDocumentTypeController.create);

// Ruta para obtener todos los tipos de documentos
router.get('/', InventoryDocumentTypeController.getAll);

// Ruta para obtener un tipo de documento por ID
router.get('/:id', InventoryDocumentTypeController.getById);

// Ruta para actualizar un tipo de documento por ID
router.put('/:id', InventoryDocumentTypeController.update);

// Ruta para eliminar un tipo de documento por ID
router.delete('/:id', InventoryDocumentTypeController.delete);

export default router;
