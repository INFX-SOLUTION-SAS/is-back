
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js'
import Client from '../../models/client.js'
import { v4 as uuidv4} from 'uuid';
import dotenv from 'dotenv'
import UserRole from '../../models/userRoles.js';
import Role from '../../models/roles.js';

const login= async(body)=>{
  const JWT_SECRET = process.env.JWT_SECRET
  try { 
    const identification = body.identification;   
    const username = body.username;   
    const password = body.password;   
    const client = await Client.findOne({ where: { identification } });
    if (!client) {
      return { message: 'Usuario no encontrado', status:404 };
    }

    const user = await User.findOne({ where: { username,client_system_id:client.id } ,
      // include: [
      //   {
      //     model: Role,
      //     attributes: ['id', 'name'],
      //     through: { attributes: [] },
      //   },
      // ],
    });

    
    const userroles =  await UserRole.findOne({
      where : {
        userId : user.id
      }
    })

    const role = await Role.findByPk(userroles.roleId)
    // Extraer solo la información del rol
   

    if (!user) {
      return { message: 'Usuario no encontrado', status:404 };
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { message: 'Contraseña incorrecta', status:401 };
    }

    const token = jwt.sign(
        {
          id:user.id,      
          user:user.username,          
          client_system_id:user.client_system_id,          
          type:client.type,          
          name:client.name,          
          company:user.lastCompany,
          roles : role.name,
          static : role.name=="SuperAdministrador"?true:false
        },
        JWT_SECRET,
        {
            expiresIn:"2h"
        });

        if(user.lastCompany==null) 
          user.lastCompany = 1

    return { token, status:200, company:user.lastCompany };
  } catch (error) {
    console.log("error",error)
    return { message: 'Error en el servidor', status:500 };
  }
}


const insertUser= async(body)=>{
  var id = uuidv4()
  const passwordHash = await bcrypt.hash(body.password,7)
  const identification = body.identification
  try{
    const client = await Client.findOne({ where: { identification } });
    if(client==null){
      return { message: 'El nit no existe', status:500 };
    }
    const client_system_id = client.id
    body.password= passwordHash
    var usuario = {...body,id,client_system_id}
    var res = await User.create(usuario)
    return { message: 'Usuario creado', status:200 };
  }catch(err){
    return { message: 'Error en el servidor'+err, status:500 };
  }  
}



export default {
    insertUser,
    login
};