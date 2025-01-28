import express from 'express';
import unitOfMeasureController from '../../controllers/inventory/unitOfMeasureController.js';
const router = express.Router();

router.get('/', unitOfMeasureController.getAllUnits); // Obtener todas las unidades de medida

export default router;
