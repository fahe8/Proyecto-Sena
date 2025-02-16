import { CanchaService } from "../services/CanchaService.js";

export class CanchaController {
  static async obtenerTodasCanchas(req, res) {
    try {
      const canchas = await CanchaService.obtenerTodasCanchas();
      res.json(canchas);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener canchas" });
    }
  }

  static async obtenerCanchaPorId(req, res) {
    try {
      const { id } = req.params;
      const cancha = await CanchaService.obtenerCanchaPorId(id);
      if (!cancha) {
        return res.status(404).json({ message: "Cancha no encontrada" });
      }
      res.json(cancha);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la cancha" });
    }
  }

  static async crearCancha(req, res) {
    try {
      const canchaId = await CanchaService.crearCancha(req.body);
      res.json({ id: canchaId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
