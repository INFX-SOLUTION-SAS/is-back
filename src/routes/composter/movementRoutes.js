import express from 'express'
import controller from '../../controllers/composter/movementController.js'
import verifyToken from '../../middleware/authMiddleware.js';
const router = express.Router()


/**
* @swagger
* /api/movement/list:
*   get:
*     summary: Obtiene todos los registros
*     tags:
*       - Movement
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
* /api/movement/get:
*   get:
*     summary: Obtiene todos un registro por id
*     tags:
*       - Movement
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
* /api/movement/insert:
*   post:
*     summary: ingresa un registro
*     tags:
*       - Movement
*     description: Retorna un registro.
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               date:
*                 type: date
*                 default: 2024-10-24
*               lotId:
*                 type: string
*                 default: a9a71804-79da-4a0c-88d1-b11a25bfbbe8
*               productId:
*                 type: string
*                 default: 99811105-273f-4553-a9be-f0251d71b97d
*               quantity:
*                 type: number
*                 default: 1500
*               type:
*                 type: string
*                 default: 32a7a6ef-73a4-43f7-8762-942891dd064e
*               days:
*                 type: number
*                 default: 0
*               description:
*                 type: string
*                 default: descripcion
*               synchronized:
*                 type: boolean
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