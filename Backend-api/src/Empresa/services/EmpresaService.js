import { EmpresaRepository } from "../repository/EmpresaRepository.js";

export class EmpresaService {
  static async obtenerTodosEmpresa() {
    return await EmpresaRepository.obtenerTodosEmpresa();
  }

  static async obtenerEmpresaPorId(id) {
    return await EmpresaRepository.obtenerEmpresaPorId(id);
  }

  static async crearEmpresa(empresa) {
    return await EmpresaRepository.crearEmpresa(empresa);
  }
}
