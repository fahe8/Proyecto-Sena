import React, { useEffect, useState } from "react";
import Modal from "../Perfil/Modal";
import LogPopUp from "../Login/components/logPopUp";
import { empresaServicio, propietarioServicio, canchasServicio } from "../../services/api";
import { useAuth } from "../../Provider/AuthProvider";
import Loading from "../Login/components/Loading";

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
  
  // Estados separados para edición
  const [editandoEmpresa, setEditandoEmpresa] = useState(false);
  const [editandoPropietario, setEditandoPropietario] = useState(false);
  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [textoPopUp, setTextoPopUp] = useState({ titulo: "", subtitulo: "" });
  const [canchas, setCanchas] = useState([]);
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);
  const [tipoGuardado, setTipoGuardado] = useState(''); // 'empresa' o 'propietario'
  
  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          setLoading(true);
          // Asumimos que el NIT está almacenado en el usuario o en algún lugar accesible
          const NIT = user?.NIT; // Este valor debería venir de algún lugar
          const [empresaResponse, canchasResponse] = await Promise.all([
            // propietarioServicio.obtenerPorEmpresa(NIT),
            empresaServicio.obtenerPorId(NIT),
            canchasServicio.obtenerTodosEmpresa(NIT)
          ]);
          
          setPropietario(user);

          if (empresaResponse.data.success && empresaResponse.data.data) {
            console.log('first',empresaResponse.data.data)
            setEmpresa(empresaResponse.data.data);
          }
          
          if (canchasResponse.data.success && canchasResponse.data.data) {
          
            setCanchas(canchasResponse.data.data);
          }
        } catch (error) {
          console.error("Error al cargar los datos:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  const handleChangePropietario = (e) => {
    setPropietario({ ...propietario, [e.target.name]: e.target.value });
  };

  const handleChangeEmpresa = (e) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  // Funciones separadas para toggle de edición
  const toggleEdicionEmpresa = () => {
    setEditandoEmpresa(!editandoEmpresa);
  };

  const toggleEdicionPropietario = () => {
    setEditandoPropietario(!editandoPropietario);
  };

  // Funciones separadas para validación
  const validarInputsEmpresa = () => {
    if (validateEmpresa()) {
      setTipoGuardado('empresa');
      setMostrarModal(true);
    }
  };

  const validarInputsPropietario = () => {
    if (validatePropietario()) {
      setTipoGuardado('propietario');
      setMostrarModal(true);
    }
  };

  const guardarCambios = async () => {
    try {
      if (tipoGuardado === 'empresa') {
        // Actualizar datos de la empresa
        await empresaServicio.actualizar(empresa.NIT, empresa);
        setEditandoEmpresa(false);
        setTextoPopUp({
          titulo: "Empresa actualizada",
          subtitulo: "La información de la empresa ha sido actualizada exitosamente",
        });
      } else if (tipoGuardado === 'propietario') {
        // Actualizar datos del propietario
        await propietarioServicio.actualizar(propietario.id_propietario, propietario);
        setEditandoPropietario(false);
        setTextoPopUp({
          titulo: "Propietario actualizado",
          subtitulo: "La información del propietario ha sido actualizada exitosamente",
        });
      }
      
      setMostrarModal(false);
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

  // Validación separada para empresa
  const validateEmpresa = () => {
    const newErrors = {};
    
    if (!empresa.nombre) newErrors.nombreEmpresa = "El nombre de la empresa es obligatorio";
    if (!empresa.direccion) newErrors.direccionEmpresa = "La dirección es obligatoria"; 
    setErrores(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Validación separada para propietario
  const validatePropietario = () => {
    const newErrors = {};
    
    if (!propietario.nombre) newErrors.nombrePropietario = "El nombre es obligatorio";
    if (!propietario.apellido) newErrors.apellidoPropietario = "El apellido es obligatorio";
    if (!propietario.telefono) newErrors.telefonoPropietario = "El teléfono es obligatorio";
    if (propietario.telefono && !/^\d{10}$/.test(propietario.telefono))
      newErrors.telefonoPropietario = "El teléfono debe tener 10 dígitos";
    
    setErrores(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  if (loading) {
    return <Loading/>;
  }

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
          editandoEmpresa={editandoEmpresa}
          editandoPropietario={editandoPropietario}
          handleChangePropietario={handleChangePropietario}
          handleChangeEmpresa={handleChangeEmpresa}
          errores={errores}
          toggleEdicionEmpresa={toggleEdicionEmpresa}
          toggleEdicionPropietario={toggleEdicionPropietario}
          validarInputsEmpresa={validarInputsEmpresa}
          validarInputsPropietario={validarInputsPropietario}
        />

        {/* Stats Section */}
        <AdminStatsSection canchas={canchas} />
      </div>

      {mostrarModal && (
        <Modal
          titulo={`¿Desea actualizar la información ${tipoGuardado === 'empresa' ? 'de la empresa' : 'del propietario'}?`}
          subtitulo="Verifica que los datos sean correctos antes de confirmar."
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

export default PerfilAdministrador;