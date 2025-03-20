import { Credencial } from "../models/Credencial.js";
import { Propietario } from "../models/Propietario.js";

export class PropietarioRepository {
  static async crearPropietario(
    nombre,
    apellido,
    telefono,
    email,
    id_tipoDocumento,
    num_documento
  ) {
    return await Propietario.create({
      nombre,
      apellido,
      telefono,
      email,
      id_tipoDocumento,
      num_documento,
    });
  }

  static async obtenerPropietarioPorIdPersona(id_persona) {
    return await Propietario.findOne({
      where: { id_persona },
    });
  }

  static async crearCredencial(id_persona, transaction) {
    return await Credencial.create({ id_persona }, { transaction });
  }

  static async actualizarPropietario(id_propietario, datosActualizados) {
    return await Propietario.update(datosActualizados, {
      where: { id_propietario },
    });
  }
}
