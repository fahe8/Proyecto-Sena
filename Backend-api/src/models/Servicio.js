import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const Servicio = sequelize.define(
  "servicio",
  {
    id_servicio: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    tipo: DataTypes.STRING,
  },
  { timestamps: false }
);
