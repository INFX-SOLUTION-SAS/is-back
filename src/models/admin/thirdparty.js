import conectDb from '../../config/db.js'
const sequelize = conectDb()
import { DataTypes } from 'sequelize';

const ThirdParty = sequelize.define(
    'ThirdParty',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      class: {
        type: DataTypes.ENUM(
          'natural',
          'juridica',
        ),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      identification: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      dv: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      client_system_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: 'third_parties',
      timestamps: false,
    }
  );


  export default ThirdParty