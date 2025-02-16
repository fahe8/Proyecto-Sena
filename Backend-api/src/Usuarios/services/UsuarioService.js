import { UsuarioRepository } from "../repository/UsuarioRepository.js";
import bcrypt from "bcrypt";
export class UsuarioService {
  static async obtenerTodosUsuarios() {
    return await UsuarioRepository.obtenerTodosUsuarios();
  }

  static async obtenerUsuarioPorId(id) {
    return await UsuarioRepository.obtenerUsuarioPorId(id);
  }

  static async crearUsuario(usuarioData) {
    const { nombre, email, telefono, password, rol } = usuarioData;
    const passwordEncriptada = await bcrypt.hash(password, 10);

    return await UsuarioRepository.crearUsuario(
      nombre,
      email,
      telefono,
      passwordEncriptada,
      rol
    );
  }
}
