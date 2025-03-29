import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql from "mysql2/promise.js";

dotenv.config();
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;


//
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
  dialectOptions: {
    ssl: false,
  },
  logging: false,
});



//Conexión usando solo mysql2, para hacer consultar con Queries
export const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

export default sequelize;
