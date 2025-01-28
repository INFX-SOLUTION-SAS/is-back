

import Lot from '../../models/lot.js'
import { v4 as uuidv4} from 'uuid';
import mysql from  'mysql2'



const get= async(idFind)=>{
  const model = await Lot.findOne( 
    { where : {id:idFind}},
    { attributes: { exclude: ['createdAt', 'updatedAt'] }}
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
      attributes: ['id', 'name', 'state', 'description'], // Campos específicos
      order: [['id', 'ASC']], // Ordenar por nombre
      limit: parseInt(limit), // Límite de registros por página
      offset: parseInt(offset), // Desplazamiento para la paginación
    });
    const list = result.rows
    const totalPages = Math.ceil(result.count / limit)
    return {success:true, message: "success", status: 200, data: list, total: result.count, page: page, totalPages, error: null };
  } catch (err) {
    console.error("Error:", err);
    return {success:false, message: "error", status: 500, error: err, data: null };
  }
};


const insert= async(body)=>{
  try{
    var res = await Lot.create(body)
    return { message: 'lote de produccion ingresado', status:200 };
  }catch(err){
    return { message: 'Error en el servidor', status:500 , error:err };
  }  
}



export default {
    get,
    getList,
    insert
};