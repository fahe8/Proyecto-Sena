import React, { useState, useEffect } from 'react';
import { reservaServicio, resenaServicio } from '../../services/api'; // Ajusta la ruta si es necesario
import Loading from "../Login/components/Loading"; // Asegúrate de tener un componente de carga
import { useAuth } from '../../Provider/AuthProvider'; // Importar el contexto de autenticación
import {StarIcon} from "../../assets/IconosSVG/iconos";

const ReservasPasadas = () => {
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [vistaActual, setVistaActual] = useState('lista'); // 'lista' o 'canchas'
  const { user } = useAuth(); // Obtener el usuario autenticado

  useEffect(() => {
    // Verificar si el usuario está autenticado y tiene una empresa asociada
    if (!user || !user.NIT) {
      console.error('No se encontró el NIT de la empresa');
      setError('No se pudo obtener la información de la empresa');
      setCargando(false);
      return;
    }

    const nitEmpresa = user.NIT;
    console.log('NIT de la empresa:', nitEmpresa);
  
    const obtenerReservas = async () => {
      setCargando(true);
      try {
        const resp = await reservaServicio.obtenerPorEmpresa(nitEmpresa);
        console.log('Todas las reservas recibidas:', resp.data.data);
        
        if (resp.data.success) {
          // Filtrar solo las reservas pasadas (cuya fecha y hora final ya pasaron)
          const ahora = new Date();
          
          const reservasPasadas = resp.data.data.filter(reserva => {
            try {
              // Crear una fecha combinando la fecha de reserva con la hora final
              if (!reserva.fecha) {
                return false;
              }
              
              // Convertir la fecha de string a objeto Date
              const [year, month, day] = reserva.fecha.split('-').map(num => parseInt(num, 10));
              const fechaReserva = new Date(year, month - 1, day); // month es 0-indexed en JavaScript
              
              // Asegurarse de que hora_final existe y tiene el formato correcto
              if (!reserva.hora_final || !reserva.hora_final.includes(':')) {
                return false;
              }
              
              // Añadir la hora final a la fecha
              const [horaFinal, minutoFinal] = reserva.hora_final.split(':').map(num => parseInt(num, 10));
              fechaReserva.setHours(horaFinal, minutoFinal, 0, 0);
              
              // Comparar con la fecha actual
              return fechaReserva.getTime() <= ahora.getTime();
            } catch (error) {
              console.error(`Error procesando reserva ID ${reserva.id_reserva}:`, error);
              return false;
            }
          });
          
          console.log('Reservas pasadas filtradas:', reservasPasadas);
          
          // Obtener reseñas para cada reserva
          const reservasConResenas = await Promise.all(
            reservasPasadas.map(async (reserva) => {
              try {
                // Obtener reseña para esta reserva
                const resenaResp = await resenaServicio.obtenerPorReserva(reserva.id_reserva);
                
                if (resenaResp.data.success && resenaResp.data.data) {
                  return {
                    ...reserva,
                    tiene_resena: true,
                    resena: resenaResp.data.data
                  };
                } else {
                  return {
                    ...reserva,
                    tiene_resena: false,
                    resena: null
                  };
                }
              } catch (error) {
                console.error(`Error obteniendo reseña para reserva ${reserva.id_reserva}:`, error);
                return {
                  ...reserva,
                  tiene_resena: false,
                  resena: null
                };
              }
            })
          );
          
          // Ordenar por fecha más reciente primero
          const reservasOrdenadas = reservasConResenas.sort((a, b) => 
            new Date(b.fecha) - new Date(a.fecha)
          );
          
          setReservas(reservasOrdenadas);
          setError(null);
        } else {
          console.error('Error en la respuesta del servidor');
          setReservas([]);
          setError('Error al cargar las reservas');
        }
      } catch (error) {
        console.error('Error al cargar reservas:', error);
        setReservas([]);
        setError('Error al cargar las reservas. Por favor, intenta de nuevo.');
      }
      setCargando(false);
    };
  
    obtenerReservas();
  }, [user]); // Dependencia: user para que se ejecute cuando cambie el usuario

  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Función para formatear la hora
  const formatearHora = (hora) => {
    if (!hora) return 'No disponible';
    if (/^\d{2}:\d{2}/.test(hora)) return hora.substring(0, 5);
    if (hora.includes('T')) return hora.split('T')[1]?.substring(0, 5) || 'No disponible';
    return hora;
  };

  // Función para calcular la duración en horas entre hora_inicio y hora_final
  const calcularDuracion = (horaInicio, horaFinal) => {
    if (!horaInicio || !horaFinal) return 0;
    
    // Extraer horas y minutos
    const inicioMatch = horaInicio.match(/^(\d{1,2}):(\d{2})/);
    const finalMatch = horaFinal.match(/^(\d{1,2}):(\d{2})/);
    
    if (!inicioMatch || !finalMatch) return 0;
    
    const horaIni = parseInt(inicioMatch[1], 10);
    const minIni = parseInt(inicioMatch[2], 10);
    const horaFin = parseInt(finalMatch[1], 10);
    const minFin = parseInt(finalMatch[2], 10);
    
    // Calcular diferencia en minutos
    const minutosTotales = (horaFin * 60 + minFin) - (horaIni * 60 + minIni);
    
    // Convertir a horas con un decimal
    return parseFloat((minutosTotales / 60).toFixed(1));
  };
  
  // Función para calcular el precio total
  const calcularPrecioTotal = (reserva) => {
    if (!reserva || !reserva.cancha?.precio || !reserva.hora_inicio || !reserva.hora_final) {
      return "No disponible";
    }
    
    const duracion = calcularDuracion(reserva.hora_inicio, reserva.hora_final);
    const precioHora = parseFloat(reserva.cancha.precio);
    
    if (isNaN(precioHora) || duracion <= 0) {
      return "No disponible";
    }
    
    return (precioHora * duracion).toFixed(0);
  };

  // Agrupar reservas por cancha
  const reservasPorCancha = reservas.reduce((acc, reserva) => {
    const canchaId = reserva.cancha?.id || 'sin-cancha';
    if (!acc[canchaId]) {
      acc[canchaId] = {
        cancha: reserva.cancha,
        reservas: []
      };
    }
    acc[canchaId].reservas.push(reserva);
    return acc;
  }, {});

  // Calcular estadísticas
  const estadisticas = {
    totalReservas: reservas.length,
    totalCanchas: Object.keys(reservasPorCancha).length,
    totalConResena: reservas.filter(reserva => reserva.tiene_resena).length,
    calificacionPromedio: reservas.filter(reserva => reserva.tiene_resena).reduce((sum, reserva) => sum + (reserva.resena?.calificacion || 0), 0) / 
                         (reservas.filter(reserva => reserva.tiene_resena).length || 1)
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-3 sm:p-6 sm:px-20">
      <header className="w-full flex flex-col justify-center items-center bg-green-700 text-white text-center rounded-t-lg">
        <h2 className="text-xl sm:text-2xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">Historial de reservas</h2>
        <p className="text-gray-100 text-xs sm:text-sm mb-4 sm:mb-6 px-4 text-center">
          Reservas que hicieron tus clientes y ya finalizaron
        </p>
      </header>

       {/* Sección de estadísticas */}
       <div className="w-full bg-white rounded-b-lg shadow-md p-4 mb-6">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="bg-gray-50 p-3 rounded-lg text-center">
             <p className="text-gray-500 text-xs">Total Reservas</p>
             <p className="text-2xl font-bold text-gray-800">{estadisticas.totalReservas}</p>
           </div>
           <div className="bg-gray-50 p-3 rounded-lg text-center">
             <p className="text-gray-500 text-xs">Canchas Utilizadas</p>
             <p className="text-2xl font-bold text-gray-800">{estadisticas.totalCanchas}</p>
           </div>
           <div className="bg-gray-50 p-3 rounded-lg text-center">
             <p className="text-gray-500 text-xs">Con Reseñas</p>
             <p className="text-2xl font-bold text-gray-800">{estadisticas.totalConResena}</p>
           </div>
           <div className="bg-gray-50 p-3 rounded-lg text-center">
             <p className="text-gray-500 text-xs">Calificación Promedio</p>
             <p className="text-2xl font-bold text-gray-800">
               {estadisticas.calificacionPromedio.toFixed(1)}
               <span className="text-yellow-500 ml-1">★</span>
             </p>
           </div>
         </div>
       </div>

       {/* Botones para cambiar vista */}
       <div className="flex justify-between items-center mb-4">
         <div className="flex space-x-2">
           <button
             onClick={() => setVistaActual('lista')}
             className={`px-4 py-2 rounded-lg ${vistaActual === 'lista' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
           >
             Vista Lista
           </button>
           <button
             onClick={() => setVistaActual('canchas')}
             className={`px-4 py-2 rounded-lg ${vistaActual === 'canchas' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
           >
             Vista Canchas
           </button>
         </div>
       </div>

       <div className="w-full mx-auto px-3 sm:px-0">
        <div className="bg-white rounded-b-lg shadow-lg flex-grow px-3 md:px-6 py-8">
          
          {cargando ? (
            <div className="flex justify-center items-center h-40">
              <Loading />
            </div>
          ) : reservas.length === 0 && !error ? (
            <p className="text-center text-black text-lg sm:text-xl p-3 sm:p-5">
              No tienes reservas finalizadas aún.
            </p>
          ) : (
            <>
              {/* Vista Lista */}
              {vistaActual === 'lista' && (
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  {reservas.map((reserva) => (
                    <div
                      key={reserva.id_reserva}
                      className="rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5 flex flex-col gap-2 sm:gap-3 border border-gray-200 bg-white"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-2">
                        <div>
                          <h2 className="text-base sm:text-lg font-semibold text-[#003044]">
                            {reserva.usuario?.nombre ? `${reserva.usuario.nombre} ${reserva.usuario.apellido}` : 'Cliente'}
                          </h2>
                          <p className="text-xs sm:text-sm text-gray-600">{reserva.cancha?.nombre || 'Cancha'}</p>
                        </div>
                        <div className="mt-1 sm:mt-0">
                          {reserva.tiene_resena ? (
                            <span className="bg-yellow-50 text-[#003344] px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium border border-yellow-100 flex items-center max-w-15">
                              <span className="mr-1">
                                <StarIcon/>
                              </span>
                              <span>{reserva.resena?.calificacion || '-'}</span>
                            </span>
                          ) : (
                            <span className="bg-gray-50 text-gray-600 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium border border-gray-100">
                              Sin reseña
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-700">
                        <div className="bg-gray-50 px-2 sm:px-3 py-1 rounded-md">
                          <span className="font-medium">Fecha:</span> {formatearFecha(reserva.fecha)}
                        </div>
                        <div className="bg-gray-50 px-2 sm:px-3 py-1 rounded-md">
                          <span className="font-medium">Hora:</span> {formatearHora(reserva.hora_inicio)} - {formatearHora(reserva.hora_final)}
                        </div>
                        <div className="bg-gray-50 px-2 sm:px-3 py-1 rounded-md">
                          <span className="font-medium">Precio:</span> ${reserva.cancha?.precio || 'No disponible'}
                        </div>
                      </div>
                      
                      <button
                        className="bg-[#003044] hover:bg-[#004d66] transition-colors mt-2 self-end text-white rounded-md py-1 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium cursor-pointer shadow-sm"
                        onClick={() => setReservaSeleccionada(reserva)}
                      >
                        Ver detalles
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Vista Canchas */}
              {vistaActual === 'canchas' && (
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Object.values(reservasPorCancha).map(({ cancha, reservas: reservasCancha }) => (
                    <div key={cancha?.id || 'sin-cancha'} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                      <div className="p-3 sm:p-4 bg-[#003044] text-white">
                        <h3 className="text-base sm:text-lg font-semibold">{cancha?.nombre || 'Cancha sin nombre'}</h3>
                        <p className="text-xs sm:text-sm opacity-90">{reservasCancha.length} reservas completadas</p>
                      </div>
                      <div className="p-3 sm:p-4">
                        <h4 className="font-medium text-gray-700 text-sm sm:text-base mb-2 sm:mb-3">Historial de reservas</h4>
                        {reservasCancha.length === 0 ? (
                          <p className="text-gray-500 text-xs sm:text-sm">No hay reservas completadas</p>
                        ) : (
                          <div className="space-y-2">
                            {reservasCancha.map((reserva) => (
                              <div key={reserva.id_reserva} className="bg-[#f8f9fa] rounded p-2 sm:p-3 border-l-4 border-green-500">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <p className="font-medium text-xs sm:text-sm text-[#003044]">
                                      {reserva.usuario?.nombre ? `${reserva.usuario.nombre} ${reserva.usuario.apellido}` : 'Cliente'}
                                    </p>
                                    <p className="text-xs text-gray-600">{formatearFecha(reserva.fecha)}</p>
                                    <p className="text-xs text-gray-600">
                                      {formatearHora(reserva.hora_inicio)} - {formatearHora(reserva.hora_final)}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      Precio: ${reserva.cancha?.precio || 'No disponible'}
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end gap-1">
                                    {reserva.tiene_resena && (
                                      <div className="flex items-center text-yellow-500 text-xs">
                                        <span className="mr-1">★</span>
                                        <span>{reserva.resena?.calificacion || '-'}</span>
                                      </div>
                                    )}
                                    <button
                                      onClick={() => setReservaSeleccionada(reserva)}
                                      className="text-[#003044] hover:text-[#004d66] text-xs font-medium cursor-pointer"
                                    >
                                      Ver
                                    </button>
                                  </div>
                                </div>
                                {reserva.tiene_resena && reserva.resena?.comentario && (
                                  <div className="mt-1 text-xs text-gray-600 italic bg-white p-1 rounded">
                                    "{reserva.resena.comentario.substring(0, 60)}{reserva.resena.comentario.length > 60 ? '...' : ''}"
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      {reservaSeleccionada && (
        <div className="fixed inset-0 bg-[#36363695] bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl cursor-pointer"
              onClick={() => setReservaSeleccionada(null)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#003044]">Datos de la reserva</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Cliente</h4>
                  <p className="text-sm text-gray-900">
                    {reservaSeleccionada.usuario?.nombre
                      ? `${reservaSeleccionada.usuario.nombre} ${reservaSeleccionada.usuario.apellido}`
                      : "No disponible"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Contacto</h4>
                  <p className="text-sm text-gray-900">
                    {reservaSeleccionada.usuario?.telefono || "No disponible"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p className="text-sm text-gray-900">
                    {reservaSeleccionada.usuario?.user?.email || "No disponible"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Cancha</h4>
                  <p className="text-sm text-gray-900">
                    {reservaSeleccionada.cancha?.nombre || "No disponible"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Fecha</h4>
                  <p className="text-sm text-gray-900">
                    {formatearFecha(reservaSeleccionada.fecha)}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Hora</h4>
                  <p className="text-sm text-gray-900">
                    {formatearHora(reservaSeleccionada.hora_inicio)} - {formatearHora(reservaSeleccionada.hora_final)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Precio Cancha (por hora)</h4>
                  <p className="text-sm text-gray-900 font-semibold">
                    ${reservaSeleccionada.cancha?.precio || "No disponible"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Duración</h4>
                  <p className="text-sm text-gray-900 font-semibold">
                    {calcularDuracion(reservaSeleccionada.hora_inicio, reservaSeleccionada.hora_final)} horas
                  </p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500">Precio Total</h4>
                  <p className="text-lg text-gray-900 font-semibold">
                    ${calcularPrecioTotal(reservaSeleccionada)}
                  </p>
                </div>
              </div>

              {/* Sección de reseña */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Reseña del cliente</h4>
                
                {reservaSeleccionada.tiene_resena ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center text-gray-700 text-sm mr-2  italic">
                        Calificación:  
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < reservaSeleccionada.resena?.calificacion ? "text-yellow-500" : "text-gray-300"}>
                            <StarIcon/>
                          </span>
                        ))}
                      </div>
                      
                    </div>
                    
                    {reservaSeleccionada.resena?.comentario ? (
                      <div className="bg-white rounded-md border border-gray-100">
                        <p className="text-sm text-gray-700 italic">Comentario: "{reservaSeleccionada.resena.comentario}"</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        El cliente no dejó comentarios en su reseña.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 italic">
                      El cliente no ha dejado una reseña para esta reserva.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setReservaSeleccionada(null)}
                className="w-full bg-[#003044] text-white py-2 px-4 rounded-md hover:bg-[#004d66] transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservasPasadas;