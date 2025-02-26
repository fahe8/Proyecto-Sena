import { AuthService } from "../services/AuthService.js";

export class AuthController {
  static async registrar(req, res) {
    try {
      const nuevoUsuario = await AuthService.registrarUsuario(req.body);
      res
        .status(201)
        .json({ message: "Usuario registrado", usuario: nuevoUsuario });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
