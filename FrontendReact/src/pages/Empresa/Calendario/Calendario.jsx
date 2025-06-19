import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./Calendario.css";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, format, isEqual, isAfter, isBefore, parseISO,} from "date-fns";
import { es } from "date-fns/locale";
import LogPopUp from "../../Login/components/logPopUp";
import ConfirmacionModal from "./ConfirmacionModal";
import { reservaServicio } from "../../../services/api";
import { useAuth } from "../../../Provider/AuthProvider";

const Calendario = ({ empresa }) => {
  // Función para redondear a la siguiente hora completa
  const redondearSiguienteHora = (fecha) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setMinutes(0, 0, 0);
    nuevaFecha.setHours(nuevaFecha.getHours() + 1);
    return nuevaFecha; 
  };
  
  //Convierte una hora en formato string (por ejemplo "08:00") a un objeto Date con esa hora
const obtenerHoraDesdeString = (horaStr) => {
  const [hora, minutos] = horaStr.split(":"); // Divide la cadena por los dos puntos → ["08", "00"]
  const date = new Date(); // Crea un nuevo objeto Date (con fecha actual)
  date.setHours(parseInt(hora), parseInt(minutos), 0, 0); // Establece la hora, minutos, segundos y milisegundos
  return date; // Devuelve el objeto Date con la hora ajustada
};

//Devuelve la hora de apertura de la empresa como objeto Date
const getMinHoraEmpresa = () => {
  if (!empresa?.horario.apertura) return new Date(0, 0, 0, 0, 0); // Si no hay hora, usar 00:00
  return obtenerHoraDesdeString(empresa.horario.apertura); // Convierte y retorna la hora de apertura
};

