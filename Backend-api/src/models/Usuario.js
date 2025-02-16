import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

export const Usuario = sequelize.define(
  "Usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    telefono: { type: DataTypes.STRING(15), allowNull: true },
    rol: {
      type: DataTypes.ENUM("admin", "usuario", "empresa"),
      allowNull: false,
    },
    creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "usuario", timestamps: false }
);
