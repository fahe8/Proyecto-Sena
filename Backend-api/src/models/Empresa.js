import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const Empresa = sequelize.define("empresa", {
  id_empresa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: DataTypes.STRING,
  direccion: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  NIT: DataTypes.BIGINT,
  hora_apertura: DataTypes.TIME,
  hora_cierre: DataTypes.TIME,
});