//Devuelve la hora de cierre de la empresa como objeto Date
const getMaxHoraEmpresa = () => {
  if (!empresa?.horario.cierre) return new Date(0, 0, 0, 23, 59); // Si no hay hora, usar 23:59
  return obtenerHoraDesdeString(empresa.horario.cierre); // Convierte y retorna la hora de cierre
};  


  const [reserva, setReserva] = useState({
    fecha: new Date(),
    horaInicio: redondearSiguienteHora(new Date()),
    horaFinal: redondearSiguienteHora(
      new Date(new Date().setHours(new Date().getHours() + 1))
    ),
  });

  const [reservasAgrupadas, setReservasAgrupadas] = useState({});
  const [mostrarTiposCancha, setMostrarTiposCancha] = useState(false);
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(
    empresa?.canchas[0] || null
  );
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [configPopUp, setConfigPopUp] = useState({
    mensaje: "",
    subTexto: "",
  });
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [infoReserva, setInfoReserva] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const obtenerReservas = async () => {
      setCanchaSeleccionada(empresa?.canchas[0]);
      try {
        const reservas = await reservaServicio.obtenerPorEmpresa(empresa?.NIT);
        const { data } = reservas.data;
        console.log(data);
        const fechasAgrupadasPorCancha = {};

        // data.filter((reserva) => (

        // ))

        data.forEach((reserva) => {
          if (!fechasAgrupadasPorCancha[reserva?.cancha?.id_tipo_cancha]) { 
            fechasAgrupadasPorCancha[reserva?.cancha?.id_tipo_cancha] = []; 
          }
        });
        console.log(fechasAgrupadasPorCancha);
      } catch (error) {
        if (error.response && error.response.data) { 
          console.log(error.response.data.message);
        }
        console.log(error);
      }
    };
    obtenerReservas();
  }, [empresa]);

  // Función para calcular la duración en horas entre dos fechas
  const calcularDuracionHoras = (inicio, fin) => {
    const duracionMs = new Date(fin) - new Date(inicio);
    return Math.round(duracionMs / (1000 * 60 * 60));
  };

  // Función para calcular el costo total
  const calcularCostoTotal = () => {
    const duracion = calcularDuracionHoras(
      reserva.horaInicio,
      reserva.horaFinal
    );
    return parseInt(canchaSeleccionada?.precio || 0) * duracion;
  };

  // Función para mostrar el modal de confirmación
  const mostrarModalConfirmacion = () => {
    // Validar que se haya seleccionado una cancha
    if (!canchaSeleccionada) {
      setMostrarPopUp(true);
      setConfigPopUp({
        mensaje: "Error",
        subTexto: "Por favor seleccione una cancha",
      });
      return;
    }

    // Validar que la hora final sea después de la hora inicial
    if (
      isEqual(reserva.horaInicio, reserva.horaFinal) ||
      isAfter(reserva.horaInicio, reserva.horaFinal)
    ) {
      setMostrarPopUp(true);
      setConfigPopUp({
        mensaje: "Error",
        subTexto: "La hora final debe ser posterior a la hora inicial",
      });
      return;
    }

    // Calcular duración y costo
    const duracion = calcularDuracionHoras(
      reserva.horaInicio,
      reserva.horaFinal
    );
    const costoTotal = calcularCostoTotal();

    // Preparar información para el modal
    setInfoReserva({
      fecha: format(reserva.fecha, "dd/MM/yyyy"),
      horario: `${format(reserva.horaInicio, "HH:mm")} a ${format(
        reserva.horaFinal,
        "HH:mm"
      )}`,
      duracion: `${duracion} ${duracion === 1 ? "hora" : "horas"}`,
      cancha: canchaSeleccionada.nombre,
      costoTotal: costoTotal,
    });

    // Mostrar modal de confirmación
    setMostrarConfirmacion(true);
  };

  const manejarReserva = async () => {
    try {
      // Formatear la fecha y horas según el formato requerido por la API
      const fechaFormateada = format(reserva.fecha, "yyyy-MM-dd");
      const horaInicioFormateada = format(reserva.horaInicio, "HH:mm:ss");
      const horaFinalFormateada = format(reserva.horaFinal, "HH:mm:ss");

      const reservaObj = {
        fecha: fechaFormateada,
        hora_inicio: horaInicioFormateada,
        hora_final: horaFinalFormateada,
        cancha_id: canchaSeleccionada.id,
        usuario_id: user?.id,
      };

      console.log('reservaobj', reservaObj)
      const crearReserva = await reservaServicio.crear(
        JSON.stringify(reservaObj)
      );

      if (crearReserva) {
        setMostrarPopUp(true);
        setConfigPopUp({
          mensaje: crearReserva.data.message,
          subTexto:
            "Pronto nos comunicaremos contigo para confirmar la reserva",
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message, error.response.data.data);
        const primeraClave = Object.keys(error.response.data.data)[0];
        const valor = error.response.data.data[primeraClave];
        setMostrarPopUp(true);
        setConfigPopUp({
          mensaje: "Error",
          subTexto: valor || "No se pudo crear la reserva",
        });
      }
      console.log(error);
    }
  };

  const manejarCambioFecha = (fecha, campo) => {
    if (campo === "fecha") {
      // Al cambiar la fecha del calendario, actualizar también las horas manteniendo las horas seleccionadas
      const nuevaHoraInicio = new Date(fecha);
      nuevaHoraInicio.setHours(
        reserva.horaInicio.getHours(),
        reserva.horaInicio.getMinutes(),
        0,
        0
      );

      const nuevaHoraFinal = new Date(fecha);
      nuevaHoraFinal.setHours(
        reserva.horaFinal.getHours(),
        reserva.horaFinal.getMinutes(),
        0,
        0
      );

      setReserva({
        fecha: fecha,
        horaInicio: nuevaHoraInicio,
        horaFinal: nuevaHoraFinal,
      });
    } else {
      // Si se cambia la hora de inicio o final, mantener la fecha seleccionada
      const nuevaFecha = new Date(reserva.fecha);
      nuevaFecha.setHours(fecha.getHours(), fecha.getMinutes(), 0, 0);
      setReserva((prev) => ({ ...prev, [campo]: nuevaFecha }));
    }
  };

  const manejarCierrePopUp = () => {
    // Lógica adicional después de cerrar el popup si es necesario
  };

  const manejarConfirmacion = (confirmado) => {
    setMostrarConfirmacion(false);
    if (confirmado) {
      manejarReserva();
    }
  };

  return (
    <div className="flex flex-col">
      {mostrarPopUp && (
        <LogPopUp
          setShowPopUp={setMostrarPopUp}
          message={configPopUp.mensaje}
          subText={configPopUp.subTexto}
          onClose={manejarCierrePopUp}
        />
      )}

      <ConfirmacionModal
        isOpen={mostrarConfirmacion}
        onClose={() => setMostrarConfirmacion(false)}
        onConfirm={() => {
          setMostrarConfirmacion(false);
          manejarReserva();
        }}
        reservaInfo={infoReserva}
      />

      <div className="p-3 rounded-lg shadow-2xl flex flex-col gap-2">
        <DatePicker
          selected={reserva.fecha}
          onChange={(fecha) => manejarCambioFecha(fecha, "fecha")}
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
                onChange={(fecha) => manejarCambioFecha(fecha, "horaInicio")}
                showTimeSelect
                showTimeSelectOnly 
                timeIntervals={60}
                locale={es}
                dateFormat="HH:mm" 
                timeFormat="HH:mm" 
                className="w-20 border rounded-lg px-2 py-2 cursor-pointer"
                minTime={getMinHoraEmpresa()}
                maxTime={getMaxHoraEmpresa()}
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
                onChange={(fecha) => manejarCambioFecha(fecha, "horaFinal")}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                locale={es}
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                className="w-20 border rounded-lg px-2 py-2 cursor-pointer"
                minTime={getMinHoraEmpresa()}
                maxTime={getMaxHoraEmpresa()}
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
          className="relative w-full self-start bg-green-300 rounded-2xl px-4 pt-2 pb-1 text-sm flex gap-4 cursor-pointer"
          onClick={() => setMostrarTiposCancha((prev) => !prev)}
        >
          <p>
            {canchaSeleccionada
              ? `${canchaSeleccionada.nombre} - ${canchaSeleccionada.tipo_cancha.tipo}`
              : "Seleccione una cancha"}
          </p>

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
            <ul className="absolute right-0 mt-6 w-full bg-white rounded-lg shadow-lg max-h-[120px] overflow-y-auto">
              {empresa?.canchas?.map((cancha, index) => (
                <li
                  key={index}
                  className="hover:bg-gray-100 px-2 py-2 text-center"
                  onClick={() => setCanchaSeleccionada(cancha)}
                >
                  {cancha.nombre} - {cancha.tipo_cancha.tipo}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-3">Costo total: $ {canchaSeleccionada?.precio || 0} COP</p>

        <button
          onClick={mostrarModalConfirmacion}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-3 transition-colors duration-300 cursor-pointer"
        >
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
};

export default Calendario;