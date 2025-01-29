import express from 'express'
import clientRoutes from '../routes/clientRoutes.js'
import authRoutes from '../routes/authRoutes.js';
import dataDetailRoutes from '../routes/dataDetailRoutes.js';
import dataRoutes from '../routes/dataRoutes.js';
import moduleRoutes from '../routes/moduleRoutes.js';
import moduleClientRoutes from '../routes/moduleClientRoutes.js';
import redirectionRoutes from '../routes/redirectionRoutes.js';
import companynRoutes from '../routes/CompanyRoutes.js';
import productRoutes from '../routes/inventory/productRoutes.js'
import unitOfMeasureRoutes  from '../routes/inventory/unitOfMeasureRoutes.js'
import warehouseRoutes from '../routes/inventory/warehouseRoutes.js'
import userRoutes from '../routes/userRoutes.js'
import roleRoutes   from '../routes/roleRoutes.js'
import inventoryDocumentTypeRoutes from '../routes/inventory/inventoryDocumentTypeRoutes.js'
import thirdpartyRoutes from '../routes/admin/thirdpartRoutes.js'


const router = express.Router()

// router.use('/api/client',clientRoutes)
router.use('/api/auth', authRoutes);
router.use('/api/product', productRoutes);
router.use('/api/unitofmeasure', unitOfMeasureRoutes);
router.use('/api/warehouse', warehouseRoutes);
router.use('/api/user', userRoutes);
router.use('/api/roles', roleRoutes);
router.use('/api/inventory-document-type', inventoryDocumentTypeRoutes);
router.use('/api/third-party', thirdpartyRoutes);
// router.use('/api/data', dataRoutes);
// router.use('/api/dashboard', dataDetailRoutes);
// router.use('/api/module', moduleRoutes);
// router.use('/api/moduleclient', moduleClientRoutes);
// router.use('/api/redirection', redirectionRoutes);
router.use('/api/company', companynRoutes);

export default router

