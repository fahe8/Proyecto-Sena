import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./Calendario.css";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, format, isEqual, isAfter } from "date-fns";
import { es } from "date-fns/locale";

const redondearSiguienteHora = (date) => {
  const nuevaFecha = new Date(date);
  nuevaFecha.setMinutes(0, 0, 0);
  nuevaFecha.setHours(nuevaFecha.getHours() + 1);
  return nuevaFecha;
};

// Tarifas de canchas
const canchas = [
  { tipo: "Fútbol 5", precio: "80000" },
  { tipo: "Fútbol 6", precio: "85000" },
  { tipo: "Fútbol 7", precio: "90000" },
  { tipo: "Fútbol 9", precio: "180000" },
  { tipo: "Fútbol 11", precio: "180000" },
];

// Reservas no disponibles como debe llegar desde el backend
const reservasNoDisponibles = [
  {
    fecha: "2025-03-13",
    horaInicio: "2025-03-13 06:00:00",
    horaFinal: "2025-03-13 09:59:00",
  },
  {
    fecha: "2025-03-13",
    horaInicio: "2025-03-13 11:00:00",
    horaFinal: "2025-03-13 11:59:00",
  },
  {
    fecha: "2025-03-13",
    horaInicio: "2025-03-13 15:00:00",
    horaFinal: "2025-03-13 17:59:00",
  },
  {
    fecha: "2025-03-13",
    horaInicio: "2025-03-13 09:00:00",
    horaFinal: "2025-03-13 12:59:00",
  },
  {
    fecha: "2025-03-12",
    horaInicio: "2025-03-12 09:00:00",
    horaFinal: "2025-03-12 12:59:00",
  },
  {
    fecha: "2025-03-12",
    horaInicio: "2025-03-12 13:00:00",
    horaFinal: "2025-03-12 15:59:00",
  },
];

const Calendario = () => {
  const [reservasActivas, setReservasActivas] = useState({});
  const [reserva, setReserva] = useState({
    fecha: new Date(),
    horaInicio: redondearSiguienteHora(new Date()),
    horaFinal: redondearSiguienteHora(
      new Date(new Date().setHours(new Date().getHours() + 1))
    ),
  });

  const [mostrarTiposCancha, setMostrarTiposCancha] = useState(false);
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(canchas[0]);

  const handleDateChange = (date, field) => {
    setReserva((prev) => ({ ...prev, [field]: date }));
  };

  function obtenerFechasEntre(inicio, final) {
    const fechas = [];
    let fechaInicio = new Date(inicio);
    const fechaFinal = new Date(final);

    while (fechaInicio <= fechaFinal) {
      fechas.push(new Date(fechaInicio));
      fechaInicio.setHours(fechaInicio.getHours() + 1);
    }

    return fechas;
  }

  useEffect(() => {
    const horasAgrupadas = {};
    reservasNoDisponibles.forEach(({ fecha, horaInicio, horaFinal }) => {
      if (!horasAgrupadas[fecha]) {
        horasAgrupadas[fecha] = { horasInicio: [], horasFinal: [] };
      }

      const todasHorasInicio = obtenerFechasEntre(horaInicio, horaFinal);

      horasAgrupadas[fecha].horasInicio.push(...todasHorasInicio);
      horasAgrupadas[fecha].horasFinal.push(new Date(horaFinal));
    });

    setReservasActivas(horasAgrupadas);
  }, []);

  const buscarHorasPorFecha = (fecha) => {
    const fechaStr = format(new Date(fecha), "yyyy-MM-dd");
    return reservasActivas[fechaStr]?.horasInicio || [];
  };

  return (
    <div className="flex flex-col">
      <div className="p-3 rounded-lg shadow-2xl flex flex-col gap-2">
        <DatePicker
          selected={reserva.fecha}
          onChange={(date) => handleDateChange(date, "fecha")}
          minDate={new Date()}
          locale={es}
          inline
        />

        <div className="w-full flex justify-between gap-2 text-sm">
          <div className=" w-[130px] md:w-[160px] flex items-center gap-2">
            <span>Desde:</span>
            <div className="relative">
              <DatePicker
                selected={reserva.horaInicio}
                onChange={(date) => handleDateChange(date, "horaInicio")}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                locale={es}
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                excludeTimes={buscarHorasPorFecha(reserva.fecha)}
                className="w-20 border rounded-lg px-2 py-2 cursor-pointer"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 absolute top-1/2 right-2 -translate-y-1/2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>

          <div className="w-[130px] md:w-[160px] flex items-center gap-2">
            <span>Hasta:</span>
            <div className="relative">
              <DatePicker
                selected={reserva.horaFinal}
                onChange={(date) => handleDateChange(date, "horaFinal")}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                locale={es}
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                excludeTimes={buscarHorasPorFecha(reserva.fecha)}
                className="w-20 border rounded-lg px-2 py-2 cursor-pointer"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 absolute top-1/2 right-2 -translate-y-1/2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          className="relative w-auto self-start bg-green-300 rounded-2xl px-4 pt-2 pb-1 text-sm flex gap-4 cursor-pointer"
          onClick={() => setMostrarTiposCancha((prev) => !prev)}
        >
          <p>{canchaSeleccionada.tipo}</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>

          {mostrarTiposCancha && (
            <ul className="absolute right-0 mt-6 w-28 bg-white rounded-lg shadow-lg max-h-[120px] overflow-y-auto">
              {canchas.map((cancha, index) => (
                <li
                  key={index}
                  className="hover:bg-gray-100 px-2 pt-1"
                  onClick={() => setCanchaSeleccionada(cancha)}
                >
                  {cancha.tipo}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p>Costo total: $ {canchaSeleccionada.precio} COP</p>
      </div>
    </div>
  );
};

export default Calendario;
