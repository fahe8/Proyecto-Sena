import { Cancha } from "../../models/Cancha.js";

export class CanchaRepository {
  static async obtenerTodasCanchas() {
    return await Cancha.findAll(); // Equivalente a SELECT * FROM cancha
  }

  static async obtenerCanchaPorId(id_cancha) {
    return await Cancha.findByPk(id_cancha); // Equivalente a SELECT * FROM cancha WHERE id_cancha = ?
  }

  static async crearCancha(cancha) {
    const nuevaCancha = await Cancha.create(cancha); // Crea una nueva cancha
    return nuevaCancha.id_cancha; // Retorna el ID de la cancha creada
  }
}
