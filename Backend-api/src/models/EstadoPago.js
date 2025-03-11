import sequelize from "../config/db.js";

import { DataTypes } from "sequelize";
export const EstadoPago = sequelize.define("estado_pago", {
  id_estado_pago: { type: DataTypes.STRING, primaryKey: true },
},{timestamps:false});
