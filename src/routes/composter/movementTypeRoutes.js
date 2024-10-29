import express from 'express'
import controller from '../../controllers/composter/movementTypeController.js'
import verifyToken from '../../middleware/authMiddleware.js';
const router = express.Router()


/**
* @swagger
* /api/movementtype/list:
*   get:
*     summary: Obtiene todos los registros
*     tags:
*       - MovementType
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
* /api/movementtype/get:
*   get:
*     summary: Obtiene todos un registro por id
*     tags:
*       - MovementType
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
* /api/movementtype/insert:
*   post:
*     summary: ingresa un registro
*     tags:
*       - MovementType
*     description: Retorna un registro.
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 default: Perfilamiento
*               description:
*                 type: string
*                 default: Perfilamiento en tunel
*               state:
*                 type: boolean
*               inventory:
*                 type: boolean
*     responses:
*       200:
*         description: Operación exitosa. Devuelve un registro.
*       500:
*         description: Error interno del servidor.
*/
router.post('/insert',controller.insertController)


export default router