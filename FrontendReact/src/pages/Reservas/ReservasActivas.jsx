import React, { useState, useEffect } from "react";
import { useAuth } from "../../Provider/AuthProvider";
import { calendar, clock, football, Gps, money } from "../../assets/IconosSVG/iconos";
import { canchasServicio, reservaServicio } from "../../services/api";
import Loading from "../../pages/Login/components/Loading";

const ReservasActivas = () => {
  const { user } = useAuth();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [reservasActivas, setReservasActivas] = useState([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar reservas activas 
  useEffect(() => {
    const cargarReservasActivas = async () => {
      try {
        setCargando(true);

        if (!user?.id) {
          console.log("No hay usuario autenticado o auth.id no existe");
          setCargando(false);
          return;
        }
        
        const response = await reservaServicio.obtenerReservasActivas(user.id);
        console.log("Respuesta API:", response.data);
        
        if (response.data && response.data.success) {
          setReservasActivas(response.data.data || []);
          console.log("Reservas activas:", response.data.data);
        } else {
          throw new Error("No se pudieron cargar las reservas activas");
        }
      } catch (error) {
        console.error("Error al cargar reservas activas:", error);
        setError("No se pudieron cargar las reservas activas");
      } finally {
        setCargando(false);
      }
    };
  
    if (user?.id) {
      cargarReservasActivas();
    }
  }, [user]);

  // Función para abrir el modal con la información de una reserva específica
  const abrirModal = (reserva) => {
    setReservaSeleccionada(reserva);
    setMostrarModal(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setMostrarModal(false);
    setReservaSeleccionada(null);
  };

  // Función para formatear la fecha - CORREGIDA
const formatearFecha = (fechaStr) => {
  if (!fechaStr) return "No disponible";
  
  try {
    // Convertir la fecha a un objeto Date con UTC explícito
    const fecha = new Date(fechaStr);
    
    // Verificar si la fecha es válida
    if (isNaN(fecha.getTime())) {
      console.error("Fecha inválida:", fechaStr);
      return "Fecha inválida";
    }
    
    // Ajustar para la zona horaria local para evitar el desfase de un día
    // Usamos toLocaleDateString con una opción de zona horaria UTC
    return fecha.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'UTC' // Importante: esto asegura que se use la fecha UTC sin conversión a hora local
    });
  } catch (e) {
    console.error("Error al formatear fecha:", e);
    return `Error: ${fechaStr}`;
  }
};

  // Función mejorada para formatear la hora
  const formatearHora = (fechaHoraStr) => {
    if (!fechaHoraStr) return "--:--";
    
    try {
      // Si es solo una hora (no una fecha completa), añadir una fecha ficticia
      let fechaHora = fechaHoraStr;
      if (typeof fechaHoraStr === 'string' && fechaHoraStr.length <= 8) {
        // Asumimos que es un formato de hora como "HH:MM" o "HH:MM:SS"
        fechaHora = `2000-01-01T${fechaHoraStr}`;
      }
      
      const fecha = new Date(fechaHora);
      
      // Verificar si la fecha/hora es válida
      if (isNaN(fecha.getTime())) {
        console.error("Hora inválida:", fechaHoraStr);
        return fechaHoraStr;
      }
      
      return fecha.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      console.error("Error al formatear hora:", e);
      return fechaHoraStr;
    }
  };

  // Función para obtener el nombre de la empresa o establecimiento
  const obtenerNombreEmpresa = (reserva) => {
    if (reserva.empresa?.nombre) {
      return reserva.empresa.nombre;
    }
    
    // Con la nueva estructura
    if (reserva.cancha?.NIT) {
      return `Cancha ${reserva.cancha.nombre || 'Sin nombre'}`;
    }
    
    return "Cancha";
  };

  // Función para obtener la dirección de la empresa
  const obtenerDireccionEmpresa = (reserva) => {
    if (reserva.empresa?.direccion) {
      return reserva.empresa.direccion;
    }
    
    return "Ubicación no disponible";
  };

  return (
    <div className="w-full mx-auto p-20 px-5 md:px-30 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="rounded-lg shadow-xl bg-white justify-center items-center">
        <div className="bg-[#003044] p-6 text-white rounded-t-lg">
          {/* Título de la sección */}
          <h2 className="font-bold text-center text-xl">RESERVAS ACTIVAS</h2>
          <p className="text-center p-3 text-sm">Reservas que has hecho y siguen pendientes</p>
        </div>
        {cargando ? (
        <div className="flex justify-center items-center h-40">
          <Loading />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          {error}
        </div>
      ) : reservasActivas.length === 0 ? (<div className="text-center py-12 bg-white rounded-xl ">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg text-gray-600">
          Aún no tienes reservas activas
        </p>
      </div>
      ) : (
        // Lista de reservas activas
        <div className="space-y-4 p-15 grid grid-cols-1 md:grid-cols-2 gap-10">
          {reservasActivas.map((reserva) => (
            <div 
              key={reserva.id_reserva || reserva.id} 
              className="bg-gray-100 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.2)] overflow-hidden transition-shadow p-3"
            >
              {/* Información de la card principal */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-4">
                  {/* Logo de la empresa */}
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {obtenerNombreEmpresa(reserva).charAt(0) || "C"}
                  </div>
                  {/* Location info */}
                  <div>
                    <h3 className="font-bold">{obtenerNombreEmpresa(reserva)}</h3>
                    <span className="flex">
                      <div>{React.createElement(Gps)}</div>
                      <p className="text-sm">{obtenerDireccionEmpresa(reserva)}</p>
                    </span>
                  </div>
                </div>

                {/* Botón que abre el modal de descripción */}
                <div className="flex justify-start sm:justify-end items-center mt-2 sm:mt-0">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors w-full sm:w-auto cursor-pointer"
                    onClick={() => abrirModal(reserva)}
                  >
                    Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      

      

      {/* Modal de descripción mejorado y responsive */}
      {mostrarModal && reservaSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-3">
          {/* Overlay oscuro detrás del modal */}
          <div 
            className="absolute inset-0 bg-[#36363695] backdrop-blur-sm"
            onClick={cerrarModal}
          ></div>
          
          {/* Contenido del modal - ahora más responsive */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto z-10 relative overflow-hidden max-h-[90vh] flex flex-col">
            {/* Encabezado del modal con color de fondo */}
            <div className="bg-green-500 p-8 text-white relative">
              <h3 className="text-lg font-bold">
                Detalles de la Reserva
              </h3>
              <p className="text-sm opacity-90">
                {reservaSeleccionada.cancha?.nombre || obtenerNombreEmpresa(reservaSeleccionada)}
              </p>
              
              {/* Botón de cerrar */}
              <button 
                className="absolute top-4 right-4 text-white hover:text-gray-200 cursor-pointer"
                onClick={cerrarModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Contenido principal del modal con scroll si es necesario */}
            <div className="p-4 sm:p-6 overflow-y-auto">
              {/* Información de la reserva */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Columna izquierda */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-700 mb-3">Información de la Reserva</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {React.createElement(calendar)}
                        <div>
                          <span className="text-xs sm:text-sm text-gray-500">Fecha</span>
                          <p className="font-medium text-sm sm:text-base">
                            {formatearFecha(reservaSeleccionada.fecha)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {React.createElement(clock)}
                        <div>
                          <span className="text-xs sm:text-sm text-gray-500">Horario</span>
                          <p className="font-medium text-sm sm:text-base">
                            {formatearHora(reservaSeleccionada.hora_inicio || reservaSeleccionada.horaInicio)} a {formatearHora(reservaSeleccionada.hora_final || reservaSeleccionada.horaFin)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {React.createElement(football)}
                        <div>
                          <span className="text-xs sm:text-sm text-gray-500">Tipo de cancha</span>
                          <p className="font-medium text-sm sm:text-base">
                            {reservaSeleccionada.cancha?.id_tipo_cancha || "Fútbol"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Columna derecha */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-700 mb-3">Datos de pago</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {React.createElement(money)}
                        <div>
                          <span className="text-xs sm:text-sm text-gray-500">Total</span>
                          <p className="font-medium text-sm sm:text-base">
                            ${reservaSeleccionada.cancha?.precio || reservaSeleccionada.total || reservaSeleccionada.monto || '0.00'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm text-gray-500">Estado</span>
                          <p className="font-medium text-sm sm:text-base text-green-600">
                            {reservaSeleccionada.estado || "Confirmada"}
                          </p>
                        </div>
                      </div>
                      
                      {reservaSeleccionada.metodoPago && (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm text-gray-500">Método de pago</span>
                            <p className="font-medium text-sm sm:text-base">{reservaSeleccionada.metodoPago}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Información de contacto */}
              <div className=" bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                <h4 className="font-medium text-gray-700 mb-3">Información de contacto</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-xs sm:text-sm text-gray-500">Nombre</span>
                      <p className="font-medium text-sm sm:text-base">
                        {reservaSeleccionada.usuario ? 
                          `${reservaSeleccionada.usuario.nombre || ''} ${reservaSeleccionada.usuario.apellido || ''}` : 
                          (reservaSeleccionada.nombreUsuario || "Usuario")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-xs sm:text-sm text-gray-500">Teléfono</span>
                      <p className="font-medium text-sm sm:text-base">
                        {reservaSeleccionada.usuario?.telefono || 
                         reservaSeleccionada.telefonoUsuario || 
                         "No disponible"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              
              {/* Botones de acción
              <div className="flex flex-col sm:flex-row sm:justify-end  space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                   className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors w-full sm:w-auto"
                  onClick={cerrarModal}
                >
                  Cerrar
               
                
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservasActivas;