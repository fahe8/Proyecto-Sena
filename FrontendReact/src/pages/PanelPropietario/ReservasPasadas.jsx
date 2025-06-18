import React, { useState, useEffect } from 'react';
import { reservaServicio } from '../../services/api'; // Ajusta la ruta si es necesario
import Loading from "../Login/components/Loading"; // Asegúrate de tener un componente de carga

const ReservasPasadas = ({ nitEmpresa }) => {
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!nitEmpresa) {
      setCargando(false);
      setReservas([]);
      return;
    }
  
    const obtenerReservas = async () => {
      setCargando(true);
      try {
        const resp = await reservaServicio.obtenerPorEmpresa(nitEmpresa);
        const reservasPasadas = (resp.data || []).filter(reserva => {
          const fechaReserva = new Date(reserva.fecha + ' ' + reserva.hora);
          return fechaReserva < new Date();
        });
        
        // Ordenar por fecha más reciente primero
        const reservasOrdenadas = reservasPasadas.sort((a, b) => 
          new Date(b.fecha) - new Date(a.fecha)
        );
        
        setReservas(reservasOrdenadas);
      } catch (error) {
        console.error('Error al cargar reservas:', error);
        setError('No se pudieron cargar las reservas pasadas');
        setReservas([]);
      }
      setCargando(false);
    };
  
    obtenerReservas();
  }, [nitEmpresa]);

  return (
    <div className="min-h-screen w-full bg-gray-100 overflow-x-hidden p-10 md:px-30">
      <nav className="bg-green-700 shadow-lg p-4 sm:p-6 rounded-t-lg text-center">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-15 py-[4px]">
          <h2 className="text-lg md:text-2xl font-bold pb-2 sm:pb-2.5 font-sans text-white">
            Historial de reservas
          </h2>
        </div>
      </nav>

      <div className="w-full mx-auto px-3 sm:px-0">
        <div className="bg-white rounded-b-lg shadow-lg flex-grow px-10 md:px-6 py-8">
          {cargando ? (
            <div className="flex justify-center items-center h-40">
              <Loading />
            </div>
          ) : reservas.length === 0 ? (
            <p className="text-center text-black text-lg sm:text-xl p-3 sm:p-5">
              No tienes reservas finalizadas aún.
            </p>
          ) : (
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
              {reservas.map((reserva) => (
                <div
                  key={reserva.id}
                  className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-14px)] lg:w-[255px] bg-[#e5fff2] rounded-xl shadow-md overflow-hidden border border-[#ddd]"
                >
                  <div className="flex justify-between items-start mb-2 sm:mb-4 px-4 pt-4">
                    <div className="w-full">
                      <h3 className="font-bold text-[#003044] text-lg">{reserva.cliente || reserva.usuario || "Cliente"}</h3>
                      <p className="text-sm text-gray-600">{reserva.cancha}</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <span>★</span>
                      <span>{reserva.rating || reserva.calificacion || "-"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 px-4 pb-2 text-sm text-gray-700">
                    <div>
                      <span className="font-medium">Fecha:</span> {reserva.fecha}
                    </div>
                    <div>
                      <span className="font-medium">Hora:</span> {reserva.hora}
                    </div>
                  </div>
                  <button
                    className="m-4 text-[#003044] hover:underline text-sm font-medium"
                    onClick={() => setReservaSeleccionada(reserva)}
                  >
                    Ver detalles
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal para ver detalles del cliente */}
      {reservaSeleccionada && (
        <div className="fixed inset-0 bg-[#36363695] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setReservaSeleccionada(null)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#003044]">Datos del cliente</h3>
            <div className="mb-2">
              <span className="font-medium">Nombre:</span> {reservaSeleccionada.cliente || reservaSeleccionada.usuario}
            </div>
            <div className="mb-2">
              <span className="font-medium">Teléfono:</span> {reservaSeleccionada.telefono}
            </div>
            <div className="mb-2">
              <span className="font-medium">Email:</span> {reservaSeleccionada.email}
            </div>
            <div className="mb-2">
              <span className="font-medium">Cancha:</span> {reservaSeleccionada.cancha}
            </div>
            <div className="mb-2">
              <span className="font-medium">Fecha:</span> {reservaSeleccionada.fecha}
            </div>
            <div className="mb-2">
              <span className="font-medium">Hora:</span> {reservaSeleccionada.hora}
            </div>
            <div className="mb-2">
              <span className="font-medium">Comentario:</span> {reservaSeleccionada.comentario}
            </div>
            <div className="mb-2 flex items-center gap-1">
              <span className="font-medium">Calificación:</span>
              <span className="text-[#003044]">★</span>
              <span>{reservaSeleccionada.rating || reservaSeleccionada.calificacion || "-"}</span>
            </div>
            <div className="mb-2">
              <span className="font-medium">Monto cancelado:</span> {reservaSeleccionada.monto}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservasPasadas;