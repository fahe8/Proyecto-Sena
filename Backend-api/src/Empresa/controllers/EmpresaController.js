import { EmpresaService } from "../services/EmpresaService.js";

export class EmpresaController {
  static async obtenerTodosEmpresa(req, res) {
    try {
      const empresas = await EmpresaService.obtenerTodosEmpresa();
      res.json(empresas);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las empresas" });
    }
  }
  static async obtenerEmpresaPorId(req, res) {
    try {
      const { id } = req.body;
      const empresa = await EmpresaService.obtenerEmpresaPorId(id);
      res.json(empresa);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el empresa por id" });
    }
  }

  static async crearEmpresa(req, res) {
    try {
      const empresaId = await EmpresaService.crearEmpresa(req.body);
      res.json(empresaId);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
