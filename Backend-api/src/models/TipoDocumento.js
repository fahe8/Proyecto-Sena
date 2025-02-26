import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const TipoDocumento = sequelize.define("tipoDocumento", {
  id_tipoDocumento: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
});
