import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { Persona } from "./Persona.js";

export const Usuario = sequelize.define(
  "usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_persona: {
      type: DataTypes.INTEGER,
      references: { model: Persona, key: "id_persona" },
    },
  },
  {
    tableName: "usuario",
    freezeTableName: true,
    timestamps: false,
  }
);
