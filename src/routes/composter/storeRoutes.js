import express from 'express'
import controller from '../../controllers/composter/storeController.js'
import verifyToken from '../../middleware/authMiddleware.js';
const router = express.Router()


/**
* @swagger
* /api/store/list:
*   get:
*     summary: Obtiene todos los registros
*     tags:
*       - Store
*     description: Retorna una lista de todos los registros.
*     responses:
*       200:
*         description: Operación exitosa. Devuelve una lista de registros.
*       500:
*         description: Error interno del servidor.
*/

router.get('/list',controller.listController)

/**
* @swagger
* /api/store/get:
*   get:
*     summary: Obtiene todos un registro por id
*     tags:
*       - Store
*     description: Retorna un registro.
*     parameters:
*       - in: query
*         name: id
*         description: ID del registro
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve un registro.
*       500:
*         description: Error interno del servidor.
*/
router.get('/get',controller.getController)

/**
* @swagger
* /api/store/insert:
*   post:
*     summary: ingresa un registro
*     tags:
*       - Store
*     description: Retorna un registro.
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 default: Tunel 1
*               description:
*                 type: string
*                 default: Tunel 1 - productivo
*               state:
*                 type: boolean
*     responses:
*       200:
*         description: Operación exitosa. Devuelve un registro.
*       500:
*         description: Error interno del servidor.
*/
router.post('/insert',controller.insertController)


export default router