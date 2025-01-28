import express from 'express'
import clientRoutes from './general/clientRoutes.js'
import authRoutes from '../routes/authRoutes.js';
import dataDetailRoutes from './dashboard/dataDetailRoutes.js';
import dataRoutes from './dashboard/dataRoutes.js';
import moduleRoutes from './general/moduleRoutes.js';
import moduleClientRoutes from './general/moduleClientRoutes.js';
import redirectionRoutes from './general/redirectionRoutes.js';
import companynRoutes from './general/CompanyRoutes.js';


//COMPOSTER//
import productRoutes from '../routes/composter/productRoutes.js';
import storeRoutes from '../routes/composter/storeRoutes.js';
import machineRoutes from '../routes/composter/machineRoutes.js';
import activityRoutes from '../routes/composter/activityRoutes.js';
import movementTypeRoutes from '../routes/composter/movementTypeRoutes.js';
import lotRoutes from '../routes/composter/lotRoutes.js';
import movementRoutes from '../routes/composter/movementRoutes.js';
import movementDetailRoutes from '../routes/composter/movementDetailRoutes.js';


const router = express.Router()

router.use('/api/client',clientRoutes)
router.use('/api/auth', authRoutes);
router.use('/api/data', dataRoutes);
router.use('/api/dashboard', dataDetailRoutes);
router.use('/api/module', moduleRoutes);
router.use('/api/moduleclient', moduleClientRoutes);
router.use('/api/redirection', redirectionRoutes);
router.use('/api/company', companynRoutes);

//COMPOSTER//
router.use('/api/product', productRoutes);
router.use('/api/store', storeRoutes);
router.use('/api/machine', machineRoutes);
router.use('/api/activity', activityRoutes);
router.use('/api/movementtype', movementTypeRoutes);
router.use('/api/lot', lotRoutes);
router.use('/api/movement', movementRoutes);
router.use('/api/movementDetail', movementDetailRoutes);

export default router

