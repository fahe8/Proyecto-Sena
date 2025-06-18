import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import LogPopUp from "../Login/components/logPopUp";
import { usuarioServicio, reservaServicio } from "../../services/api";
import { useAuth } from "../../Provider/AuthProvider";

// Import components
import ProfileHeader from "./components/ProfileHeader";
import ProfileInfo from "./components/ProfileInfo";
import StatsSection from "./components/StatsSection";

const PerfilPage = () => {
  const {user} = useAuth();
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    imagen: "",
  });
  const [editando, setEditando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [textoPopUp, setTextoPopUp] = useState({ titulo: "", subtitulo: "" });
  const [reservas, setReservas] = useState([]);
  const [historialReservas, setHistorialReservas] = useState([]);
  const [errores, setErrores] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          console.log(user);
          setUsuario(user);
          
          // Obtener reservas activas
          const reservasResponse = await reservaServicio.obtenerReservasActivas(user.id);
          setReservas(reservasResponse.data);
          
          // Obtener historial de reservas
          const historialResponse = await reservaServicio.obtenerHistorialReservas(user.id);
          console.log('Perfil - historialResponse:', historialResponse);
          
          // Acceder correctamente a los datos del historial
          if (historialResponse && historialResponse.data && historialResponse.data.data) {
            setHistorialReservas(historialResponse.data.data);
            console.log('Usando historialResponse.data.data:', historialResponse.data.data);
          } else {
            // Si no hay datos, establecer un array vacío
            setHistorialReservas([]);
            console.log('No hay datos de historial, estableciendo array vacío');
          }
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
      await usuarioServicio.actualizar(usuario.id, usuario);
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
    <div className="min-h-screen w-full p-3 pl-15 sm:pl-5 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-5xl mx-auto ">
        {/* Header Section */}
        <ProfileHeader usuario={usuario} />
        
        {/* Main Content */}
        <ProfileInfo 
          usuario={usuario}
          editando={editando}
          handleChange={handleChange}
          errores={errores}
          toggleEdicion={toggleEdicion}
          validarInputs={validarInputs}
        />

        {/* Stats Section */}
        <StatsSection reservas={reservas} historialReservas={historialReservas} />
      </div>

      {mostrarModal && (
        <Modal
          titulo="¿Desea actualizar tu información?"
          subtitulo="Verifica que tus datos sean correctos antes de confirmar."
          cerrarModal={cerrarModal}
          funcionEjecutar={guardarCambios}
          tipo=""
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

export default PerfilPage;
