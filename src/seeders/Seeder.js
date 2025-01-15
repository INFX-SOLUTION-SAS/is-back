
import Module from '../models/module.js'
import ModuleClient from '../models/moduleClient.js'
import Client from '../models/client.js'
import { v4 as uuidv4 } from 'uuid';
import ModuleSeeder from './Modules.js';

const Seeder = async() => {
  try {

    await ModuleSeeder()
    console.log("Seeder executed..");
  } catch (err) {
    console.log("error seeder:" + err)
  }
}

export default Seeder ;