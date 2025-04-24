import React, { useEffect, useState } from "react";
import lapizIcon from "../../assets/Perfil/lapiz.svg";
import camara from "../../assets/Perfil/camara.svg";
import Modal from "./Modal";
import LogPopUp from "../Login/components/logPopUp";
import { usuarioServicio } from "../../services/api";
import { useAuth } from "../../Provider/AuthProvider";

const PerfilPage = () => {
  const {user} = useAuth();
  const [usuario, setUsuario] = useState({
    id_usuario: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });
  const [editando, setEditando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [textoPopUp, setTextoPopUp] = useState({ titulo: "", subtitulo: "" });

  useEffect(() => {
    const fetchUsuario = async () => {
      if (user?.uid) {
        try {
          const response = await usuarioServicio.obtenerPorId(user.uid);
          console.log(response.data)
          setUsuario(response.data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUsuario();
  }, [user]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const toggleEdicion = () => {
    setEditando(!editando);
  };



  const validarInputs = () => {
    if (validate()) {
      setMostrarModal(true);
    }
  };

  const guardarCambios = async () => {
try {
  await usuarioServicio.actualizar(usuario.id_usuario, usuario);
  setEditando(false);
  setMostrarModal(false);
  setTextoPopUp({
    titulo: "Cambio exitoso",
    subtitulo: "Sus cambios se han realizado con exito",
  });
  setMostrarPopUp(true);
  setMostrarModal(false);
  setEditando(false);
} catch (error) {
  console.log(error.response.data);
  setTextoPopUp({
    titulo: "Error al actualizar",
    subtitulo: "Ha ocurrido un error al actualizar tus datos",
  });
}
  };
  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const [errores, setErrores] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!usuario.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!usuario.apellido) newErrors.apellido = "El apellido es obligatorio";
    if(!usuario.telefono) newErrors.telefono = "El teléfono es obligatorio";
    if (usuario.telefono && !/^\d{10}$/.test(usuario.telefono))
      newErrors.telefono = "El teléfono debe tener 10 dígitos";
    setErrores(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  return (
    <div className="w-full h-screen container mx-auto">
      <div className="flex flex-col items-center w-full h-screen">
        <h1 className="my-8">MI INFORMACIÓN PERSONAL</h1>
        <hr className="w-full p-4" />
        {mostrarModal && (
          <Modal
            titulo="¿Desea actualizar tu información?"
            subtitulo="Verifica que tus datos sean correctos antes de confirmar."
            cerrarModal={cerrarModal}
            funcionEjecutar={guardarCambios}
          />
        )}

        {mostrarPopUp && (
          <LogPopUp
            setShowPopUp={setMostrarPopUp}
            message={textoPopUp.titulo}
            subText={textoPopUp.subtitulo}
            onClose={() => {}}
          />
        )}

        <div className="relative overflow-hidden w-28 h-28 flex items-center justify-center bg-purple-300 rounded-full group">
          <p className="text-7xl"> {usuario.nombre ? usuario.nombre[0].toLocaleUpperCase() : ''}</p>
          <div className="absolute bottom-0 translate-y-[80%] transition-all duration-300 group-hover:translate-y-[50%] flex justify-center bg-black opacity-40 w-28 h-1/2 rounded-b-full"></div>
          <img
            className="size-6 absolute bottom-0 translate-y-[50%] transition-all duration-300 group-hover:translate-y-[0%] "
            src={camara}
            alt=""
            width={30}
          />
        </div>
        {/* Datos personales */}
        <div className="border-2 border-black w-auto h-auto md:w-[600px] lg:w-[800px] rounded-2xl relative py-6 px-4 mt-8">
          {/* Boton de editar */}
          <button
            onClick={editando ? validarInputs : toggleEdicion}
            className="absolute bg-[#003044] cursor-pointer text-white p-2 rounded-tr-2xl rounded-bl-2xl top-0 right-0 translate-x-[1.5px] -translate-y-[1.5px] flex"
          >
            <span>{editando ? "Guardar" : "Editar"}</span>
            <img width={28} src={lapizIcon} alt="Icono de editar" />
          </button>
          {/* Modal */}
          {!editando ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold">Nombre(s)</label>
                <p className="w-full p-2 bg-gray-300 rounded-full px-4">
                  {usuario.nombre === "" ? "No hay nombre registrado" : usuario.nombre}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold">Apellido(s)</label>
                <p className="w-full p-2 bg-gray-300 rounded-full px-4">
                  {usuario.apellido === "" ? "No hay apellido registrado": usuario.apellido}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold">
                  Correo electrónico
                </label>
                <p className="w-full p-2 bg-gray-300 rounded-full px-4">
                  {usuario.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold">Teléfono</label>
                <p className="w-full p-2 bg-gray-300 rounded-full px-4">
                  {usuario.telefono === "" ? "No hay número" : usuario.telefono}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <InputField
                label="Nombre(s)"
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
                error={errores.nombre}
                editable={editando}
              />
              <InputField
                label="Apellido(s)"
                name="apellido"
                value={usuario.apellido}
                onChange={handleChange}
                error={errores.apellido}
                editable={editando}
              />
              
              <InputField
                label="Teléfono"
                name="telefono"
                value={usuario.telefono}
                onChange={handleChange}
                error={errores.telefono}
                editable={editando}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, error, editable }) => {
  return (
    <div className="">
      <label className="text-sm font-semibold">{label}</label>
      {editable ? (
        <>
          <input
            type={name === "email" ? "email" : "text"}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 border rounded-2xl"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </>
      ) : (
        <p className="w-full p-2 bg-gray-100 rounded-2xl">
          {value || "No hay información"}
        </p>
      )}
    </div>
  );
};

export default PerfilPage;
