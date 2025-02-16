import { Usuario } from "../models/Usuario.js";
import { Empresa } from "../models/Empresa.js";
import { Cancha } from "../models/Cancha.js";
import { Reserva } from "../models/Reserva.js";

// ✅ Define relaciones después de importar los modelos
Empresa.belongsTo(Usuario, { foreignKey: "id_usuario" });
Cancha.belongsTo(Empresa, { foreignKey: "id_empresa" });
Reserva.belongsTo(Cancha, { foreignKey: "id_cancha" });
Reserva.belongsTo(Usuario, { foreignKey: "id_usuario" });

export default function iniciarAsociaciones() {
  console.log("Asociaciones configuradas correctamente.");
}
