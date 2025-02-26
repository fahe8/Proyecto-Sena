import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { Persona } from "./Persona.js";
export const Propietario = sequelize.define(
  "propietario",
  {
    id_propietario: {
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
    tableName: "propietario",
    freezeTableName: true,
    timestamps: false,
  }
);
