import { Persona } from "../models/Persona.js";
import { Credencial } from "../models/Credencial.js";
import { Propietario } from "../models/Propietario.js";
import { Usuario } from "../models/Usuario.js";
import { Administrador } from "../models/Administrador.js";
import { Cancha } from "../models/Cancha.js";
import { Empresa } from "../models/Empresa.js";
import { EstadoEmpresa } from "../models/EstadoEmpresa.js";
import { EstadoCancha } from "../models/EstadoCancha.js";
import { TipoCancha } from "../models/TipoCancha.js";
import { Resena } from "../models/Resena.js";
import { Reserva } from "../models/Reserva.js";
import { MetodoPago } from "../models/MetodoPago.js";
import { Pago } from "../models/Pago.js";
import { EstadoPago } from "../models/EstadoPago.js";
import { Servicio } from "../models/Servicio.js";
import { EmpresaServicio } from "../models/EmpresaServicio.js";

import { TipoDocumento } from "../models/TipoDocumento.js";
import { Tarifa } from "../models/Tarifa.js";

// ✅ Define relaciones después de importar los modelos
Persona.hasOne(Credencial, { foreignKey: "id_persona" });
Credencial.belongsTo(Persona, { foreignKey: "id_persona" });

Persona.hasOne(Administrador, { foreignKey: "id_persona" });
Administrador.belongsTo(Persona, { foreignKey: "id_persona" });

TipoDocumento.hasMany(Propietario, { foreignKey: "id_tipoDocumento" });
Propietario.belongsTo(TipoDocumento, { foreignKey: "id_tipoDocumento" });

Persona.hasOne(Usuario, { foreignKey: "id_persona" });
Usuario.belongsTo(Persona, { foreignKey: "id_persona" });

Propietario.hasMany(Empresa, { foreignKey: "id_propietario" });
Empresa.belongsTo(Propietario, { foreignKey: "id_propietario" });

Empresa.belongsTo(EstadoEmpresa, { foreignKey: "id_estado_empresa" });

Usuario.hasMany(Resena, { foreignKey: "id_usuario" });
Resena.belongsTo(Usuario, { foreignKey: "id_usuario" });

Empresa.hasMany(Resena, { foreignKey: "NIT" });
Resena.belongsTo(Empresa, { foreignKey: "NIT" });

Empresa.hasMany(Cancha, { foreignKey: "NIT" });
Cancha.belongsTo(Empresa, { foreignKey: "NIT" });

TipoCancha.hasMany(Cancha, { foreignKey: "id_tipo_cancha" });
Cancha.belongsTo(TipoCancha, { foreignKey: "id_tipo_cancha" });

EstadoCancha.hasMany(Cancha, { foreignKey: "id_estado_cancha" });
Cancha.belongsTo(EstadoCancha, { foreignKey: "id_estado_cancha" });

Usuario.hasMany(Reserva, { foreignKey: "id_usuario" });
Reserva.belongsTo(Usuario, { foreignKey: "id_usuario" });

Cancha.hasMany(Reserva, { foreignKey: "id_cancha" });
Reserva.belongsTo(Cancha, { foreignKey: "id_cancha" });

MetodoPago.hasMany(Pago, { foreignKey: "id_metodo_pago" });
Pago.belongsTo(MetodoPago, { foreignKey: "id_metodo_pago" });

EstadoPago.hasMany(Pago, { foreignKey: "id_estado_pago" });
Pago.belongsTo(EstadoPago, { foreignKey: "id_estado_pago" });

Reserva.hasMany(Pago, { foreignKey: "id_reserva" });
Pago.belongsTo(Reserva, { foreignKey: "id_reserva" });

Empresa.belongsToMany(Servicio, {
  through: EmpresaServicio,
  foreignKey: "NIT",
});
Servicio.belongsToMany(Empresa, {
  through: EmpresaServicio,
  foreignKey: "id_servicio",
});

Tarifa.belongsTo(Empresa, { foreignKey: "NIT" });
Tarifa.belongsTo(TipoCancha, { foreignKey: "id_tipo" });

export default function iniciarAsociaciones() {
  console.log("Asociaciones configuradas correctamente.");
}
