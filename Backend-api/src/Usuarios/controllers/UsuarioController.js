import { UsuarioService } from "../services/UsuarioService.js";

export class UsuarioController {
  static async obtenerTodosUsuarios(req, res) {
    try {
      const usuarios = await UsuarioService.obtenerTodosUsuarios();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios" });
    }
  }

  static async registrar(req, res) {
    try {
      const nuevoUsuario = await UsuarioService.registrarUsuario(req.body);
      res
        .status(201)
        .json({ message: "Usuario registrado", usuario: nuevoUsuario });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
