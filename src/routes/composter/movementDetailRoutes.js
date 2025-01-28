import express from 'express'
import controller from '../../controllers/composter/movementDetailController.js'
import verifyToken from '../../middleware/authMiddleware.js';
const router = express.Router()


/**
* @swagger
* /api/movementDetail/list:
*   get:
*     summary: Obtiene todos los registros
*     tags:
*       - MovementDetail
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
* /api/movementDetail/get:
*   get:
*     summary: Obtiene todos un registro por id
*     tags:
*       - MovementDetail
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
* /api/movementDetail/insert:
*   post:
*     summary: ingresa un registro
*     tags:
*       - MovementDetail
*     description: Retorna un registro.
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               movementId:
*                 type: string
*                 default: 8ebd087f-68e2-419a-8ca6-d502737d3af4
*               machineId:
*                 type: string
*                 default: 2a4858d8-6802-4529-b503-a4ae3d9e9bcf
*               time:
*                 type: number
*                 default: 1
*               activityId:
*                 type: string
*                 default: a8535c8b-94e1-4b86-8b6a-418da700c124
*               description:
*                 type: string
*                 default: descripcion
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