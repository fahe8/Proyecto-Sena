import React, { useState } from 'react';

const reservasEjemplo = [
  {
    id: 1,
    cliente: 'Juan Pérez',
    cancha: 'Cancha 1',
    fecha: '2025-05-14',
    hora: '18:00',
    telefono: '3001234567',
    email: 'juanperez@email.com',
    estado: 'Pendiente',
  },
  {
    id: 2,
    cliente: 'Ana Gómez',
    cancha: 'Cancha 2',
    fecha: '2025-05-14',
    hora: '20:00',
    telefono: '3019876543',
    email: 'anagomez@email.com',
    estado: 'Pendiente',
  },
];

const ReservasPendientes = () => {
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <header className="w-full h-20 flex justify-between items-center bg-[#003044] text-white px-8 md:px-20">
        <div className="flex items-center gap-2">
          <div className="bg-amber-200 rounded-full w-10 h-10 flex items-center justify-center font-bold text-[#003044]">
            L
          </div>
          <p>Leider Alfonso</p>
        </div>
        {/* <h2 className="text-lg font-semibold">Reservas Pendientes</h2> */}
      </header>

      <main className="px-4 md:px-20 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-[#003044]">Reservas próximas</h1>
          {reservasEjemplo.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No hay reservas pendientes.</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {reservasEjemplo.map((reserva) => (
                <div
                  key={reserva.id}
                  className="bg-[#e5fff2] rounded-lg shadow p-5 flex flex-col gap-2 border border-[#b2dfdb]"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-[#003044]">{reserva.cliente}</h2>
                      <p className="text-sm text-gray-600">{reserva.cancha}</p>
                    </div>
                    <div className=''>
                      <span className=" bg-green-500 text-white px-3 py-1 rounded-md text-xs font-bold">
                        {reserva.estado}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-700">
                    <div>
                      <span className="font-medium">Fecha:</span> {reserva.fecha}
                    </div>
                    <div>
                      <span className="font-medium">Hora:</span> {reserva.hora}
                    </div>
                  </div>
                  <button
                    className="mt-2 self-end text-[#003044] hover:underline text-sm font-medium"
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
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
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