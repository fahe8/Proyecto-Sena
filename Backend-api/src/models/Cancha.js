import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Cancha = sequelize.define(
  "Cancha",
  {
    id_cancha: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estado: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
    id_empresa: { type: DataTypes.INTEGER, allowNull: false },
    creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "cancha", timestamps: false }
);
