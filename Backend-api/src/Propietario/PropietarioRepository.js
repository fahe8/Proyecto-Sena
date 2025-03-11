import { Credencial } from "../models/Credencial.js";
import { Propietario } from "../models/Propietario.js";

export class PropietarioRepository {
  static async crearPropietario(
    id_persona,
    id_tipoDocumento,
    num_documento,
    transaction
  ) {
    return await Propietario.create(
      {
        id_persona,
        id_tipoDocumento,
        num_documento,
      },
      { transaction }
    );
  }

  static async obtenerPropietarioPorIdPersona(id_persona) {
    return await Propietario.findOne({
      where: { id_persona },
    });
  }

  static async crearCredencial(id_persona, transaction) {
    return await Credencial.create({ id_persona }, { transaction });
  }

  static async actualizarPropietario(id_persona, datosActualizados) {
    return await Propietario.update(datosActualizados, {
      where: { id_persona },
    });
  }
}
