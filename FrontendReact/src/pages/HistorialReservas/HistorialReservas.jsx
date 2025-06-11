import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../Provider/AuthProvider";
import {
  calendar,
  clock,
  football,
  gps,
  money,
} from "../../assets/IconosSVG/iconos";
import { reservaServicio } from "../../services/api";

const HistorialReservas = () => {
  const { user } = useAuth();

  // Estados principales
  const [mostrar, setmostrar] = useState(false);
  const [BuscarTerm, setBuscarTerm] = useState("");
  const [reservaFiltrada, setReservaFiltrada] = useState([]);
  const [historialReservas, setHistorialReservas] = useState([]);
  const [TextoBoton, setTextoBoton] = useState("Ordenar");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estados para el modal de reseña
  const [mostrarModalResena, setMostrarModalResena] = useState(false);
  const [reservaParaResenar, setReservaParaResenar] = useState(null);
  const [enviandoResena, setEnviandoResena] = useState(false);

  // Estados del formulario de reseña
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [calificacionHover, setCalificacionHover] = useState(0);

  // Referencias para detectar clics fuera del menú desplegable
  const mostrarRef = useRef(null);
  const buttonRef = useRef(null);

  // Estados para mostrar más/menos reservas
  const [reservasMostradas, setReservasMostradas] = useState(5); // Inicialmente mostrar 5
  const [mostrarTodas, setMostrarTodas] = useState(false);

  // Cargar historial de reservas desde el backend
  useEffect(() => {
    const cargarHistorialReservas = async () => {
      try {
        setCargando(true);

        if (!user?.uid) {
          console.log("No hay usuario autenticado");
          setCargando(false);
          return;
        }

        // Llamada al backend para obtener reservas completadas/pasadas
        const response = await reservaServicio.obtenerHistorialReservas(
          user?.uid
        );
        console.log("Respuesta historial:", response.data);

        if (response.data && response.data.success) {
          const reservasCompletadas = response.data.data || [];
          setHistorialReservas(reservasCompletadas);
          setReservaFiltrada(reservasCompletadas);
          console.log("Historial de reservas:", reservasCompletadas);
        } else {
          throw new Error("No se pudo cargar el historial de reservas");
        }
      } catch (error) {
        console.error("Error al cargar historial:", error);
        setError("No se pudo cargar el historial de reservas");
      } finally {
        setCargando(false);
      }
    };

    if (user?.uid) {
      cargarHistorialReservas();
    }
  }, [user]);

  // Función para manejar la búsqueda
  const ManejarBusqueda = (e) => {
    const value = e.target.value;
    setBuscarTerm(value);

    if (value.length === 0) {
      setReservaFiltrada(historialReservas);
    } else {
      const filtro = historialReservas.filter((reserva) => {
        const nombreCancha = obtenerNombreEmpresa(reserva).toLowerCase();
        const direccion = obtenerDireccionEmpresa(reserva).toLowerCase();
        return (
          nombreCancha.includes(value.toLowerCase()) ||
          direccion.includes(value.toLowerCase())
        );
      });
      setReservaFiltrada(filtro);
    }
  };

  // Función para alternar la visibilidad del menú desplegable
  const mostraropciones = () => {
    setmostrar(!mostrar);
  };

  // Función para ordenar las reservas de más antigua a más reciente
  const MasAntiguo = () => {
    const OrdenAntiguo = [...reservaFiltrada].sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );
    setReservaFiltrada(OrdenAntiguo);
    setmostrar(false);
    setTextoBoton("Más Antiguas");
  };

  // Función para ordenar las reservas de más reciente a más antigua
  const Masrecientes = () => {
    const OrdenReciente = [...reservaFiltrada].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
    setReservaFiltrada(OrdenReciente);
    setmostrar(false);
    setTextoBoton("Más Recientes");
  };

  // Función para formatear la fecha
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "No disponible";

    try {
      const fecha = new Date(fechaStr);

      if (isNaN(fecha.getTime())) {
        console.error("Fecha inválida:", fechaStr);
        return "Fecha inválida";
      }

      return fecha.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });
    } catch (e) {
      console.error("Error al formatear fecha:", e);
      return `Error: ${fechaStr}`;
    }
  };

  // Función para formatear la hora
  const formatearHora = (fechaHoraStr) => {
    if (!fechaHoraStr) return "--:--";

    try {
      let fechaHora = fechaHoraStr;
      if (typeof fechaHoraStr === "string" && fechaHoraStr.length <= 8) {
        fechaHora = `2000-01-01T${fechaHoraStr}`;
      }

      const fecha = new Date(fechaHora);

      if (isNaN(fecha.getTime())) {
        console.error("Hora inválida:", fechaHoraStr);
        return fechaHoraStr;
      }

      return fecha.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      console.error("Error al formatear hora:", e);
      return fechaHoraStr;
    }
  };

  // Función para obtener el nombre de la empresa
  const obtenerNombreEmpresa = (reserva) => {
    if (reserva.empresa?.nombre) {
      return reserva.empresa.nombre;
    }

    if (reserva.cancha?.nombre) {
      return reserva.cancha.nombre;
    }

    return "Cancha";
  };

  // Función para obtener la dirección de la empresa
  const obtenerDireccionEmpresa = (reserva) => {
    if (reserva.empresa?.direccion) {
      return reserva.empresa.direccion;
    }

    return "Ubicación no disponible";
  };

  // Función para abrir el modal de reseña
  const abrirModalResena = (reserva) => {
    setReservaParaResenar(reserva);
    setCalificacion(reserva.resena?.calificacion || 0);
    setComentario(reserva.resena?.comentario || "");
    setMostrarModalResena(true);
  };

  // Función para cerrar el modal de reseña
  const cerrarModalResena = () => {
    setMostrarModalResena(false);
    setReservaParaResenar(null);
    setCalificacion(0);
    setComentario("");
    setCalificacionHover(0);
  };

  // Función para enviar la reseña
  const enviarResena = async () => {
    if (calificacion === 0) {
      alert("Por favor, selecciona una calificación");
      return;
    }

    if (comentario.trim().length < 10) {
      alert("Por favor, escribe un comentario de al menos 10 caracteres");
      return;
    }

    try {
      setEnviandoResena(true);

      const datosResena = {
        id_reserva: reservaParaResenar.id_reserva || reservaParaResenar.id,
        id_usuario: user.uid,
        calificacion: calificacion,
        comentario: comentario.trim(),
        fecha_resena: new Date().toISOString(),
      };

      // Llamada al backend para guardar la reseña
      const response = await reservaServicio.crearResena(datosResena);

      if (response.data && response.data.success) {
        // Actualizar la reserva local con la nueva reseña
        const reservasActualizadas = historialReservas.map((reserva) => {
          if (
            (reserva.id_reserva || reserva.id) ===
            (reservaParaResenar.id_reserva || reservaParaResenar.id)
          ) {
            return {
              ...reserva,
              resena: {
                calificacion: calificacion,
                comentario: comentario.trim(),
                fecha_resena: new Date().toISOString(),
              },
            };
          }
          return reserva;
        });

        setHistorialReservas(reservasActualizadas);
        setReservaFiltrada(
          reservasActualizadas.filter((reserva) => {
            if (BuscarTerm.length === 0) return true;
            const nombreCancha = obtenerNombreEmpresa(reserva).toLowerCase();
            const direccion = obtenerDireccionEmpresa(reserva).toLowerCase();
            return (
              nombreCancha.includes(BuscarTerm.toLowerCase()) ||
              direccion.includes(BuscarTerm.toLowerCase())
            );
          })
        );

        alert("¡Reseña enviada exitosamente!");
        cerrarModalResena();
      } else {
        throw new Error("No se pudo enviar la reseña");
      }
    } catch (error) {
      console.error("Error al enviar reseña:", error);
      alert("Error al enviar la reseña. Por favor, inténtalo de nuevo.");
    } finally {
      setEnviandoResena(false);
    }
  };
  // Función para mostrar más o menos reservas
  const alternarMostrarReservas = () => {
    if (mostrarTodas) {
      setReservasMostradas(5);
      setMostrarTodas(false);
    } else {
      setReservasMostradas(reservaFiltrada.length);
      setMostrarTodas(true);
    }
  };

  // Efecto para detectar clics fuera del menú desplegable
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mostrarRef.current &&
        !mostrarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setmostrar(false);
      }
    };

    if (mostrar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mostrar]);

  // Renderizado del componente de estrellas
  const EstrellaCalificacion = ({
    indice,
    calificacionActual,
    onHover,
    onClick,
    readOnly = false,
  }) => {
    const estaLlena = indice <= calificacionActual;

    return (
      <button
        type="button"
        disabled={readOnly}
        className={`text-2xl transition-colors duration-200 ${
          readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
        } ${estaLlena ? "text-yellow-400" : "text-gray-300"}`}
        onMouseEnter={() => !readOnly && onHover && onHover(indice)}
        onMouseLeave={() => !readOnly && onHover && onHover(0)}
        onClick={() => !readOnly && onClick && onClick(indice)}
      >
        ★
      </button>
    );
  };

  return (
    <div className="min-h-screen w-screen py-8 px-30 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-5xl mx-auto rounded-lg bg-white pb-10 shadow-lg">
        {/* Header Section */}
        <div className="text-center mb-3 bg-[#003044] rounded-t-lg p-10 ">
          <h1 className="text-2xl font-bold text-white mb-2">
            Historial de Reservas
          </h1>
          <p className="text-gray-100 text-sm">
            Revisa tus reservas pasadas y comparte tu experiencia
          </p>
        </div>
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl mt-5 mb-8 mx-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                id="buscador"
                onChange={ManejarBusqueda}
                value={BuscarTerm}
                name="Buscar"
                placeholder="Buscar por nombre de cancha o ubicación..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-400 focus:border-[#00c951] focus:ring-2 focus:ring-[#00c951] transition-all duration-300 outline-none"
              />
              {/* Filter Button */}
              <div className="absolute right-0 top-0">
                <button
                  ref={buttonRef}
                  onClick={mostraropciones}
                  className="flex items-center justify-center px-6 py-3 bg-[#00c951] text-white rounded-r-lg hover:bg-[#00a844] transition-all duration-300 gap-2 min-w-[160px]"
                >
                  <span>{TextoBoton}</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
  
                {mostrar && (
                  <div
                    ref={mostrarRef}
                    className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-20 min-w-[160px] border border-gray-100"
                  >
                    <button
                      className="w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
                      onClick={Masrecientes}
                    >
                      Más recientes
                    </button>
                    <button
                      className="w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
                      onClick={MasAntiguo}
                    >
                      Más antiguos
                    </button>
                  </div>
                )}
              </div>
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              
            </div>

          </div>
        </div>

        {/* Loading, Error, or Reservations List */}
        {cargando ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {error}
          </div>
        ) : reservaFiltrada.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg text-gray-600">
              Aún no tienes reservas pasadas
            </p>
          </div>
        ) : (
          <div className="space-y-4 mx-10">
            {reservaFiltrada
              .slice(0, reservasMostradas)
              .map((reserva, index) => (
                <div
                  key={reserva.id_reserva || reserva.id || index}
                  className="bg-gray-50 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-all duration-300 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                      {/* Field Info */}
                      <div className="flex items-center space-x-4 md:col-span-2">
                        <div className="w-13 h-13 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {obtenerNombreEmpresa(reserva).charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-[#003044]">
                            {obtenerNombreEmpresa(reserva)}
                          </h3>
                          <p className="text-gray-600 text-sm flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {obtenerDireccionEmpresa(reserva)}
                          </p>
                        </div>
                      </div>

                      {/* Date and Time */}
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 text-gray-700 text-sm">
                          <svg
                            className="w-4 h-4 text-[#00c951]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{formatearFecha(reserva.fecha)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700 text-sm">
                          <svg
                            className="w-4 h-4 text-[#00c951]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>
                            {formatearHora(
                              reserva.hora_inicio || reserva.horaInicio
                            )}{" "}
                            -{" "}
                            {formatearHora(
                              reserva.hora_final || reserva.horaFin
                            )}
                          </span>
                        </div>
                        
                      </div>

                      {/* Review Section */}
                      <div className="flex flex-col items-center space-y-3">
                        <p className="text-lg font-semibold text-[#00c951]">
                          Total: $
                          {reserva.cancha?.precio ||
                            reserva.total ||
                            reserva.monto ||
                            "0.00"}
                        </p>
                        {reserva.resena ? (
                          <div className="text-center">
                            <div className="flex justify-center mb-2">
                              {[1, 2, 3, 4, 5].map((estrella) => (
                                <EstrellaCalificacion
                                  key={estrella}
                                  indice={estrella}
                                  calificacionActual={
                                    reserva.resena.calificacion
                                  }
                                  readOnly={true}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">
                              Ya has calificado
                            </p>
                            <button
                              onClick={() => abrirModalResena(reserva)}
                              className="text-xs text-[#00c951] hover:underline mt-1 cursor-pointer"
                            >
                              Ver/Editar reseña
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => abrirModalResena(reserva)}
                            className="bg-[#003044] text-white px-4 py-2 rounded-lg hover:bg-[#203c48] transition-colors text-sm font-medium cursor-pointer"
                          >
                            Escribir Reseña
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {/* Botón para mostrar más o menos reservas */}
            {reservaFiltrada.length > 5 && (
              <div className="text-center mt-8">
                <button
                  onClick={alternarMostrarReservas}
                  className="bg-[#1a6079] text-white px-6 py-3 rounded-lg hover:bg-[#145066] transition-all duration-300 font-medium cursor-pointer"
                >
                  {mostrarTodas
                    ? "Mostrar menos"
                    : `Mostrar más (${reservaFiltrada.length - 5} restantes)`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de Reseña */}
      {mostrarModalResena && reservaParaResenar && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-[#36363695] backdrop-blur-sm"
            onClick={cerrarModalResena}
          ></div>

          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto z-10 relative">
            {/* Header */}
            <div className="bg-[#00c951] p-6 text-white rounded-t-lg">
              <h3 className="text-xl font-bold">Califica tu experiencia</h3>
              <p className="text-sm opacity-90 mt-1">
                {obtenerNombreEmpresa(reservaParaResenar)}
              </p>

              <button
                className="absolute top-4 right-4 text-white hover:text-gray-200 cursor-pointer"
                onClick={cerrarModalResena}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Información de la reserva */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{formatearFecha(reservaParaResenar.fecha)}</span>
                  <span>
                    {formatearHora(
                      reservaParaResenar.hora_inicio ||
                        reservaParaResenar.horaInicio
                    )}{" "}
                    -{" "}
                    {formatearHora(
                      reservaParaResenar.hora_final ||
                        reservaParaResenar.horaFin
                    )}
                  </span>
                </div>
              </div>

              {/* Calificación con estrellas */}
              <div className="text-center mb-6">
                <h4 className="font-medium text-gray-700 mb-4">
                  ¿Cómo fue tu experiencia?
                </h4>
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((estrella) => (
                    <EstrellaCalificacion
                      key={estrella}
                      indice={estrella}
                      calificacionActual={calificacionHover || calificacion}
                      onHover={setCalificacionHover}
                      onClick={setCalificacion}
                    />
                  ))}
                </div>
                {calificacion > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {calificacion === 1 && "Muy malo"}
                    {calificacion === 2 && "Malo"}
                    {calificacion === 3 && "Regular"}
                    {calificacion === 4 && "Bueno"}
                    {calificacion === 5 && "Excelente"}
                  </p>
                )}
              </div>

              {/* Comentario */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuéntanos sobre tu experiencia
                </label>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Describe cómo fue tu experiencia en esta cancha..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00c951] focus:border-[#00c951] resize-none"
                  rows="4"
                  maxLength="500"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  {comentario.length}/500 caracteres
                </p>
              </div>

              {/* Botones */}
              <div className="flex space-x-3">
                <button
                  onClick={cerrarModalResena}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={enviarResena}
                  disabled={enviandoResena || calificacion === 0}
                  className="flex-1 px-4 py-2 bg-[#00c951] text-white rounded-lg hover:bg-[#00a844] cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enviandoResena ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2 "></div>
                      Enviando...
                    </div>
                  ) : reservaParaResenar.resena ? (
                    "Actualizar Reseña"
                  ) : (
                    "Enviar Reseña"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default HistorialReservas;