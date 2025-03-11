import { UsuarioService } from "../services/UsuarioService.js";

export class UsuarioController {
  static async obtenerTodosUsuarios(req, res) {
    try {
      const usuarios = await UsuarioService.obtenerTodosUsuarios();
      res.json({
        success: true,
        message: "Usuarios obtenidos correctamente",
        data: usuarios,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error al obtener usuarios" });
    }
  }

  static async registrar(req, res) {
    try {
      const nuevoUsuario = await UsuarioService.registrarUsuario(req.body);
      res.status(201).json({
        success: true,
        message: "Usuario registrado",
        data: nuevoUsuario,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async actualizarUsuario(req, res) {
    try {
      const { id } = req.params;
      const { datosPersona } = req.body;
      await UsuarioService.actualizarUsuario(id, datosPersona);
      res.status(200).json({
        success: true,
        message: "Usuario actualizado",
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
