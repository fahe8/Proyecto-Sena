import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

export const EstadoEmpresa = sequelize.define(
  "estado_empresa",
  {
    id_estado_empresa: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },

  {
    tableName: "estado_empresa",
    freezeTableName: true,
    timestamps: false,
  }
);
