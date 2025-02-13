import express from 'express'
import controller from '../../controllers/composter/ReportController.js'
import verifyToken from '../../middleware/authMiddleware.js';
const router = express.Router()



router.get('/report-movements',controller.reportMovements)
router.get('/report-movement-details',controller.reportMovementDetails)
router.get('/excel-movements',controller.excelMovements)
router.get('/excel-movement-details',controller.excelMovementDetails)


export default router