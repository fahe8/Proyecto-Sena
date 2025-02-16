import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Empresa = sequelize.define(
  "Empresa",
  {
    id_empresa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: DataTypes.STRING(150), allowNull: false },
    direccion: { type: DataTypes.STRING(255), allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    hora_apertura: { type: DataTypes.TIME, allowNull: false },
    hora_cierre: { type: DataTypes.TIME, allowNull: false },
    estado: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "empresa", timestamps: false }
);
