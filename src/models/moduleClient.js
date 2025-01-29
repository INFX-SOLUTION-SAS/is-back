import { DataTypes } from 'sequelize';
import conectDb from '../config/db.js'
const sequelize = conectDb()

const variable = 0

 
const ModuleClient = sequelize.define('moduleclients', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  client_system_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  moduleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, 
{
  indexes: [
    {
      unique: true,
      fields: ['client_system_id', 'moduleId'] // Restricción única compuesta
    }
  ]
}

, {
  tableName: 'moduleclients'
});

ModuleClient.sync();
export default ModuleClient;