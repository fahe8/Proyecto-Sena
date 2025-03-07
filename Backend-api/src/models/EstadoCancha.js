import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const EstadoCancha = sequelize.define("estado_cancha", {
  id_estado_cancha: { type: DataTypes.STRING, primaryKey: true },
});
