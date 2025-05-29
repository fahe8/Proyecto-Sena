import React, { useState, useEffect } from 'react';

// Simulación de reservas pasadas (reemplaza por tu fetch real)
const reservasEjemplo = [
  {
    id: 1,
    cliente: 'Juan Pérez',
    cancha: 'Cancha 1',
    fecha: '2025-05-10',
    hora: '18:00',
    telefono: '3001234567',
    email: 'juanperez@email.com',
    comentario: 'Todo excelente, volveré pronto.',
    rating: 5,
    monto: "90.000",
  },
  {
    id: 2,
    cliente: 'Ana Gómez',
    cancha: 'Cancha 2',
    fecha: '2025-05-09',
    hora: '20:00',
    telefono: '3019876543',
    email: 'anagomez@email.com',
    comentario: 'Buen servicio, pero faltó iluminación.',
    rating: 4,
    monto: "120.000",
  },
];

const ReservasPasadas = () => {
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    // Aquí se debe hacer la petición real al backend
    setReservas(reservasEjemplo);
  }, []);

  return (
    <div className=" min-h-screen w-full bg-gray-100 overflow-x-hidden">
      <nav className="bg-[#003950] shadow-lg p-4 sm:p-6">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-15 py-[4px]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative">
                <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-green-500 flex items-center justify-center border-2 sm:border-3 border-white">
                  <span className="text-white text-lg sm:text-2xl font-bold">L</span>
                </div>
              </div>
              <div className="text-white text-center sm:text-left">
                <h2 className="text-xl sm:text-lg font-bold">Canchas La 64</h2>
                <p className="text-lg sm:text-sm font-sans">Leider Rodriguez</p>
              </div>
            </div>
           
          </div>
        </div>
      </nav>

      <div className="w-full max-w-5xl mx-auto py-3 sm:py-5 px-3 sm:px-0">
        <div className="bg-white rounded-lg shadow-lg flex-grow px-10 md:px-6 py-8">
          <h2 className="text-xl sm:text-lg font-bold mb-3 sm:mb-4 pb-2 sm:pb-2.5 font-sans">
            Historial de reservas
          </h2>

          {reservas.length === 0 ? (
            <p className="text-center text-black text-xl sm:text-2xl p-3 sm:p-5">
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
                      <h3 className="font-bold text-[#003044] text-lg">{reserva.cliente}</h3>
                      <p className="text-sm text-gray-600">{reserva.cancha}</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <span className="">★</span>
                      <span>{reserva.rating}</span>
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
            <div className="mb-2">
              <span className="font-medium">Comentario:</span> {reservaSeleccionada.comentario}
            </div>
            <div className="mb-2 flex items-center gap-1">
              <span className="font-medium">Calificación:</span>
              <span className="text-[#003044]">★</span>
              <span>{reservaSeleccionada.rating}</span>
            </div>
            <div className="mb-2">
              <span className="font-medium">Monto cancelado</span> {reservaSeleccionada.monto}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservasPasadas;