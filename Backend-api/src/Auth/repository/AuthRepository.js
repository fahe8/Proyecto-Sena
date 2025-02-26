import { Credencial } from "../../models/Credencial.js";
import { Persona } from "../../models/Persona.js";
import { Usuario } from "../../models/Usuario.js";

export class AuthRepository {
  static async crearPersona(nombre, apellido, telefono, email, transaction) {
    return await Persona.create(
      { nombre, apellido, telefono, email },
      { transaction }
    );
  }

  static async crearUsuario(id_persona, transaction) {
    console.log(id_persona);
    return await Usuario.create({ id_persona }, { transaction });
  }

  static async crearCredencial(id_persona, contrasena, transaction) {
    return await Credencial.create({ id_persona, contrasena }, { transaction });
  }

  static async buscarPersonaPorEmail(email) {
    return await Persona.findOne({ where: { email } });
  }
}
