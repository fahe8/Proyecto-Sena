import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const Usuario = sequelize.define("usuario", {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_persona: { type: DataTypes.INTEGER, allowNull: false },
});
