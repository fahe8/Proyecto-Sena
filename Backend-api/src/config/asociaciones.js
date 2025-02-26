import { TipoDocumento } from "../models/TipoDocumento.js";
import { Persona } from "../models/Persona.js";
import { Credencial } from "../models/Credencial.js";
import { Propietario } from "../models/Propietario.js";
import { Usuario } from "../models/Usuario.js";
import { Administrador } from "../models/Administrador.js";

// ✅ Define relaciones después de importar los modelos
Persona.belongsTo(TipoDocumento, { foreignKey: "id_tipoDocumento" });
Credencial.belongsTo(Persona, { foreignKey: "id_persona" });
Administrador.belongsTo(Persona, { foreignKey: "id_persona" });
Propietario.belongsTo(Persona, { foreignKey: "id_persona" });
Usuario.belongsTo(Persona, { foreignKey: "id_persona" });

export default function iniciarAsociaciones() {
  console.log("Asociaciones configuradas correctamente.");
}
