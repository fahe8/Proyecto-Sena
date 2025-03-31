import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const TipoCancha = sequelize.define("tipo_cancha", {
  id_tipo_cancha: { type: DataTypes.STRING, primaryKey: true}
},{timestamps:false});
