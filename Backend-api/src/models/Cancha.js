import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const Cancha = sequelize.define("cancha", {
  id_cancha: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
