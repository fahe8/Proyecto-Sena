import { Persona } from "../models/Persona.js";

export class PersonaRepository {
  static async crearPersona(datos, transaction) {  
    console.log(datos);
    return await Persona.create(datos, { transaction });  //Equivalente a INSERT INTO persona VALUES(datos de la perosna)
  }

  static async buscarPersonaPorEmail(email) {
    return await Persona.findOne({ where: { email } }); //Equivalente a SELECT * FROM persona WHERE email = ?
  }

  static async buscarPersonaPorId(id_persona) {
    return await Persona.findByPk(id_persona)  //Equivalente a SELECT * FROM persona WHERE id_persona = ?
  }

  static async actualizarPersona(id_persona, datosActualizados) {
    return await Persona.update(datosActualizados, { where: { id_persona } }); //Equivalente a UPDATE persona SET ?  WHERE id_persona = ?
  }
}
