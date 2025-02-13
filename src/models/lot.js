import { DataTypes } from 'sequelize';
import conectDb from '../config/db.js'
const sequelize = conectDb()
 
const Model = sequelize.define('lots', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  consecutive: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  storeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue:1,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      const value = this.getDataValue('startDate');
      return value ? value.toISOString().split('T')[0] : null;
    }
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const value = this.getDataValue('startDate');
      return value ? value.toISOString().split('T')[0] : null;
    }
  },
  days: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'lots'
});

Model.sync();
export default Model;