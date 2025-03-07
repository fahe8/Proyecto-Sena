import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const EmpresaTipoCancha = sequelize.define(
  "empresa_tipo_cancha",
  {
    tarifa: DataTypes.FLOAT,
  },
  { timestamps: false }
);
