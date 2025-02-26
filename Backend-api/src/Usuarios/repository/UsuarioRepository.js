import { Persona } from "../../models/Persona.js";
import { Usuario } from "../../models/Usuario.js";

export class UsuarioRepository {
  static async obtenerTodosUsuarios() {
    return await Usuario.findAll({
      attributes: ["id_usuario"],
      include: {
        model: Persona,
        attributes: [
          "nombre",
          "apellido",
          "telefono",
          "email",
          "id_tipoDocumento",
          "num_documento",
        ],
      },
    });
  }

  static async obtenerUsuarioPorId(id_usuario) {
    return await Usuario.findByPk(id_usuario);
  }

  static async crearUsuario(nombre, email, telefono, password, rol) {
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      telefono,
      password,
      rol,
    });
    return nuevoUsuario.id_usuario;
  }

  static async obtenerUsuarioPorEmail(email) {
    return await Usuario.findOne({ where: { email } });
  }

  static async eliminarUsuario(id_usuario) {
    return await Usuario.destroy({ where: id_usuario });
  }
}
