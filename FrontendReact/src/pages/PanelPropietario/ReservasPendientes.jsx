import React, { useState, useEffect } from 'react';
import { reservaServicio } from '../../services/api';
import { useAuth } from '../../Provider/AuthProvider';
import Loading from '../Login/components/Loading';

const ReservasPendientes = () => {
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const cargarReservas = async () => {
      if (!user?.NIT) return;
      
      try {
        setLoading(true);
        const response = await reservaServicio.obtenerPorEmpresa(user.NIT);
        if (response.data.success && response.data.data) {
          // Filtrar solo las reservas pendientes
          const reservasPendientes = response.data.data.filter(
            reserva => reserva.estado === 'Pendiente'
          );
          setReservas(reservasPendientes);
        }
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarReservas();
  }, [user?.NIT]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-10 lg:px-30">
      <div className="bg-green-700 p-6 text-white rounded-t-lg">
        <h2 className="font-bold text-center text-xl">RESERVAS PENDIENTES</h2>
        <p className="text-center p-3 text-sm">Reservas que han hecho tus clientes y aún no finalizan</p>
      </div>

      <main className="">
        <div className="bg-white rounded-lg shadow-lg p-6 px-10">
          {reservas.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No hay reservas pendientes.</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {reservas.map((reserva) => (
                <div
                  key={reserva.id}
                  className="bg-slate-100 rounded-lg shadow p-5 flex flex-col gap-2 border border-[#b2dfdb]"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-[#003044]">{reserva.cliente}</h2>
                    </div>
                    <div className=''>
                      <span className="text-green-500 rounded-md text-sm font-bold">
                        {reserva.estado}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{reserva.cancha}</p>
                  <div className="flex gap-4 text-sm text-gray-700">
                    <div>
                      <span className="font-medium">Fecha:</span> {reserva.fecha}
                    </div>
                    <div>
                      <span className="font-medium">Hora:</span> {reserva.hora}
                    </div>
                  </div>
                  <button
                    className="mt-2 py-1 px-4 self-end text-white bg-[#003344] rounded-sm text-sm font-medium cursor-pointer"
                    onClick={() => setReservaSeleccionada(reserva)}
                  >
                    Ver detalles
                  </button>
                </div>
              ))}
            </div>
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
              <span className="font-medium">Nombre:</span> {reservaSeleccionada.cliente}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservasPendientes;