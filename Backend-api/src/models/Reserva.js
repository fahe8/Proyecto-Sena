import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

export const Reserva = sequelize.define(
  "Reserva",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    hora_inicio: { type: DataTypes.TIME, allowNull: false },
    hora_final: { type: DataTypes.TIME, allowNull: false },
    id_cancha: { type: DataTypes.INTEGER, allowNull: false },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "reserva", timestamps: false }
);
