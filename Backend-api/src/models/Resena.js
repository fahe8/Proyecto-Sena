import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const Resena = sequelize.define("resena", {
  id_reseña: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  texto: DataTypes.STRING,
  calificacion: DataTypes.FLOAT,
});
