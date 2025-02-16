import { CanchaRepository } from "../repository/CanchaRepository.js";

export class CanchaService {
  static async obtenerTodasCanchas() {
    return await CanchaRepository.obtenerTodasCanchas();
  }

  static async obtenerCanchaPorId(id) {
    return await CanchaRepository.obtenerCanchaPorId(id);
  }

  static async crearCancha(canchaData) {
    return await CanchaRepository.crearCancha(canchaData);
  }
}
