// import axios from "axios"; // Importamos la librería Axios para realizar solicitudes HTTP (Protocolo de transferencia de datos)

// // Función asincrónica para crear un usuario con email
// const crearUsuarioEnBackend = async (datos) => {
//   try {
//     // Realizamos una solicitud POST a la API para registrar un usuario con los datos proporcionados
//     const usuarioCreado = await axios.post(
//       "http://localhost:8001/api/usuarios/registrar", // URL del endpoint de la API
//       datos // Datos del usuario que se enviarán en la solicitud
//     );
//     return usuarioCreado.data; // Retornamos la respuesta de la API (datos del usuario creado)
//   } catch (error) {
//     return error.message; // En caso de error, retornamos el mensaje de error
//   }
// };

// // Función asincrónica para actualizar los datos de un usuario
// const actualizarDatosUsuario = async (datosActualizar) => {
//   // Realizamos una solicitud PUT a la API para actualizar los datos del usuario
//   const usuarioActualizado = await axios.put(
//     "http://localhost:8001/api/usuarios/actualizar", // URL del endpoint de actualización
//     datosActualizar // Datos actualizados que se enviarán en la solicitud
//   );
//   return usuarioActualizado.data; // Retornamos la respuesta de la API (datos del usuario actualizado)
// };

// // Exportamos las funciones para que puedan ser utilizadas en otros archivos
// export { crearUsuarioEnBackend, actualizarDatosUsuario };