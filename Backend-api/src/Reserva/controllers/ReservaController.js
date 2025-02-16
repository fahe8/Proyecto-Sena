import { ReservaService } from "../services/ReservaService.js";

export class ReservaController {
  static async obtenerTodasReservas(req, res) {
    try {
      const reservas = await ReservaService.obtenerTodasReservas();
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener reservas" });
    }
  }

  static async obtenerReservaPorId(req, res) {
    try {
      const { id } = req.params;
      const reserva = await ReservaService.obtenerReservaPorId(id);
      if (!reserva) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la reserva" });
    }
  }

  static async crearReserva(req, res) {
    try {
      const reservaId = await ReservaService.crearReserva(req.body);
      res.json({ id: reservaId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
