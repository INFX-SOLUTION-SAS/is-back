


import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2'
import { Sequelize } from 'sequelize';

import MovementDetail from '../../models/movementDetail.js'
import Movement from '../../models/movement.js'
import Lot from '../../models/lot.js'
import Activity from '../../models/activity.js'
import Product from '../../models/product.js'
import MovementType from '../../models/movementType.js'


const getReportMovementDetails = async (body) => {

  console.log(body)
  const { page = 1, limit = 10 } = body;
  const offset = (page - 1) * limit;

  /*
  
  
 
  
  */

  
  Movement.hasMany(MovementDetail, { foreignKey: 'movementId'});
  MovementDetail.belongsTo(Movement, { foreignKey: 'movementId' });

  Lot.hasMany(Movement, { foreignKey: 'lotId'});
  Movement.belongsTo(Lot, { foreignKey: 'lotId'});
  
  MovementType.hasMany(Movement, { foreignKey: 'type' });
  Movement.belongsTo(MovementType, { foreignKey: 'type' });



  try {
    const report = await Movement.findAndCountAll({
      attributes: ['id','lotId'],
      include: [
        {
          model: MovementDetail,
          attributes: ['id', 'description', 'machineName', 'time'],
          required: false 
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
      limit: parseInt(limit), 
      offset: parseInt(offset) 
    });
    const list = report.rows


    /*const reportFormated = list.map(movement => {
      if (movement.details.length > 0) {
        return movement.details.map(detail => ({
          movementId: movement.id,
          lotName: movement.lotId,
          movementDetail: detail.id,
          movementDetailDescription: detail.description
        }));
      } else {
        return [{
          movementId: movement.id,
          lotId: movement.lotId,
          movementDetail: null,
          movementDetailDescription: null
        }];
      }
    }).flat();*/


    console.log(list.flat())



    const totalPages = Math.ceil(report.count / limit)

    return { success: true, message: "success", status: 200, data: list, total: report.count, page: page, totalPages, error: "kokoo" };
  } catch (err) {
    console.error("Error:", err);
    return { success: false, message: "error", status: 500, error: err, data: null };
  }
};









export default  getReportMovementDetails 