import { PropietarioService } from "./PropietarioService.js";

export class PropietarioController {
  static async obtenerTodosPropietario(req, res) {
    try {
      const propietarios = await PropietarioService.obtenerTodosPropietario();
      res.json({
        success: true,
        message: "Propietarios obtenidos correctamente",
        data: propietarios,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener propietarios",
      });
    }
  }

  static async registrarPropietario(req, res) {
    try {
      const nuevoPropietario = await PropietarioService.registrarPropietario(
        req.body
      );

      res.status(201).json({
        success: true,
        message: "Propietario registrado exitosamente",
        data: nuevoPropietario,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async actualizarPropietario(req, res) {
    try {
      const { id } = req.params;
      const { datosPersona, datosPropietario } = req.body;

      const propietarioActualizado =
        await PropietarioService.actualizarPropietario(
          id,
          datosPersona,
          datosPropietario
        );

      if (!propietarioActualizado) {
        return res.status(404).json({
          success: false,
          message: "Propietario no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        message: "Propietario actualizado correctamente",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
