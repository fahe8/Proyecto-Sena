import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const Credencial = sequelize.define("credencial", {
  id_credencial: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_persona: { type: DataTypes.INTEGER, allowNull: false },
  bloqueado: { type: DataTypes.BOOLEAN, defaultValue: false },
  token: DataTypes.STRING,
});
