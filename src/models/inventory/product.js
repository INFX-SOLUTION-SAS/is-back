import conectDb from '../../config/db.js'
const sequelize = conectDb()
import UnitOfMeasure from './unitOfmesuare.js';
import { DataTypes } from 'sequelize';

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    barcode:{
        type: DataTypes.STRING,
        allowNull: false,  
    },
    min_stock :{
        type: DataTypes.FLOAT,
        allowNull: false,  
    },
    max_stock :{
        type: DataTypes.FLOAT,
        allowNull: false,  
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,  
    }
  },
  {
    tableName: 'products',
    timestamps: true,
  }
);

Product.belongsTo(UnitOfMeasure, {
  foreignKey: 'unitOfMeasureId',
  as: 'unitOfMeasure',
});

export default Product;
