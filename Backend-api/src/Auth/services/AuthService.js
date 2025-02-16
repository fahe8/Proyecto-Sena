import { UsuarioRepository } from "../../Usuarios/repository/UsuarioRepository.js";
import jwt from "jsonwebtoken";
import jwtConfig from "../../config/jwtConfig.js";
import bcrypt from "bcrypt";

export class AuthService {
  static async iniciarSesion(loginData) {
    const { email, password } = loginData;

    const usuario = await UsuarioRepository.obtenerUsuarioPorEmail(email);
    bcrypt;
    const esContrasenaCorrecta = await bcrypt.compare(
      password,
      usuario.password
    );
    if (!esContrasenaCorrecta) {
      throw new Error("Contraseña Incorrecta");
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        rol: usuario.rol,
      },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.expiresIn,
      }
    );

    const infoEnviar = {
      usuario: usuario,
      token: token,
    };

    return infoEnviar;
  }

  static async rutaProtegida(req) {
    return req.usuario;
  }

  static async cerrarSesion(res) {
    res.clearCookie("access_token");
  }
}
