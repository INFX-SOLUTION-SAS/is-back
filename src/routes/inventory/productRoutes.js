import express from 'express';
import productController from '../../controllers/inventory/productController.js';

const router = express.Router();

router.post('/', productController.createProduct); // Crear producto
router.get('/', productController.getAllProducts); // Obtener todos los productos
router.get('/:id', productController.getProductById); // Obtener producto por ID
router.put('/:id', productController.updateProduct); // Actualizar producto
router.delete('/:id', productController.deleteProduct); // Eliminar producto

export default router;