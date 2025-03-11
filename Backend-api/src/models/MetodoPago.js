import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

export const MetodoPago = sequelize.define("metodo_pago", {
  id_metodo_pago: { type: DataTypes.STRING, primaryKey: true },
},{timestamps:false});
