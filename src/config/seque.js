import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config();

console.log("EnvConfig", { "dbname" : process.env.DB_NAME, "dialect" : process.env.DB_DIALECT})

const seque = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || "mssql",
  port: process.env.DB_PORT,
  timezone: '-05:00',
  define: {
    timestamps: true,
    freezeTableName: true
  },
  dialectOptions: {
    instanceName: 'sql' // Instance name of your SQL Server
  },
  logging: console.log, // Esto mostrará las consultas en la consola.
})

export default seque;
