import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const Servicio = sequelize.define("servicio", {
  id_servicio: { type: DataTypes.STRING, primaryKey: true },
  tipo: DataTypes.STRING,
});
