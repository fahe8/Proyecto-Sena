import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { TipoDocumento } from "./TipoDocumento.js";

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
    num_documento: { type: DataTypes.BIGINT },
    id_tipoDocumento: {
      type: DataTypes.INTEGER,
      references: { model: TipoDocumento, key: "id_tipoDocumento" },
    },
  },
  {
    tableName: "persona",
    freezeTableName: true,
    timestamps: false,
  }
);
