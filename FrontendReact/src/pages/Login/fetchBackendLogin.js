import axios from "axios";

const crearUsuarioConEmail = async (email) => {
  try {
    const usuarioCreado = await axios.post(
      "http://localhost:8001/api/usuarios/registrar",
      email
    );
    return usuarioCreado.data;
  } catch (error) {
    return error.message;
  }
};

const actualizarDatosUsuario = async (datosActualizar) => {
  const usuarioActualizado = await axios.put(
    "http://localhost:8001/api/usuarios/actualizar",
    datosActualizar
  );
  return usuarioActualizado.data;
};

export { crearUsuarioConEmail, actualizarDatosUsuario };
