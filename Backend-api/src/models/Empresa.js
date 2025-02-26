// import sequelize from "../config/db.js";
// import { DataTypes } from "sequelize";
// import { EstadoEmpresa } from "./EstadoEmpresa.js";

// export const Empresa = sequelize.define(
//     "empresa",
//     {
//         id_empresa: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         nombre: { type: DataTypes.STRING },
//         direccion: { type: DataTypes.STRING },
//         descripcion: { type: DataTypes.STRING },
//         NIT: { type: DataTypes.BIGINT},
//         hora_apertura: { type: DataTypes.TIME},
//         hora_cierre: { type: DataTypes.TIME},

//         id_estado_empresa: {
//             type: DataTypes.INTEGER,
//             references: { model: EstadoEmpresa, key: "id_estado_empresa" },
//         },

//     }
// )
