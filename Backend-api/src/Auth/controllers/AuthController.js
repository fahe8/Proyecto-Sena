import { AuthService } from "../services/AuthService.js";

export class AuthController {
  static async iniciarSesion(req, res) {
    try {
      const usuario = await AuthService.iniciarSesion(req.body);

      res
        .cookie("access_token", usuario.token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        })
        .status(201)
        .json({ message: "Inicio de sesion exitoso", data: usuario.token });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async rutaProtegida(req, res) {
    try {
      const usuario = await AuthService.rutaProtegida(req);
      if (!usuario) {
        return res.status(401).json({ message: "No autorizado" });
      }
      res.json({ message: "Acceso concedido", usuario });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async cerrarSesion(req, res) {
    try {
      await AuthService.cerrarSesion(res);
      res.json({ message: "Sesión cerrada" });
    } catch (error) {}
  }
}
