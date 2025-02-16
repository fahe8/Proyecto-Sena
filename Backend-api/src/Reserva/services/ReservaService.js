import { ReservaRepository } from "../repository/ReservaRepository.js";

export class ReservaService {
  static async obtenerTodasReservas() {
    return await ReservaRepository.obtenerTodasReservas();
  }

  static async obtenerReservaPorId(id) {
    return await ReservaRepository.obtenerReservaPorId(id);
  }

  static async crearReserva(reservaData) {
    return await ReservaRepository.crearReserva(reservaData);
  }
}
