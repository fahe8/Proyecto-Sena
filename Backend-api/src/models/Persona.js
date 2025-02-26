import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

export const Persona = sequelize.define(
  "persona",
  {
    id_persona: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
  },
  {
    tableName: "persona",
    freezeTableName: true,
    timestamps: false,
  }
);
