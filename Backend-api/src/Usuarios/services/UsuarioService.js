import sequelize from "../../config/db.js";
import { PersonaService } from "../../Persona/PersonaService.js";
import { UsuarioRepository } from "../repository/UsuarioRepository.js";
import bcrypt from "bcrypt";

export class UsuarioService extends PersonaService {
  static async obtenerTodosUsuarios() {
    return await UsuarioRepository.obtenerTodosUsuarios();
  }

  static async registrarUsuario(datos) {
    const { email } = datos;
    // Iniciar transacción
    const t = await sequelize.transaction();

    try {
      //Buscar y crear Persona
      const nuevaPersona = await this.crearPersona(datos, t);
      console.log("Nueva persona", nuevaPersona);
      // Crear Usuario
      const nuevoUsuario = await UsuarioRepository.crearUsuario(
        nuevaPersona.id_persona,
        t
      );

      // Crear Credencial
      await UsuarioRepository.crearCredencial(nuevaPersona.id_persona, t);

      // Confirmar transacción
      await t.commit();

      return { usuario: nuevoUsuario, persona: nuevaPersona };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  static async actualizarUsuario(datosActualizados) {
    const { email } = datosActualizados;
    if (!email) {
      throw new Error("Falta agregar el email");
    }

    return await this.actualizarPersona(datosActualizados);
  }
}
