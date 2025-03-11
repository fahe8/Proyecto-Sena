import { TipoDocumento } from "../models/TipoDocumento";

export class TipoDocumentoRepository {
  static async obtenerTodosTipoDocumento() {
    TipoDocumento.findAll();
  }
}
