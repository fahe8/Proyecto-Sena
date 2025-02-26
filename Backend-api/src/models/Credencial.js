import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { Persona } from "./Persona.js";
export const Credencial = sequelize.define(
  "credencial",
  {
    id_credencial: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_persona: {
      type: DataTypes.INTEGER,
      references: { model: Persona, key: "id_persona" },
    },
    contrasena: { type: DataTypes.STRING },
    bloqueado: { type: DataTypes.BOOLEAN },
  },
  {
    tableName: "credencial",
    freezeTableName: true,
    timestamps: false,
  }
);
