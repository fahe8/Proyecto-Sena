import { Persona } from "../models/Persona.js";

export class PersonaRepository {
  static async crearPersona(datos, transaction) {
    console.log(datos);
    return await Persona.create(datos, { transaction });
  }

  static async buscarPersonaPorEmail(email) {
    return await Persona.findOne({ where: { email } });
  }

  static async buscarPersonaPorId(id_persona) {
    return await Persona.findByPk(id_persona)
  }

  static async actualizarPersona(id_persona, datosActualizados) {
    return await Persona.update(datosActualizados, { where: { id_persona } });
  }
}
