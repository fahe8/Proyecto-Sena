import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { Persona } from "./Persona.js";
export const Administrador = sequelize.define(
  "administrador",
  {
    id_administrador: {
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
    tableName: "administrador",
    freezeTableName: true,
    timestamps: false,
  }
);
