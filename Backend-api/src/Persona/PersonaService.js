import { PersonaRepository } from "./PersonaRepository.js";

export class PersonaService {
  static async crearPersona(datos, t) {
    const { email } = datos;
    const personaExistente = await PersonaRepository.buscarPersonaPorEmail(
      email
    );
    if (personaExistente) {
      throw new Error("El email ya está registrado.");
    }

    const nuevosDatos = {
      email: email || "",
      nombre: datos.nombre || "",
      apellido: datos.apellido || "",
      telefono: datos.telefono || "",
    };
    return await PersonaRepository.crearPersona(nuevosDatos, t);
  }

  static async buscarPersonaPorEmail(email) {
    return await PersonaRepository.buscarPersonaPorEmail(email);
  }
  static async actualizarPersona(datosActualizados) {
    const { email } = datosActualizados;
    const persona = await PersonaRepository.buscarPersonaPorEmail(email);
    if (!persona) {
      throw new Error("No se encontró una persona con ese email");
    }
    return await PersonaRepository.actualizarPersona(
      persona.id_persona,
      datosActualizados
    );
  }
}
