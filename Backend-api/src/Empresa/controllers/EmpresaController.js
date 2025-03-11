import { EmpresaService } from "../services/EmpresaService.js";

export class EmpresaController {
  static async obtenerTodosEmpresa(req, res) {
    try {
      const empresas = await EmpresaService.obtenerTodosEmpresa();
      res.json({
        success: true,
        message: "Empresas obtenidas correctamente",
        data: empresas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener las empresas",
      });
    }
  }

  static async obtenerEmpresaPorId(req, res) {
    try {
      const { id } = req.params; // Cambio de req.body a req.params
      const empresa = await EmpresaService.obtenerEmpresaPorId(id);

      if (!empresa) {
        return res.status(404).json({
          success: false,
          message: "Empresa no encontrada",
        });
      }

      res.json({
        success: true,
        message: "Empresa obtenida correctamente",
        data: empresa,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener la empresa por ID",
      });
    }
  }

  static async crearEmpresa(req, res) {
    try {
      const empresaId = await EmpresaService.crearEmpresa(req.body);

      res.status(201).json({
        success: true,
        message: "Empresa creada exitosamente",
        data: { id: empresaId },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
