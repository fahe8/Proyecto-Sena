import { PersonaRepository } from "./PersonaRepository.js";

export class PersonaService {
  static async crearPersona(datos) {
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
    return await PersonaRepository.crearPersona(nuevosDatos);
  }

  static async buscarPersonaPorEmail(email) {
    return await PersonaRepository.buscarPersonaPorEmail(email);
  }

  static async actualizarPersona(id_persona,datosActualizados) {
    const persona = await PersonaRepository.buscarPersonaPorId(
     id_persona
    );

    if (!persona) {
      throw new Error("No se encontró una persona con esa Id");
    }
    return await PersonaRepository.actualizarPersona(
      id_persona,
      datosActualizados
    );
  }
}
