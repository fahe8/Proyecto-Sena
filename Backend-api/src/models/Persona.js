import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
export const Persona = sequelize.define("persona", {
  id_persona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: { type: DataTypes.STRING, defaultValue: "" },
  apellido: { type: DataTypes.STRING, defaultValue: "" },
  telefono: { type: DataTypes.STRING, defaultValue: "" },
  email: DataTypes.STRING,
});
