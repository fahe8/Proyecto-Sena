import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

export const Propietario = sequelize.define("propietario", {
  id_propietario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: { type: DataTypes.STRING, defaultValue: "" },
  apellido: { type: DataTypes.STRING, defaultValue: "" },
  telefono: { type: DataTypes.STRING, defaultValue: "" },
  email: DataTypes.STRING,
  id_tipoDocumento: { type: DataTypes.STRING, allowNull: false },
  num_documento: DataTypes.BIGINT,
});
