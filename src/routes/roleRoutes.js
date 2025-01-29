import { Router } from 'express';
import roleController from '../controllers/roleController.js';
const router = Router();

router.get('/', roleController.getRoles);

export default router;