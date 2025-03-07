import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const Reserva = sequelize.define("reserva", {
  id_reserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: DataTypes.DATE,
  hora_inicio: DataTypes.TIME,
  hora_final: DataTypes.TIME,
});
