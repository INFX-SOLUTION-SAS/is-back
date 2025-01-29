// routes/thirdPartyRoutes.js
import express from 'express';
import ThirdPartyController from '../../controllers/admin/thirdpartController.js';

const router = express.Router();

router.post('/', ThirdPartyController.createThirdParty);
router.get('/', ThirdPartyController.getAllThirdParties);
router.get('/:id', ThirdPartyController.getThirdPartyById);
router.put('/:id', ThirdPartyController.updateThirdParty);
router.delete('/:id', ThirdPartyController.deleteThirdParty);

export default router;