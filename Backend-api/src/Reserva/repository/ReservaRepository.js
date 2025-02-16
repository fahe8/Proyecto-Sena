import { Reserva } from "../../models/Reserva.js";

export class ReservaRepository {
  static async obtenerTodasReservas() {
    return await Reserva.findAll(); // Equivalente a SELECT * FROM reserva con relaciones
  }

  static async obtenerReservaPorId(id_reserva) {
    return await Reserva.findByPk(id_reserva);
  }

  static async crearReserva(reserva) {
    const nuevaReserva = await Reserva.create(reserva);
    return nuevaReserva.id_reserva; // Retorna el ID de la reserva creada
  }
}
