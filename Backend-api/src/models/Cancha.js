import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { Empresa } from "./Empresa.js";
import { TipoCancha } from "./TipoCancha.js";

export const Cancha = sequelize.define(
  "cancha",
  {
    id_cancha: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

