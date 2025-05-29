import React, { useEffect, useState } from "react";
import Modal from "../Perfil/Modal";
import LogPopUp from "../Login/components/logPopUp";
import { empresaServicio, propietarioServicio, canchasServicio } from "../../services/api";
import { useAuth } from "../../Provider/AuthProvider";

// Import components
import AdminProfileHeader from "./Componentes/AdminProfileHeader";
import AdminProfileInfo from "./Componentes/AdminProfileInfo";
import AdminStatsSection from "./Componentes/AdminStatsSection";

const PerfilAdministrador = () => {
  const {user} = useAuth();
  const [propietario, setPropietario] = useState({
    id_propietario: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    num_documento: "",
    bloqueado: false,
    id_tipoDocumento: ""
  });
  const [empresa, setEmpresa] = useState({
    NIT: "",
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    logo: ""
  });
  const [editando, setEditando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [textoPopUp, setTextoPopUp] = useState({ titulo: "", subtitulo: "" });
  const [canchas, setCanchas] = useState([]);
  const [errores, setErrores] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      if (user?.uid) {
        try {
          // Asumimos que el NIT está almacenado en el usuario o en algún lugar accesible
          const NIT = '987654321'; // Este valor debería venir de algún lugar
          
          const [propietarioResponse, empresaResponse, canchasResponse] = await Promise.all([
            propietarioServicio.obtenerPorEmpresa(NIT),
            empresaServicio.obtenerPorId(NIT),
            canchasServicio.obtenerTodosEmpresa(NIT)
          ]);
          
          if (propietarioResponse.data.success) {
            setPropietario(propietarioResponse.data.data);
          }
          
          if (empresaResponse.data.success && empresaResponse.data.data) {
            setEmpresa(empresaResponse.data.data);
          }
          
          if (canchasResponse.data.data) {
            setCanchas(canchasResponse.data.data);
          }
        } catch (error) {
          console.error("Error al cargar los datos:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleChangePropietario = (e) => {
    setPropietario({ ...propietario, [e.target.name]: e.target.value });
  };

  const handleChangeEmpresa = (e) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
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
      // Actualizar datos del propietario
      await propietarioServicio.actualizar(propietario.id_propietario, propietario);
      
      // Actualizar datos de la empresa
      await empresaServicio.actualizar(empresa.NIT, empresa);
      
      setEditando(false);
      setMostrarModal(false);
      setTextoPopUp({
        titulo: "Cambios guardados",
        subtitulo: "La información ha sido actualizada exitosamente",
      });
      setMostrarPopUp(true);
    } catch (error) {
      console.error("Error al actualizar:", error);
      setTextoPopUp({
        titulo: "Error al actualizar",
        subtitulo: "Ha ocurrido un error al actualizar la información",
      });
      setMostrarPopUp(true);
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const validate = () => {
    const newErrors = {};
    
    // Validar propietario
    if (!propietario.nombre) newErrors.nombrePropietario = "El nombre es obligatorio";
    if (!propietario.apellido) newErrors.apellidoPropietario = "El apellido es obligatorio";
    if (!propietario.telefono) newErrors.telefonoPropietario = "El teléfono es obligatorio";
    if (propietario.telefono && !/^\d{10}$/.test(propietario.telefono))
      newErrors.telefonoPropietario = "El teléfono debe tener 10 dígitos";
    
    // Validar empresa
    if (!empresa.nombre) newErrors.nombreEmpresa = "El nombre de la empresa es obligatorio";
    if (!empresa.direccion) newErrors.direccionEmpresa = "La dirección es obligatoria";
    if (!empresa.telefono) newErrors.telefonoEmpresa = "El teléfono es obligatorio";
    if (empresa.telefono && !/^\d{10}$/.test(empresa.telefono))
      newErrors.telefonoEmpresa = "El teléfono debe tener 10 dígitos";
    
    setErrores(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header Section */}
        <AdminProfileHeader 
          propietario={propietario} 
          empresa={empresa} 
        />

        {/* Main Content */}
        <AdminProfileInfo 
          propietario={propietario}
          empresa={empresa}
          editando={editando}
          handleChangePropietario={handleChangePropietario}
          handleChangeEmpresa={handleChangeEmpresa}
          errores={errores}
          toggleEdicion={toggleEdicion}
          validarInputs={validarInputs}
        />

        {/* Stats Section */}
        <AdminStatsSection canchas={canchas} />
      </div>

      {mostrarModal && (
        <Modal
          titulo="¿Desea actualizar la información?"
          subtitulo="Verifica que los datos sean correctos antes de confirmar."
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

export default PerfilAdministrador;