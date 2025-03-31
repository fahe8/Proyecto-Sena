import sequelize from "../../config/db.js";
import { PersonaService } from "../../Persona/PersonaService.js";
import { UsuarioRepository } from "../repository/UsuarioRepository.js";

export class UsuarioService extends PersonaService {
  static async obtenerTodosUsuarios() {
    return await UsuarioRepository.obtenerTodosUsuarios();
  }

  static async registrarUsuario(datos) {

      //Buscar y crear Persona
      const nuevaPersona = await this.crearPersona(datos);
      // Crear Usuario
      const nuevoUsuario = await UsuarioRepository.crearUsuario(
        nuevaPersona.id_persona,
  
      );

      // Crear Credencial
      await UsuarioRepository.crearCredencial(nuevaPersona.id_persona);



      return { usuario: nuevoUsuario, persona: nuevaPersona };

  }

  static async actualizarUsuario(id_persona,datosPersona) {
    if (!id_persona) {
      throw new Error("Falta agregar el id persona");
    }

    return await this.actualizarPersona(id_persona,datosPersona);
  }
}
