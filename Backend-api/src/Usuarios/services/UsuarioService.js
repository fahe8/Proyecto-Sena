import sequelize from "../../config/db.js";
import { UsuarioRepository } from "../repository/UsuarioRepository.js";
import bcrypt from "bcrypt";

export class UsuarioService {
  static async obtenerTodosUsuarios() {
    return await UsuarioRepository.obtenerTodosUsuarios();
  }

  static async registrarUsuario(datos) {
    const { nombre, apellido, telefono, email, password } = datos;

    // Verificar si el email ya está registrado
    const personaExistente = await UsuarioRepository.buscarPersonaPorEmail(
      email
    );
    if (personaExistente) {
      throw new Error("El email ya está registrado.");
    }

    // Iniciar transacción
    const t = await sequelize.transaction();

    try {
      // Crear Persona
      const nuevaPersona = await UsuarioRepository.crearPersona(
        nombre,
        apellido,
        telefono,
        email,
        t
      );

      // Crear Usuario
      const nuevoUsuario = await UsuarioRepository.crearUsuario(
        nuevaPersona.id_persona,
        t
      );

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear Credencial
      await UsuarioRepository.crearCredencial(
        nuevaPersona.id_persona,
        hashedPassword,
        t
      );

      // Confirmar transacción
      await t.commit();

      return { usuario: nuevoUsuario, persona: nuevaPersona };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}
