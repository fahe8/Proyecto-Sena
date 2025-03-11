import sequelize from "../config/db.js";
import { PersonaService } from "../Persona/PersonaService.js";
import { PropietarioRepository } from "./PropietarioRepository.js";

export class PropietarioService extends PersonaService {
  static async obtenerTodosPropietarios() {
    return await PropietarioRepository.obtenerPropietarioPorId();
  }
  static async registrarPropietario(datos) {
    const { id_tipoDocumento, num_documento, email } = datos;

    if (!id_tipoDocumento || !num_documento || !email) {
      throw new Error(
        "Tipo de documento, numero de documento e email son obligatorios"
      );
    }
    //Inicair transaccion
    const t = await sequelize.transaction();
    try {
      //Buscar y crear Persona
      const nuevaPersona = await this.crearPersona(datos, t);

      //Crear propietario
      const propietario = await PropietarioRepository.crearPropietario(
        nuevaPersona.id_persona,
        id_tipoDocumento,
        num_documento,
        t
      );
      // Confirmar transacción
      await t.commit();

      return propietario;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  static async actualizarPropietario(id_persona,datosPersona,datosPropietarios) {

    if (!id_persona) {
      throw new Error("Se necesita el id_persona");
    }
    await this.actualizarPersona(id_persona,datosPersona);

    return await PropietarioRepository.actualizarPropietario(id_persona, datosPropietarios)
  }
}
