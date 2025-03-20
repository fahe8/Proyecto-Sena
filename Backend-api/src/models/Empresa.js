import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const Empresa = sequelize.define("empresa", {
 NIT: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
  },
  nombre: DataTypes.STRING,
  direccion: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  hora_apertura: DataTypes.TIME,
  hora_cierre: DataTypes.TIME,
});
