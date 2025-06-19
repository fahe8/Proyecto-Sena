import React, { useState, useEffect } from 'react';
import { reservaServicio } from '../../services/api';
import { useAuth } from '../../Provider/AuthProvider';
import LogPopUp from "../Login/components/logPopUp";
import { useNavigate } from 'react-router-dom';
import Loading from '../Login/components/Loading';
const ReservasPendientes = () => {
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [emailUsuario, setEmailUsuario] = useState('');
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [textoPopUp, setTextoPopUp] = useState({ titulo: "", subtitulo: "" });
  const [vistaActual, setVistaActual] = useState('lista'); // 'lista' o 'canchas'
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Usuario autenticado:', user);
    const cargarReservas = async () => {
      try {
        setCargando(true);
        const response = await reservaServicio.obtenerPorEmpresa(user.NIT);
        if (response.data.success) {
          // Filtrar solo las reservas pendientes (futuras)
          const ahora = new Date();
          const reservasPendientes = response.data.data.filter(reserva => {
            const fechaReserva = new Date(reserva.fecha);
            const [horaFinal, minutoFinal] = reserva.hora_final.split(':');
            fechaReserva.setHours(parseInt(horaFinal, 10), parseInt(minutoFinal, 10));
            return fechaReserva > ahora;
          });
          setReservas(reservasPendientes);
        } else {
          setTextoPopUp({
            titulo: "Error",
            subtitulo: "No se pudieron cargar las reservas"
          });
          setMostrarPopUp(true);
        }
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
        setTextoPopUp({
          titulo: "Error",
          subtitulo: "Error al cargar las reservas"
        });
        setMostrarPopUp(true);
      } finally {
        setCargando(false);
      }
    };
    if (user?.NIT) {
      cargarReservas();
    }
  }, [user]);

  useEffect(() => {
    console.log('Reservas obtenidas:', reservas);
    // Verificar la estructura de datos para depurar el problema del email
    if (reservas.length > 0) {
      console.log('Estructura de usuario en reserva:', reservas[0].usuario);
      console.log('Email del usuario:', reservas[0].usuario?.user?.email);
    }
  }, [reservas]);

  // Ya no necesitamos obtener el email del usuario
  useEffect(() => {
    if (reservaSeleccionada) {
      // Limpiar el estado cuando se selecciona una nueva reserva
      setEmailUsuario('');
      console.log('Información de usuario seleccionado:', reservaSeleccionada.usuario);
    }
  }, [reservaSeleccionada]);

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatearHora = (hora) => {
    if (!hora) return 'No disponible';
    if (/^\d{2}:\d{2}/.test(hora)) return hora.substring(0, 5);
    if (hora.includes('T')) return hora.split('T')[1]?.substring(0, 5) || 'No disponible';
    return hora;
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
    reservasHoy: reservas.filter(reserva => {
      const fechaReserva = new Date(reserva.fecha);
      const hoy = new Date();
      return fechaReserva.toDateString() === hoy.toDateString();
    }).length,
    reservasEstaSemana: reservas.filter(reserva => {
      const fechaReserva = new Date(reserva.fecha);
      const hoy = new Date();
      const finSemana = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000);
      return fechaReserva >= hoy && fechaReserva <= finSemana;
    }).length
  };

  const VistaEstadisticas = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition-shadow">
        <div className="flex items-center">
          <div className="p-2 bg-green-200 rounded-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="ml-3 sm:ml-4">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Total Reservas</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{estadisticas.totalReservas}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition-shadow">
        <div className="flex items-center">
          <div className="p-2 bg-green-200 rounded-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="ml-3 sm:ml-4">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Canchas ocupadas</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{estadisticas.totalCanchas}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition-shadow">
        <div className="flex items-center">
          <div className="p-2 bg-green-200 rounded-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="ml-3 sm:ml-4">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Reservas Hoy</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{estadisticas.reservasHoy}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition-shadow">
        <div className="flex items-center">
          <div className="p-2 bg-green-200 rounded-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="ml-3 sm:ml-4">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Esta Semana</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{estadisticas.reservasEstaSemana}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const VistaLista = () => (
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
              <span className="bg-green-50 text-green-600 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium border border-green-100">
                Pendiente
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-700">
            <div className="bg-gray-50 px-2 sm:px-3 py-1 rounded-md">
              <span className="font-medium">Fecha:</span> {formatearFecha(reserva.fecha)}
            </div>
            <div className="bg-gray-50 px-2 sm:px-3 py-1 rounded-md">
              <span className="font-medium">Hora:</span> {formatearHora(reserva.hora_inicio)} - {formatearHora(reserva.hora_final)}
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
  );

  const VistaCanchas = () => (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Object.values(reservasPorCancha).map(({ cancha, reservas: reservasCancha }) => (
        <div key={cancha?.id || 'sin-cancha'} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-3 sm:p-4 bg-[#003044] text-white">
            <h3 className="text-base sm:text-lg font-semibold">{cancha?.nombre || 'Cancha sin nombre'}</h3>
            <p className="text-xs sm:text-sm opacity-90">${cancha?.precio || 0} por hora</p>
          </div>
          <div className="p-3 sm:p-4">
            <h4 className="font-medium text-gray-700 text-sm sm:text-base mb-2 sm:mb-3">Reservas pendientes ({reservasCancha.length})</h4>
            {reservasCancha.length === 0 ? (
              <p className="text-gray-500 text-xs sm:text-sm">No hay reservas pendientes</p>
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
                      </div>
                      <button
                        onClick={() => setReservaSeleccionada(reserva)}
                        className="text-[#003044] hover:text-[#004d66] text-xs font-medium cursor-pointer"
                      >
                        Ver
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 p-3 sm:p-6 sm:px-20">
      <header className="w-full flex flex-col justify-center items-center bg-green-700 text-white text-center rounded-t-lg">
        <h2 className="text-xl sm:text-2xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">Reservas Pendientes</h2>
        <p className="text-gray-100 text-xs sm:text-sm mb-4 sm:mb-6 px-4 text-center">
          Reservas que han hecho tus clientes y aún no han finalizado
        </p>
      </header>

      <main className="">
        <div className="bg-white rounded-b-lg shadow-lg p-3 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setVistaActual('lista')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  vistaActual === 'lista'
                    ? 'bg-[#003044] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Vista Lista
              </button>
              <button
                onClick={() => setVistaActual('canchas')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  vistaActual === 'canchas'
                    ? 'bg-[#003044] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Vista Canchas
              </button>
            </div>
          </div>
          
          {cargando ? (
            <div className="text-center py-10">
              <Loading/>
            </div>
          ) : reservas.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No hay reservas pendientes.</div>
          ) : (
            <>
              <VistaEstadisticas />
              {vistaActual === 'lista' ? <VistaLista /> : <VistaCanchas />}
            </>
          )}
        </div>
      </main>

      {/* Modal para ver detalles del cliente */}
      {reservaSeleccionada && (
        <div className="fixed inset-0 bg-[#36363695] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl cursor-pointer"
              onClick={() => setReservaSeleccionada(null)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#003044]">Datos del cliente</h3>
            <div className="mb-2">
              <span className="font-medium">Nombre:</span> {reservaSeleccionada.usuario?.nombre ? `${reservaSeleccionada.usuario.nombre} ${reservaSeleccionada.usuario.apellido}` : 'No disponible'}
            </div>
            <div className="mb-2">
              <span className="font-medium">Teléfono:</span> {reservaSeleccionada.usuario?.telefono || 'No disponible'}
            </div>
            <div className="mb-2">
              <span className="font-medium">Email:</span> {reservaSeleccionada.usuario?.user?.email || 'No disponible'}
            </div>
            <div className="mb-2">
              <span className="font-medium">Cancha:</span> {reservaSeleccionada.cancha?.nombre || 'No disponible'}
            </div>
            <div className="mb-2">
              <span className="font-medium">Fecha:</span> {formatearFecha(reservaSeleccionada.fecha)}
            </div>
            <div className="mb-2">
              <span className="font-medium">Hora:</span> {formatearHora(reservaSeleccionada.hora_inicio)} - {formatearHora(reservaSeleccionada.hora_final)}
            </div>
            <div className="mb-2">
              <span className="font-medium">Precio:</span> ${reservaSeleccionada.cancha?.precio || 'No disponible'}
            </div>
          </div>
        </div>
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

export default ReservasPendientes;