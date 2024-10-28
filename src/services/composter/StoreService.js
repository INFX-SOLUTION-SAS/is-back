

import Store from '../../models/store.js'
import { v4 as uuidv4} from 'uuid';
import mysql from  'mysql2'



const get= async(idFind)=>{
  const model = await Store.findOne( 
    { where : {id:idFind}},
    { attributes: { exclude: ['createdAt', 'updatedAt'] }}
);
  return model
}

const getList= async()=>{ 
  try{
    const list = await Store.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }});
    return { list:list, status:200 };
  }catch(err){
    return { list:null, status:500 , error:err };
  }  
}


const insert= async(body)=>{
  try{
    var res = await Store.create(body)
    return { message: 'bodega ingresada', status:200 };
  }catch(err){
    return { message: 'Error en el servidor', status:500 , error:err };
  }  
}



export default {
    get,
    getList,
    insert
};