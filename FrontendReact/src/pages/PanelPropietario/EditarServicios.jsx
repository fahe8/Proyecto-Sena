import React, { useState, useEffect } from "react";
import { empresaServicio, ServiciosServicio } from "../../services/api";
import { useAuth } from "../../Provider/AuthProvider";
import Loading from "../Login/components/Loading";
import LogPopUp from "../Login/components/logPopUp";
import { iconosServicios } from "../../utils/iconosServicios";

const EditarServicios = () => {
  const { user } = useAuth();
  const [empresa, setEmpresa] = useState(null);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [serviciosEmpresa, setServiciosEmpresa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [textoPopUp, setTextoPopUp] = useState({ message: "", subText: "" });

  useEffect(() => {
    const cargarDatos = async () => {
      if (!user?.NIT) return;

      try {
        setLoading(true);
        const [empresaResponse, serviciosResponse] = await Promise.all([
          empresaServicio.obtenerPorId(user.NIT),
          ServiciosServicio.obtenerTodos()
        ]);

        if (empresaResponse.data.success && empresaResponse.data.data) {
          const empresaData = Array.isArray(empresaResponse.data.data) ? 
            empresaResponse.data.data[0] : 
            empresaResponse.data.data;
          
          setEmpresa(empresaData);
          
          // Extraer los IDs de los servicios de la empresa
          // Ahora los servicios vienen como objetos con propiedades 'id' y 'tipo'
          const serviciosIds = empresaData.servicios?.map(servicio => {
            // Si es un objeto con propiedad id, usar esa propiedad
            if (typeof servicio === 'object' && servicio !== null) {
              return servicio.id;
            }
            // Si es un valor primitivo (string o número), usarlo directamente
            return servicio;
          }) || [];
          
          // Asegurarse de que todos los valores sean números (IDs)
          const serviciosIdsNumericos = serviciosIds.map(id => 
            typeof id === 'string' ? parseInt(id, 10) : id
          ).filter(id => !isNaN(id));
          
          console.log('Servicios de la empresa cargados:', serviciosIdsNumericos);
          setServiciosEmpresa(serviciosIdsNumericos);
        }

        if (serviciosResponse.data.servicios) {
          setServiciosDisponibles(serviciosResponse.data.servicios);
          console.log('Servicios disponibles cargados:', serviciosResponse.data.servicios);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        mostrarError("Error", "No se pudieron cargar los datos. Intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [user?.NIT]);

  const handleToggleServicio = (servicioId) => {
    // Asegurarse de que servicioId sea un número
    const idNumerico = typeof servicioId === 'string' ? parseInt(servicioId, 10) : servicioId;
    
    setServiciosEmpresa(prevServicios => {
      if (prevServicios.includes(idNumerico)) {
        return prevServicios.filter(id => id !== idNumerico);
      } else {
        return [...prevServicios, idNumerico];
      }
    });
  };

  const guardarCambios = async () => {
    if (!empresa) return;

    try {
      setGuardando(true);
      
      // Asegurarse de que todos los servicios sean IDs numéricos
      const serviciosNumericos = serviciosEmpresa
        .map(id => typeof id === 'string' ? parseInt(id, 10) : id)
        .filter(id => !isNaN(id));
      
      console.log('Guardando servicios:', serviciosNumericos);
      
      // Preparar datos para actualizar
      const datosActualizados = {
        servicios: serviciosNumericos
      };

      const response = await empresaServicio.actualizar(empresa.NIT, datosActualizados);
      console.log('Respuesta del servidor:', response.data);

      if (response.data.success) {
        mostrarExito("Cambios guardados", "Los servicios se han actualizado correctamente.");
      } else {
        mostrarError("Error", "No se pudieron guardar los cambios. Intente nuevamente.");
      }
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      mostrarError("Error", "No se pudieron guardar los cambios. Intente nuevamente.");
    } finally {
      setGuardando(false);
    }
  };

  const mostrarExito = (titulo, subtitulo) => {
    setTextoPopUp({ message: titulo, subText: subtitulo });
    setMostrarPopUp(true);
  };

  const mostrarError = (titulo, subtitulo) => {
    setTextoPopUp({ message: titulo, subText: subtitulo });
    setMostrarPopUp(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-10 md:px-30 py-8 bg-gray-100">
      {mostrarPopUp && (
        <LogPopUp
          setShowPopUp={setMostrarPopUp}
          message={textoPopUp.message}
          subText={textoPopUp.subText}
          onClose={() => setMostrarPopUp(false)}
        />
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-700 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Editar Servicios</h1>
          <p className="text-green-100 mt-2">
            Seleccione los servicios que ofrece su empresa
          </p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Servicios disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviciosDisponibles.map((servicio) => {
                // Normalizar el tipo de servicio para buscar el icono
                const servicioKey = servicio.tipo
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
                  .replace(/\s+/g, "");
                
                // Asegurarse de que la comparación sea consistente (número con número)
                const isSelected = serviciosEmpresa.includes(servicio.id);
                
                return (
                  <div 
                    key={servicio.id}
                    onClick={() => handleToggleServicio(servicio.id)}
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100 border-2 border-gray-400 hover:bg-gray-200'}`}
                  >
                    <div className="mr-3 bg-green-300 p-2 rounded-full">
                      {iconosServicios[servicioKey] && React.createElement(iconosServicios[servicioKey])}
                    </div>
                    <div>
                      <p className="font-medium">{servicio.tipo}</p>
                    </div>
                    <div className="ml-auto">
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => {}} // Controlado por el onClick del div padre
                        className="h-5 w-5 accent-green-600"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={guardarCambios}
              disabled={guardando}
              className={`px-6 py-2 rounded-md text-white font-medium cursor-pointer ${guardando ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {guardando ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarServicios;