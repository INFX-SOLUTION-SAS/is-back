


import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2'
import { Sequelize } from 'sequelize';
import { Op } from "sequelize";

import Movement from '../../models/movement.js'
import Lot from '../../models/lot.js'
import Activity from '../../models/activity.js'
import Product from '../../models/product.js'
import MovementType from '../../models/movementType.js'


const getReportMovements = async (body) => {
  const { startDate, endDate } = body

  console.log(body)
  const { page = 1, limit = 10 } = body;
  const offset = (page - 1) * limit;

  Activity.hasMany(Movement, { foreignKey: 'activityId' });
  Movement.belongsTo(Activity, { foreignKey: 'activityId' });
  
  Product.hasMany(Movement, { foreignKey: 'productId' });
  Movement.belongsTo(Product, { foreignKey: 'productId' });
  
  Lot.hasMany(Movement, { foreignKey: 'lotId' });
  Movement.belongsTo(Lot, { foreignKey: 'lotId' });
  
  MovementType.hasMany(Movement, { foreignKey: 'type' });
  Movement.belongsTo(MovementType, { foreignKey: 'type' });
  

  
  try {
    const report = await Movement.findAndCountAll({      
      where: { date: {  [Op.between]: [startDate + " 00:00:00", endDate + " 23:59:59"] } },
      include: [
        {
          model: Product,
          attributes: ['name']
        },
        {
          model: Activity,
          attributes: ['name']
        },
        {
          model: Lot,
          attributes: ['name']
        },
        {
          model: MovementType,
          attributes: ['name']
        }
      ],
      attributes: ['id', 'quantity', 'days', 'date'],
      order: [['createdAt', 'DESC']], // Ordenar por fecha de creación
      limit: parseInt(limit), // Límite de registros por página
      offset: parseInt(offset) // Para la paginación
    });

    const list = report.rows
    const totalPages = Math.ceil(report.count / limit)


    return { success: true, message: "success", status: 200, data: list, total: report.count, page: page, totalPages, error: "kokoo" };
  } catch (err) {
    console.error("Error:", err);
    return { success: false, message: "error", status: 500, error: err, data: null };
  }
};









export default getReportMovements