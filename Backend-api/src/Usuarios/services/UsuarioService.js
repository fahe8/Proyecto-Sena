import { UsuarioRepository } from "../repository/UsuarioRepository.js";
import bcrypt from "bcrypt";
export class UsuarioService {
  static async obtenerTodosUsuarios() {
    return await UsuarioRepository.obtenerTodosUsuarios();
  }

  static async obtenerUsuarioPorId(id) {
    return await UsuarioRepository.obtenerUsuarioPorId(id);
  }

  static async eliminarUsuario(id_usuario) {
    const usuarioEliminado = await UsuarioRepository.eliminarUsuario(
      id_usuario
    );
    console.log(usuarioEliminado);
    return usuarioEliminado;
  }
}
