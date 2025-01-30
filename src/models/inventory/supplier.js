import conectDb from '../../config/db.js'
const sequelize = conectDb()
import { DataTypes } from 'sequelize';
import ThirdParty from '../admin/thirdparty.js';


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
      status : {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      client_system_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: 'suppliers',
      timestamps: false,
    }
  );
  

  export default Supplier