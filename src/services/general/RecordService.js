

import Record from '../../models/record.js'
import User from '../../models/user.js'
import Module from '../../models/module.js'
import { v4 as uuidv4} from 'uuid';
import mysql from  'mysql2'



const get= async(idFind)=>{
  const model = await Record.findOne( 
    { where : {id:idFind}},
    { attributes: { exclude: ['createdAt', 'updatedAt'] }}
);
  return model
}

const getListOld= async()=>{ 
  try{
    const list = await Record.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }});
    return { list:list, status:200 };
  }catch(err){
    return { list:null, status:500 , error:err };
  }  
}


const getList = async () => {

 

  // Definir la relación con User
  Record.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Record, { foreignKey: 'userId' });

  // Definir la relación con Modulo
  Record.belongsTo(Module, { foreignKey: 'moduleId' });
  Module.hasMany(Record, { foreignKey: 'moduleId' });



  try {
    const list = await Record.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          required: true,         
        }
      ],
      include: [
        {
          model: Module,    
          attributes: { exclude: ['createdAt', 'updatedAt'] },     
          required: true,         
        }
      ]
    });

    return { list: list, status: 200 };
  } catch (err) {
    console.log(err)
    return { list: null, status: 500, error: err };
  }
}


const insert= async(body)=>{

  try{
    console.log("registro preingresado service",body)
    var res = await Record.create(body)
    console.log("registro ingresado service")
    return { message: 'record ingresado', status:200 };
  }catch(err){
    console.log("OCURRIO UN ERROR:"+err.message)
    return { message: 'Error en el servidor', status:500 , error:err };
  }  
}



export default {
    get,
    getList,
    insert
};