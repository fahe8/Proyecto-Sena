import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const Administrador = sequelize.define("administrador", {
  id_administrador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_persona: { type: DataTypes.INTEGER, allowNull: false },
});
