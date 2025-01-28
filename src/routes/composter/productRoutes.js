import express from 'express'
import controller from '../../controllers/composter/productController.js'
import verifyToken from '../../middleware/authMiddleware.js';
const router = express.Router()

router.get('/get-all-list',controller.getAllList)
router.get('/list',controller.listController)
router.get('/get',controller.getController)
router.post('/insert',controller.insertController)
router.post('/update',controller.update)


export default router