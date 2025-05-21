import React, { useState, useEffect, useContext } from "react";
import {useAuth} from "../../Provider/AuthProvider";
import { calendar, clock, football, gps, money } from "../../assets/IconosSVG/iconos";
import { canchasServicio, reservaServicio } from "../../services/api";


const ReservasActivas = () => {
  const auth = useAuth();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [reservasActivas, setReservasActivas] = useState([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [infoCancha, setInfoCancha] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar reservas activas 
  useEffect(() => {
    const cargarReservasActivas = async () => {
      try {
        setCargando(true);
        console.log("Estado de auth:", auth); // Aquí sí estará definido
        
        const response = await reservaServicio.obtenerReservasActivas(auth.uid);
        console.log("Respuesta API:", response.data); // Aquí sí estará definido
        
        if (response.data && response.data.success) {
          setReservasActivas(response.data.data || []);
          console.log("Reservas activas:", response.data.data); // Aquí sí estará definido
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
  
    if (auth?.uid) {
      cargarReservasActivas();
    } else {
      console.log("No hay usuario autenticado o auth.uid no existe");
    }
  }, [auth]);

  // Cargar detalles de la cancha para la reserva seleccionada
  const cargarDetallesCancha = async (reserva) => {
    try {
      // Obtener detalles de la cancha a la que pertenece la reserva
      const respuesta = await canchasServicio.obtenerPorId(reserva.canchaId);
      
      if (respuesta.data.success) {
        setInfoCancha(respuesta.data.data);
      } else {
        throw new Error("No se pudieron cargar los detalles de la cancha");
      }
    } catch (error) {
      console.error("Error al cargar detalles de la cancha:", error);
      setInfoCancha(null);
    }
  };

  // Función para abrir el modal con la información de una reserva específica
  const abrirModal = async (reserva) => {
    setReservaSeleccionada(reserva);
    await cargarDetallesCancha(reserva);
    setMostrarModal(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setMostrarModal(false);
    setReservaSeleccionada(null);
    setInfoCancha(null);
  };

  // Función para formatear la fecha
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "No disponible";
    
    try {
      const fecha = new Date(fechaStr);
      return fecha.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return fechaStr;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-20 px-3">
      {/* Título de la sección */}
      <h2 className="font-bold text-center text-xl">RESERVAS ACTIVAS</h2>
      <hr className="font-bold border-t-2 p-1 mt-2" />

      {cargando ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          {error}
        </div>
      ) : reservasActivas.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-6 text-center mt-4">
          <p className="text-gray-600">No tienes reservas activas en este momento.</p>
        </div>
      ) : (
        // Lista de reservas activas
        <div className="space-y-4 mt-4">
          {reservasActivas.map((reserva) => (
            <div 
              key={reserva.id} 
              className="bg-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Información de la card principal */}
              <div className="p-4 grid grid-cols-2">
                <div className="flex items-center gap-4">
                  {/* Logo de la empresa */}
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {reserva.empresa?.nombre?.charAt(0) || "C"}
                  </div>
                  {/* Location info */}
                  <div>
                    <h3 className="font-bold">{reserva.empresa?.nombre || "Cancha"}</h3>
                    <span className="flex">
                      <div>{React.createElement(gps)}</div>
                      <p className="text-sm">{reserva.empresa?.direccion || "Ubicación no disponible"}</p>
                    </span>
                  </div>
                </div>

                {/* Botón que abre el modal de descripción */}
                <div className="flex justify-end items-center">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                    onClick={() => abrirModal(reserva)}
                  >
                    Descripción
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de descripción mejorado */}
      {mostrarModal && reservaSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay oscuro detrás del modal */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={cerrarModal}
          ></div>
          
          {/* Contenido del modal */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4 z-10 relative overflow-hidden">
            {/* Encabezado del modal con color de fondo */}
            <div className="bg-green-500 p-4 text-white relative">
              <h3 className="text-lg font-bold">
                Detalles de la Reserva
              </h3>
              <p className="text-sm opacity-90">
                {infoCancha?.nombre || reservaSeleccionada.empresa?.nombre || "Cancha reservada"}
              </p>
              
              {/* Botón de cerrar */}
              <button 
                className="absolute top-4 right-4 text-white hover:text-gray-200"
                onClick={cerrarModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Contenido principal del modal */}
            <div className="p-6">
              {/* Información de la reserva */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna izquierda */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-700 mb-3">Información de la Reserva</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {React.createElement(calendar)}
                        <div>
                          <span className="text-sm text-gray-500">Fecha</span>
                          <p className="font-medium">
                            {formatearFecha(reservaSeleccionada.fecha)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {React.createElement(clock)}
                        <div>
                          <span className="text-sm text-gray-500">Horario</span>
                          <p className="font-medium">
                            {reservaSeleccionada.horaInicio || '--:--'} a {reservaSeleccionada.horaFin || '--:--'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {React.createElement(football)}
                        <div>
                          <span className="text-sm text-gray-500">Tipo de cancha</span>
                          <p className="font-medium">{infoCancha?.tipoCancha || "Fútbol"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Columna derecha */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-700 mb-3">Datos de pago</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {React.createElement(money)}
                        <div>
                          <span className="text-sm text-gray-500">Total</span>
                          <p className="font-medium">
                            ${reservaSeleccionada.total || reservaSeleccionada.monto || '0.00'}
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
                          <span className="text-sm text-gray-500">Estado</span>
                          <p className="font-medium text-green-600">
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
                            <span className="text-sm text-gray-500">Método de pago</span>
                            <p className="font-medium">{reservaSeleccionada.metodoPago}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Información de contacto */}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="font-medium text-gray-700 mb-3">Información de contacto</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    
                    <div>
                      <span className="text-sm text-gray-500">Nombre</span>
                      <p className="font-medium">{reservaSeleccionada.nombreUsuario || "Usuario"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    
                    <div>
                      <span className="text-sm text-gray-500">Teléfono</span>
                      <p className="font-medium">{reservaSeleccionada.telefonoUsuario || "No disponible"}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Política de cancelación */}
              <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h4 className="font-medium text-yellow-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Política de cancelación
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Puedes cancelar esta reserva hasta 24 horas antes de la hora programada. Después de ese tiempo, no habrá reembolso.
                </p>
              </div>
              
              {/* Botones de acción */}
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={cerrarModal}
                >
                  Cerrar
                </button>
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                  onClick={() => {
                    // Aquí puedes implementar la lógica para ver en mapa o contactar
                    // Por ahora solo cierra el modal
                    cerrarModal();
                  }}
                >
                  Ver en mapa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservasActivas;