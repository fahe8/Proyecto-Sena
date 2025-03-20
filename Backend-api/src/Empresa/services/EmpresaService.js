import { where } from "sequelize";
import { EmpresaRepository } from "../repository/EmpresaRepository.js";

export class EmpresaService {
  static async obtenerTodosEmpresa() {
    return await EmpresaRepository.obtenerTodosEmpresa();
  }

  static async obtenerEmpresaPorId(id) {
    return await EmpresaRepository.obtenerEmpresaPorId(id);
  }

  static async crearEmpresa(empresa) {
    this.validarDatosEmpresa(empresa);

    return await EmpresaRepository.crearEmpresa(empresa);
  }

  static async actualizarEmpresa(empresa) {
    this.validarDatosEmpresa(empresa);
    
    return await EmpresaRepository.actualizarEmpresa(empresa.NIT,empresa);
  }

  static validarDatosEmpresa(empresa) {
    const camposObligatorios = [
      "nombre",
      "direccion",
      "descripcion",
      "NIT",
      "hora_apertura",
      "hora_cierre",
      "id_propietario",
      "id_estado_empresa",
    ];
    for (const campo of camposObligatorios) {
      if (!empresa[campo]) {
        throw new Error(`El campo ${campo} es obligatorio`);
      }
    }

    // Validar longitud de cadenas de texto
    if (empresa.nombre.length < 3 || empresa.nombre.length > 100) {
      throw new Error("El nombre debe tener entre 3 y 100 caracteres.");
    }

    if (empresa.direccion.length < 5 || empresa.direccion.length > 255) {
      throw new Error("La dirección debe tener entre 5 y 255 caracteres.");
    }

    if (empresa.descripcion && empresa.descripcion.length > 500) {
      throw new Error("La descripción no puede superar los 500 caracteres.");
    }

    // Validar NIT (debe ser un número entre 8 y 10 dígitos)
    if (!/^\d{8,10}$/.test(empresa.NIT)) {
      throw new Error("El NIT debe ser un número de 8 a 10 dígitos.");
    }

    // Validar formato de hora (HH:mm:ss)
    const horaRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!horaRegex.test(empresa.hora_apertura)) {
      throw new Error("La hora de apertura debe estar en formato HH:mm:ss.");
    }

    if (!horaRegex.test(empresa.hora_cierre)) {
      throw new Error("La hora de cierre debe estar en formato HH:mm:ss.");
    }
  }
}
