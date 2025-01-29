
import Module from '../models/module.js'
import ModuleClient from '../models/moduleClient.js'
import Client from '../models/client.js'
import { v4 as uuidv4 } from 'uuid';
import ModuleSeeder from './Modules.js';
import ClientsSeeder from './Clients.js';
import UserSeeder from './User.js';
import RoleSeeder from './RoleSeeder.js';
import UserRoleSeeder from './UserRole.js';
import UnitOfMeasureSeed from './UnitOfMeasure.js';
import InventoryDocumentTypesSeeder from './inventory/InventoryDocumentTypesSeeder.js';

const Seeder = async() => {
  try {

     await ModuleSeeder()
    await ClientsSeeder();
    await UserSeeder();
    await RoleSeeder();
    await UserRoleSeeder();
    await UnitOfMeasureSeed();
    await InventoryDocumentTypesSeeder();
    console.log("Seeder executed..");
  } catch (err) {
    console.log("error seeder:" + err)
  }
}

export default Seeder ;