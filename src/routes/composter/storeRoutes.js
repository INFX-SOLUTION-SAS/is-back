import express from 'express'
import controller from '../../controllers/composter/storeController.js'
import verifyToken from '../../middleware/authMiddleware.js';
const router = express.Router()

router.get('/list',controller.listController)
router.get('/get',controller.getController)
router.post('/insert',controller.insertController)
router.post('/update',controller.update)
router.get('/get-all-list',controller.getAllList)


export default router