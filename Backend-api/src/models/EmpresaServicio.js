import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const EmpresaServicio = sequelize.define(
  "empresa_servicio",
  {},
  { timestamps: false }
);
