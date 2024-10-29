import express from 'express'
import clientRoutes from '../routes/clientRoutes.js'
import authRoutes from '../routes/authRoutes.js';
import dataDetailRoutes from '../routes/dataDetailRoutes.js';
import dataRoutes from '../routes/dataRoutes.js';
import moduleRoutes from '../routes/moduleRoutes.js';
import moduleClientRoutes from '../routes/moduleClientRoutes.js';
import redirectionRoutes from '../routes/redirectionRoutes.js';
import companynRoutes from '../routes/CompanyRoutes.js';


//COMPOSTER//
import productRoutes from '../routes/composter/productRoutes.js';
import storeRoutes from '../routes/composter/storeRoutes.js';
import machineRoutes from '../routes/composter/machineRoutes.js';
import activityRoutes from '../routes/composter/activityRoutes.js';


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

export default router

