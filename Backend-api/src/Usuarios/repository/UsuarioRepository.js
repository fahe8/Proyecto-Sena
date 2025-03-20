import { Usuario } from "../../models/Usuario.js";
import { Credencial } from "../../models/Credencial.js";
import { pool } from "../../config/db.js";
export class UsuarioRepository {
  static async obtenerTodosUsuarios() {
    const query = `
      SELECT 
        u.id_usuario AS usuario_id,
        p.id_persona,
        p.nombre AS nombre,
        p.apellido AS apellido,
        p.telefono AS telefono,
        p.email AS email
      FROM Usuarios u
      JOIN Personas  p ON u.id_persona = p.id_persona;
    `;

    const [rows] = await pool.execute(query);
    return rows;
  }

  static async obtenerUsuarioPorId(id_usuario) { //Equivalente a SELECT  * FROM usuario where id = ?
    return await Usuario.findByPk(id_usuario);
  }

  static async crearUsuario(id_persona) { //Equivalente a INSERT INTO usuario VALUES(id_persona)
    console.log(id_persona);
    return await Usuario.create({ id_persona });  
  }

  static async crearCredencial(id_persona) {  //Equivalente a INSERT INTO credencial VALUES(id_persona)
    return await Credencial.create({ id_persona });
  }
}
