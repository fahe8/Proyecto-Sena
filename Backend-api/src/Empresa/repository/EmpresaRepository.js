import { Empresa } from "../../models/Empresa.js";

export class EmpresaRepository {
  static async obtenerTodosEmpresa() {
    return await Empresa.findAll(); // Equivalente a SELECT * FROM empresa
  }

  static async obtenerEmpresaPorId(id_empresa) {
    return await Empresa.findByPk(id_empresa); // Equivalente a SELECT * FROM empresa WHERE id_empresa = ?
  }

  static async crearEmpresa(empresa) {
    const nuevaEmpresa = await Empresa.create(empresa); // Crea una nueva empresa
    return nuevaEmpresa.id_empresa; // Retorna el ID de la empresa creada
  }
}
