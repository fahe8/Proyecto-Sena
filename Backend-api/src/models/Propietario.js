import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

export const Propietario = sequelize.define("propietario", {
  id_propietario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_persona: { type: DataTypes.INTEGER, allowNull: false },
  id_tipoDocumento: { type: DataTypes.STRING, allowNull: false },
  num_documento: DataTypes.BIGINT,
});
