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
  
// Modificar el useEffect donde se cargan los datos
useEffect(() => {
  const fetchData = async () => {
    if (!user?.NIT) return;

    const NIT = user?.NIT; 
    try {
      setLoading(true);
      // Asumimos que el NIT está almacenado en el usuario o en algún lugar accesible
      
      const [empresaResponse, canchasResponse] = await Promise.all([
        empresaServicio.obtenerPorId(NIT),
        canchasServicio.obtenerTodosEmpresa(NIT)
      ]);
      
      // Asegurarse de que el ID del propietario esté correctamente asignado
      const propietarioData = {...user};
      
      // Asignar tanto id como id_propietario para compatibilidad
      if (user.id) {
        propietarioData.id = user.id;
        propietarioData.id_propietario = user.id;
      }
      
      setPropietario(propietarioData);

      if (empresaResponse.data.success && empresaResponse.data.data) {
        setEmpresa(Array.isArray(empresaResponse.data.data) ? 
          empresaResponse.data.data[0] : 
          empresaResponse.data.data
        );
      }
      
      if (canchasResponse.data.success && canchasResponse.data.data) {
        setCanchas(canchasResponse.data.data);
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [user?.NIT]);


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
        // Verificar que NIT existe antes de actualizar
        if (!empresa.NIT) {
          setTextoPopUp({
            titulo: "Error al actualizar",
            subtitulo: "No se pudo identificar la empresa (NIT faltante)",
          });
          setMostrarPopUp(true);
          return;
        }
        
        // Crear un FormData para manejar correctamente los archivos
        const formData = new FormData();
        
        // Agregar campos básicos
        formData.append('nombre', empresa.nombre);
        formData.append('direccion', empresa.direccion);
        formData.append('descripcion', empresa.descripcion);
        
        // Agregar horarios en formato correcto
        if (empresa.horario) {
          formData.append('hora_apertura', empresa.horario.apertura);
          formData.append('hora_cierre', empresa.horario.cierre);
        }
        
        // Agregar servicios como array
        if (empresa.servicios && Array.isArray(empresa.servicios)) {
          empresa.servicios.forEach((servicio, index) => {
            formData.append(`servicios[${index}]`, servicio);
          });
        }
        
        // Agregar estado si existe
        if (empresa.id_estado_empresa) {
          formData.append('id_estado_empresa', empresa.id_estado_empresa);
        }
        
        // Agregar propietario_id si existe
        if (empresa.propietario_id) {
          formData.append('propietario_id', empresa.propietario_id);
        }
        
        // Imprimir los datos que se están enviando para depuración
        console.log("Datos de empresa a enviar como FormData");
        
        // Actualizar datos de la empresa con FormData
        const response = await empresaServicio.actualizar(empresa.NIT, formData);
        
        if (response.data.success) {
          setEditandoEmpresa(false);
          setTextoPopUp({
            titulo: "Empresa actualizada",
            subtitulo: "La información de la empresa ha sido actualizada exitosamente",
          });
        } else {
          throw new Error("La respuesta del servidor no indica éxito");
        }
      } // En la función guardarCambios, modificar la parte del propietario
      else if (tipoGuardado === 'propietario') {
        // Verificar que id_propietario existe antes de actualizar
        const propietarioId = propietario.id || propietario.id_propietario;
        
        if (!propietarioId) {
          setTextoPopUp({
            titulo: "Error al actualizar",
            subtitulo: "No se pudo identificar el propietario (ID faltante)",
          });
          setMostrarPopUp(true);
          return;
        }
        
        // Crear un FormData para manejar correctamente los archivos
        const propietarioData = new FormData();
        
        // Agregar campos básicos
        propietarioData.append('nombre', propietario.nombre);
        propietarioData.append('apellido', propietario.apellido);
        propietarioData.append('telefono', propietario.telefono);
        
        if (propietario.tipo_documento_id) {
          propietarioData.append('tipo_documento_id', propietario.tipo_documento_id);
        }
        
        if (propietario.numero_documento) {
          propietarioData.append('numero_documento', propietario.numero_documento);
        }
        
        // Si hay una imagen, agregarla
        if (propietario.imagen && propietario.imagen instanceof File) {
          propietarioData.append('imagen', propietario.imagen);
        }
        
        // Imprimir los datos que se están enviando para depuración
        console.log("ID de propietario a usar:", propietarioId);
        console.log("Datos a enviar:", Object.fromEntries(propietarioData));
        
        try {
          // Actualizar datos del propietario con FormData usando el ID correcto
          const response = await propietarioServicio.actualizar(propietarioId, propietarioData);
          
          if (response.data.success) {
            // Actualizar el estado local con los datos actualizados
            console.log("Datos recibidos del servidor:", response.data.data);
            console.log("ID de propietario a usar:", propietarioId);
            console.log("Datos a enviar:", Object.fromEntries(propietarioData));
            console.log("Datos recibidos del servidor:", response.data.data);
            
            setPropietario(prevState => ({
              ...prevState,
              ...response.data.data,
              // Asegurarse de que ambos ID estén presentes
              id: response.data.data.id || prevState.id,
              id_propietario: response.data.data.id || prevState.id_propietario
            }));
            
            setEditandoPropietario(false);
            setTextoPopUp({
              titulo: "Propietario actualizado",
              subtitulo: "La información del propietario ha sido actualizada exitosamente",
            });
          } else {
            throw new Error("La respuesta del servidor no indica éxito");
          }
        } catch (error) {
          console.error("Error al actualizar propietario:", error);
          
          setTextoPopUp({
            titulo: "Error al actualizar",
            subtitulo: error.response?.data?.message || "No se pudo actualizar la información del propietario",
          });
        }
      }
      
      setMostrarModal(false);
      setMostrarPopUp(true);
    } catch (error) {
      console.error("Error al actualizar:", error);
      
      // Manejar diferentes tipos de errores
      if (error.response) {
        const { status, data } = error.response;
        
        // Error 401: No autorizado
        if (status === 401) {
          setTextoPopUp({
            titulo: "Error de autenticación",
            subtitulo: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
          });
        }
        // Error 422: Validación fallida
        else if (status === 422) {
          // Mostrar información detallada del error para depuración
          console.log("Detalles del error 422:", data);
          
          // Extraer mensajes de validación
          let mensajesError = "";
          
          // Verificar si los errores están en data.errors o en data.data
          const errores = data.errors || (data.data && data.data) || {};
          
          if (Object.keys(errores).length > 0) {
            mensajesError = Object.entries(errores)
              .map(([campo, mensajes]) => {
                // Asegurarse de que mensajes sea un array
                const mensajesArray = Array.isArray(mensajes) ? mensajes : [mensajes];
                return `${campo}: ${mensajesArray.join(', ')}`;
              })
              .join("\n");
          }
          
          setTextoPopUp({
            titulo: "Error de validación",
            subtitulo: mensajesError || data.message || "Los datos proporcionados no son válidos",
          });
        }
        // Error 403: Prohibido
        else if (status === 403) {
          setTextoPopUp({
            titulo: "Acceso denegado",
            subtitulo: "No tienes permisos para realizar esta acción",
          });
        }
        // Error 404: No encontrado
        else if (status === 404) {
          setTextoPopUp({
            titulo: "Recurso no encontrado",
            subtitulo: tipoGuardado === 'empresa' ? 
              "La empresa no fue encontrada" : 
              "El propietario no fue encontrado",
          });
        }
        // Otros errores
        else {
          setTextoPopUp({
            titulo: "Error al actualizar",
            subtitulo: data.message || "Ha ocurrido un error al actualizar la información",
          });
        }
      } else {
        setTextoPopUp({
          titulo: "Error de conexión",
          subtitulo: "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
        });
      }
      
      // No cambiar el estado de edición en caso de error
      setMostrarModal(false);
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