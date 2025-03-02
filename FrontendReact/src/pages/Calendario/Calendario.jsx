import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./Calendario.css";
import "react-datepicker/dist/react-datepicker.css";

const redondearSiguienteHora = (date) => {
  const nuevaFecha = new Date(date);

  nuevaFecha.setMinutes(0, 0, 0);

  nuevaFecha.setHours(nuevaFecha.getHours() + 1);

  return nuevaFecha;
};

const Calendario = () => {
  const [reservasActivas, setReservasActivas] = useState([]);
  const [reserva, setReserva] = useState({
    fecha: new Date(),
    horaInicio: redondearSiguienteHora(new Date()),
    horaFinal: redondearSiguienteHora(
      new Date(new Date().setHours(new Date().getHours() + 1))
    ),
  });

  const handleDateChange = (date, field) => {
    setReserva((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  useEffect(() => {
    const fechasDeshabilitadas = [
      new Date(2025, 2, 15),
      new Date(2025, 2, 20),
      new Date(),
    ];
    setReservasActivas(fechasDeshabilitadas);
    console.log(fechasDeshabilitadas);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[320px] p-3 rounded-lg bg-gray-300 flex flex-col items-center">
        <p>Fecha: {reserva.fecha.toLocaleDateString()}</p>
        <p>Inicio: {reserva.horaInicio.toLocaleTimeString()}</p>
        <p>Fin: {reserva.horaFinal.toLocaleTimeString()}</p>
        <DatePicker
          selected={reserva.fecha}
          startDate={reserva.fecha}
          onChange={(date) => handleDateChange(date, "fecha")}
          selectsDisabledDaysInRange
          minDate={new Date()}
          inline
          excludeDates={reservasActivas}
        />
        <div className="flex justify-between gap-2 pt-8 text-sm">
          <div className="flex gap-2">
            <span>Desde</span>

            <DatePicker
              selected={reserva.horaInicio}
              onChange={(date) => handleDateChange(date, "horaInicio")}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Hora"
              dateFormat="h:mm aa"
              onKeyDown={(e) => e.preventDefault()}
              className="w-20 bg-gray-200 rounded-lg  px-2 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex gap-2">
              <span>Hasta</span>
              <DatePicker
                selected={reserva.horaFinal}
                onChange={(date) => handleDateChange(date, "horaFinal")}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Hora"
                dateFormat="h:mm aa"
                onKeyDown={(e) => e.preventDefault()}
                className="w-20 bg-gray-200 rounded-lg px-2 cursor-pointer border-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendario;
