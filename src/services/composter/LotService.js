

import Lot from '../../models/lot.js'
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2'
import { Sequelize } from 'sequelize';


const getMaxConsecutive = async (body) => {
  const storeId = body.storeId
  const model = await Lot.findOne({
    attributes: [[Sequelize.fn('max', Sequelize.col('consecutive')),'max']],
    where: { storeId: storeId },
    raw: true,
  })
  return model
}


const get = async (idFind) => {
  const model = await Lot.findOne(
    { where: { id: idFind } },
    { attributes: { exclude: ['createdAt', 'updatedAt'] } }
  );
  return model
}

const getList = async (body) => {
  try {
    const { page = 1, limit = 10 } = body;
    console.log(page)
    console.log(limit)
    const offset = (page - 1) * limit;
    const result = await Lot.findAndCountAll({
      attributes: ['id', 'name', 'state', 'description', 'days', 'startDate', 'balance'],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    const list = result.rows
    const totalPages = Math.ceil(result.count / limit)
    return { success: true, message: "success", status: 200, data: list, total: result.count, page: page, totalPages, error: "kokoo" };
  } catch (err) {
    console.error("Error:", err);
    return { success: false, message: "error", status: 500, error: err, data: null };
  }
};


const insert = async (body) => {
  try {
    console.log(body)
    //return { message: 'lote de produccion ingresado', status: 200 };
    var res = await Lot.create(body)
    return { message: 'lote de produccion ingresado', status: 200 };
  } catch (err) {
    return { message: 'Error en el servidor', status: 500, error: err };
  }
}



const getActiveList = async (body) => {
  try {
    console.log("llogo por aca")
    const list = await Lot.findAll({
      where: { state: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [['name', 'ASC']],
    });
    return { success: true, message: "success", status: 200, data: list, error: null };
  } catch (err) {
    console.error("Error:", err);
    return { success: false, message: "error", status: 500, error: err, data: null };
  }
};




const update = async (body) => {
  try {    
    const {id,store,product,startDate,days,balance,state,description} = body   
    const lot = await Lot.findOne({where:{id}});
    if(lot==null){
      return { message: "Lote no existe: " + lotId, status: 400 };
    }
    else{
      lot.store = store
      lot.product = product
      lot.product = product
      lot.startDate = startDate
      lot.days = days
      lot.balance = balance
      lot.state = state
      lot.description = description
      await lot.save();
      return {success:true, message: 'lote actualizado', status:200 };
    } 
  } catch (err) {
    return {success:false, message: "error", status: 500, error: err, data: null };
  }
}




export default {
  get,
  getList,
  insert,
  getActiveList,
  getMaxConsecutive,
  update
};