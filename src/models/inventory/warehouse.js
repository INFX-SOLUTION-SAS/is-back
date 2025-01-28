import conectDb from '../../config/db.js'
const sequelize = conectDb()
import { DataTypes } from 'sequelize';
import Client from '../client.js';

const Warehouse = sequelize.define('warehouse', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,  // Activo por defecto
  },
});

Warehouse.belongsTo(Client, {
  foreignKey: 'clientId',
  as: 'clients',
});

export default Warehouse;
