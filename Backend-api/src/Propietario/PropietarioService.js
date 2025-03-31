import sequelize from "../config/db.js";
import { PersonaService } from "../Persona/PersonaService.js";
import { PropietarioRepository } from "./PropietarioRepository.js";

export class PropietarioService {
  static async obtenerTodosPropietarios() {
    return await PropietarioRepository.obtenerPropietarioPorId();
  }

  static async registrarPropietario(datos) {
    console.log(datos);
    const {
      nombre,
      apellido,
      telefono,
      id_tipoDocumento,
      num_documento,
      email,
    } = datos;

    if (!id_tipoDocumento || !num_documento || !email) {
      throw new Error(
        "Tipo de documento, numero de documento e email son obligatorios"
      );
    }

    const propietario = await PropietarioRepository.crearPropietario(
      nombre,
      apellido,
      telefono,
      email,
      id_tipoDocumento,
      num_documento
    );
    return propietario;
  }

  static async actualizarPropietario(id_propietario, datosPropietario) {
    if (!id_propietario) {
      throw new Error("Se necesita el id del propietario");
    }

    return await PropietarioRepository.actualizarPropietario(
      id_propietario,
      datosPropietario
    );
  }
}
