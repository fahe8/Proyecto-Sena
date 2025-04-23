import React, { useEffect, useState } from "react";
import lapizIcon from "../../assets/Perfil/lapiz.svg";
import camara from "../../assets/Perfil/camara.svg";
import Modal from "./modal";
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
  const [reservas, setReservas] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (user?.uid) {
        try {
          const [userResponse, reservasResponse] = await Promise.all([
            usuarioServicio.obtenerPorId(user.uid),
            // reservaServicio.obtenerPorUsuario(user.uid)
          ]);
          setUsuario(userResponse.data.data);
          // setReservas(reservasResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
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
    <div className="min-h-screen w-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-[#003044] rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#00c951] to-[#33ea30] flex items-center justify-center shadow-xl border-4 border-white">
                  <p className="text-6xl font-bold text-white">
                    {usuario.nombre ? usuario.nombre[0].toLocaleUpperCase() : ''}
                  </p>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 rounded-full transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer transform translate-y-1/4 translate-x-1/4 hover:bg-gray-100">
                    <img className="w-6 h-6" src={camara} alt="Cambiar foto" />
                  </div>
                </div>
              </div>
              <div className="text-white mt-4 md:mt-0">
                <h2 className="text-2xl font-bold">
                  {usuario.nombre && usuario.apellido ? `${usuario.nombre} ${usuario.apellido}` : 'Usuario'}
                </h2>
                <p className="text-gray-300">{usuario.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-[#003044]">Información Personal</h3>
            <button
              onClick={editando ? validarInputs : toggleEdicion}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                editando 
                ? 'bg-[#00c951] hover:bg-[#00a844]' 
                : 'bg-[#003044] hover:bg-[#004466]'
              } text-white shadow-md hover:shadow-lg`}
            >
              <span>{editando ? "Guardar Cambios" : "Editar Perfil"}</span>
              <img width={20} src={lapizIcon} alt="Editar" className="invert" />
            </button>
          </div>

          {!editando ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoField
                label="Nombre(s)"
                value={usuario.nombre}
                icon="👤"
                defaultText="No hay nombre registrado"
              />
              <InfoField
                label="Apellido(s)"
                value={usuario.apellido}
                icon="👤"
                defaultText="No hay apellido registrado"
              />
              <InfoField
                label="Correo electrónico"
                value={usuario.email}
                icon="📧"
                defaultText="No hay correo registrado"
              />
              <InfoField
                label="Teléfono"
                value={usuario.telefono}
                icon="📱"
                defaultText="No hay número registrado"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputField
                label="Nombre(s)"
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
                error={errores.nombre}
                editable={editando}
                icon="👤"
              />
              <InputField
                label="Apellido(s)"
                name="apellido"
                value={usuario.apellido}
                onChange={handleChange}
                error={errores.apellido}
                editable={editando}
                icon="👤"
              />
              <InputField
                label="Teléfono"
                name="telefono"
                value={usuario.telefono}
                onChange={handleChange}
                error={errores.telefono}
                editable={editando}
                icon="📱"
              />
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <StatCard 
            title="Reservas Totales" 
            value={reservas.length || '0'} 
            icon="⚽" 
          />
          <StatCard 
            title="Canchas Favoritas" 
            value={JSON.parse(localStorage.getItem('favoritos'))?.length || '0'} 
            icon="⭐" 
          />
          
        </div>
      </div>

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
    </div>
  );
};

const InfoField = ({ label, value, icon, defaultText }) => (
  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-[#00c951] transition-all duration-300">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-xl">{icon}</span>
      <label className="text-sm font-semibold text-gray-700">{label}</label>
    </div>
    <p className="text-gray-800 font-medium">
      {value || defaultText}
    </p>
  </div>
);

const InputField = ({ label, name, value, onChange, error, editable, icon }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl">{icon}</span>
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      </div>
      {editable ? (
        <>
          <input
            type={name === "email" ? "email" : "text"}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00c951] focus:border-transparent transition-all duration-300"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
      ) : (
        <p className="text-gray-800 font-medium">
          {value || "No hay información"}
        </p>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-bold text-[#003044] mt-1">{value}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </div>
);

export default PerfilPage;
