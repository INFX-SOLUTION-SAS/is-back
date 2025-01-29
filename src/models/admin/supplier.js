import conectDb from '../../config/db.js'
const sequelize = conectDb()
import { DataTypes } from 'sequelize';
import ThirdParty from './ThirdParty.js';


const Supplier = sequelize.define(
    'Supplier',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      thirdPartyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: ThirdParty,
          key: 'id',
        },
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactPerson: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'suppliers',
      timestamps: false,
    }
  );
  

  export default Supplier