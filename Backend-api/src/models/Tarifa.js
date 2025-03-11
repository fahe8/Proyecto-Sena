import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

export const Tarifa = sequelize.define(
  "tarifa",
  {
    id_tarifa: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tarifa: { type: DataTypes.FLOAT, allowNull: false },
  },
  { timestamps: false }
);
