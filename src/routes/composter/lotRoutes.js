import express from 'express'
import controller from '../../controllers/composter/lotController.js'
import verifyToken from '../../middleware/authMiddleware.js';
const router = express.Router()


/**
* @swagger
* /api/lot/list:
*   get:
*     summary: Obtiene todos los registros
*     tags:
*       - Lot
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
* /api/lot/get:
*   get:
*     summary: Obtiene todos un registro por id
*     tags:
*       - Lot
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
* /api/lot/insert:
*   post:
*     summary: ingresa un registro
*     tags:
*       - Lot
*     description: Retorna un registro.
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               storeId:
*                 type: string
*                 default: 16f3a759-02f1-435d-bb86-4094893ae42d
*               productId:
*                 type: string
*                 default: 99811105-273f-4553-a9be-f0251d71b97d
*               initDate:
*                 type: date
*                 default: 2024-10-24
*               finalDate:
*                 type: date
*                 default: 2024-12-24
*               days:
*                 type: number
*                 default: 0
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