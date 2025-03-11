import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const Pago = sequelize.define("pago", {
  id_pago: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  monto: DataTypes.FLOAT,
  fecha_pago: DataTypes.DATE,
},{timestamps:false});
