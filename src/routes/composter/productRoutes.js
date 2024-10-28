import express from 'express'
import controller from '../../controllers/composter/productController.js'
import verifyToken from '../../middleware/authMiddleware.js';
const router = express.Router()

/**
* @swagger
* /api/module/list:
*   get:
*     summary: Obtiene todos los elementos
*     tags:
*       - Module
*     description: Retorna una lista de todos los elementos registrados.
*     responses:
*       200:
*         description: Operación exitosa. Devuelve una lista de elementos.
*       500:
*         description: Error interno del servidor.
*/

router.get('/list',controller.listController)

/**
* @swagger
* /api/module/get:
*   get:
*     summary: Obtiene todos un elemento por id
*     tags:
*       - Module
*     description: Retorna un elemento.
*     parameters:
*       - in: query
*         name: id
*         description: ID del elemento
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve un elemento.
*       500:
*         description: Error interno del servidor.
*/
router.get('/get',controller.getController)

/**
* @swagger
* /api/module/insert:
*   post:
*     summary: Obtiene todos un elemento por id
*     tags:
*       - Module
*     description: Retorna un elemento.
*     parameters:
*       - in: query
*         name: id
*         description: ID del elemento
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve un elemento.
*       500:
*         description: Error interno del servidor.
*/
router.post('/insert',controller.insertController)
router.post('/delete',controller.deleteController)










export default router