import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../Provider/AuthProvider";
import {
  Advertencia,
  Calendario,
  Cerrar,
  Gps,
  Lupa,
  OrdenarFlecha,
  Tiempo,
  StarIcon,
} from "../../assets/IconosSVG/iconos";
import { reservaServicio, resenaServicio } from "../../services/api";
import Loading from "../Login/components/Loading";
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
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [enviandoResena, setEnviandoResena] = useState(false);

  // Estados del formulario de reseña
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [calificacionHover, setCalificacionHover] = useState(0);

  // Referencias para detectar clics fuera del menú desplegable
  const mostrarRef = useRef(null);
  const buttonRef = useRef(null);

  // Estados para mostrar más/menos reservas
  const [reservasMostradas, setReservasMostradas] = useState(5);
  const [mostrarTodas, setMostrarTodas] = useState(false);

  // Cargar historial de reservas y verificar reseñas
  useEffect(() => {
    const cargarHistorialYVerificarResenas = async () => {
        try {
            setCargando(true);

            if (!user?.id) {
                console.log("No hay usuario autenticado");
                setCargando(false);
                return;
            }

            // Obtener historial de reservas
            const response = await reservaServicio.obtenerHistorialReservas(user.id);
            console.log("Respuesta historial:", response.data);

            if (response.data && response.data.success) {
                const reservasCompletadas = response.data.data || [];
                
                // Verificar reseñas para cada reserva
                const reservasConEstadoResena = await Promise.all(
                    reservasCompletadas.map(async (reserva) => {
                      console.log(reserva)
                        try {
                            // Usar los parámetros correctos para la verificación
                            const resenaResponse = await resenaServicio.verificarResenaUsuario(
                                reserva.id_reserva,
                                user.id
                            );
                            console.log('resenaResponse:', resenaResponse.data)
                            return {
                                ...reserva,
                                tiene_resena: resenaResponse.data.tiene_resena || false,
                                resena_data: resenaResponse.data.resena || null
                            };
                        } catch (error) {
                            console.error(`Error verificando reseña para reserva ${reserva.id_reserva}:`, error);
                            return {
                                ...reserva,
                                tiene_resena: false,
                                resena_data: null
                            };
                        }
                    })
                );
                console.log(reservasConEstadoResena)
                setHistorialReservas(reservasConEstadoResena);
                setReservaFiltrada(reservasConEstadoResena);
            } else {
                throw new Error("No se pudieron cargar las reservas");
            }
        } catch (error) {
            console.error("Error al cargar historial:", error);
            setError("No se pudieron cargar las reservas");
        } finally {
            setCargando(false);
        }
    };

    if (user?.id) {
        cargarHistorialYVerificarResenas();
    }
}, [user]);
// Función para manejar la creación de reseñas
const manejarEnvioResena = async () => {
    if (!reservaSeleccionada || calificacion === 0 || comentario.trim() === "") {
        alert("Por favor completa todos los campos");
        return;
    }

    try {
        setEnviandoResena(true);
      console.log(reservaSeleccionada.empresa?.NIT )
      console.log(reservaSeleccionada.NIT )
        const datosResena = {
            id_reserva: reservaSeleccionada.id_reserva,
            NIT: reservaSeleccionada.empresa?.NIT || reservaSeleccionada.NIT,
            comentario: comentario.trim(),
            calificacion: calificacion,
            usuario_id: user.id
        };

        const response = await resenaServicio.crear(datosResena);

        if (response.data.success) {
            // Actualizar el estado local
            setHistorialReservas(prev =>
                prev.map(reserva =>
                    reserva.id_reserva === reservaSeleccionada.id_reserva
                        ? { ...reserva, tiene_resena: true, resena_data: response.data.data }
                        : reserva
                )
            );
            
            setReservaFiltrada(prev =>
                prev.map(reserva =>
                    reserva.id_reserva === reservaSeleccionada.id_reserva
                        ? { ...reserva, tiene_resena: true, resena_data: response.data.data }
                        : reserva
                )
            );

            // Limpiar formulario y cerrar modal
            setCalificacion(0);
            setComentario("");
            setMostrarModalResena(false);
            setReservaSeleccionada(null);

            alert("¡Reseña enviada exitosamente!");
        } else {
            throw new Error(response.data.message || "Error al enviar la reseña");
        }
    } catch (error) {
        console.error("Error al enviar reseña:", error);
        
        if (error.response?.status === 409) {
            alert("Ya has creado una reseña para esta reserva");
        } else {
            alert("Error al enviar la reseña. Inténtalo de nuevo.");
        }
    } finally {
        setEnviandoResena(false);
    }
};
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
    console.log('reserva modal', reserva)
    setReservaSeleccionada(reserva);
    setCalificacion(reserva.resena?.calificacion || 0);
    setComentario(reserva.resena?.comentario || "");
    setMostrarModalResena(true);
  };

  // Función para cerrar el modal de reseña
  const cerrarModalResena = () => {
    setMostrarModalResena(false);
    setReservaSeleccionada(null);
    setCalificacion(0);
    setComentario("");
    setCalificacionHover(0);
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
    <div className="min-h-screen w-screen py-8 px-5 md:px-30 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-5xl mx-auto rounded-lg bg-white pb-10 shadow-lg">
        {/* encabezado */}
        <div className="text-center mb-3 bg-[#003044] rounded-t-lg p-10 ">
          <h1 className="text-2xl font-bold text-white mb-2">
            Historial de Reservas
          </h1>
          <p className="text-gray-100 text-sm">
            Revisa tus reservas pasadas y comparte tu experiencia
          </p>
        </div>
        {/* Sección de búsqueda y filtrado */}
        <div className="bg-white rounded-xl mt-5 mb-8 mx-1 sm:mx-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Entrada de búsqueda */}
            <div className="relative flex-1">
              <input
                id="buscador"
                onChange={ManejarBusqueda}
                value={BuscarTerm}
                name="Buscar"
                placeholder="Busca una cancha..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-400 focus:border-[#00c951] focus:ring-2 focus:ring-[#00c951] transition-all duration-300 outline-none"
              />
              {/* Botón de filtro */}
              <div className="absolute right-0 top-0">
                <button
                  ref={buttonRef}
                  onClick={mostraropciones}
                  className="flex items-center justify-center px-1 md:px-6 py-[15px] md:py-[14px] lg:py-[15px] bg-[#00c951] text-white rounded-r-lg hover:bg-[#00a844] transition-all duration-300 gap-2 min-w-15 cursor-pointer"
                >
                  <span className="hidden md:block">{TextoBoton}</span>
                  <OrdenarFlecha />
                </button>

                {mostrar && (
                  <div
                    ref={mostrarRef}
                    className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-20 min-w-[160px] border border-gray-100"
                  >
                    <button
                      className="w-full px-6 py-3 text-left hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                      onClick={Masrecientes}
                    >
                      Más recientes
                    </button>
                    <button
                      className="w-full px-6 py-3 text-left hover:bg-gray-200 transition-colors duration-200 cursor-pointer "
                      onClick={MasAntiguo}
                    >
                      Más antiguos
                    </button>
                  </div>
                )}
              </div>
              <Lupa />
            </div>
          </div>
        </div>

        {/* Lista de carga, errores o reservas*/}
        {cargando ? (
          <div className="flex justify-center items-center h-40">
            <Loading />
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {error}
          </div>
        ) : reservaFiltrada.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <Advertencia />
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
                      {/* Información de campo */}
                      <div className="flex items-center space-x-4 md:col-span-2">
                        <div className="w-13 h-13 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {obtenerNombreEmpresa(reserva).charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-[#003044]">
                            {obtenerNombreEmpresa(reserva)}
                          </h3>
                          <p className="text-gray-600 text-sm flex items-center gap-1">
                            <Gps />
                            {obtenerDireccionEmpresa(reserva)}
                          </p>
                        </div>
                      </div>

                      {/* Fecha y hora */}
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 text-gray-700 text-sm">
                          <Calendario />
                          <span>{formatearFecha(reserva.fecha)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700 text-sm">
                          <Tiempo />
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

                      {/* Sección de revisión */}
                      <div className="flex flex-col items-center space-y-3">
                        <p className="text-lg font-semibold text-[#00c951]">
                          Total: $
                          {reserva.cancha?.precio ||
                            reserva.total ||
                            reserva.monto ||
                            "0.00"}
                        </p>
                        {!reserva.tiene_resena ? (
                          <button
                            onClick={() => abrirModalResena(reserva)}
                            className="bg-[#003044] text-white px-4 py-2 rounded-lg hover:bg-[#001f2d] transition-colors duration-200 flex items-center gap-2"
                          >
                           
                            Escribir Reseña
                          </button>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2 text-green-600">
                              <span className="text-sm font-medium">Reseña enviada</span>
                            </div>
                            {reserva.resena_data && (
                              <div className="flex items-center gap-1">
                                <span className="flex text-xs gap-1 font-semibold text-gray-500">
                                  <StarIcon/> {reserva.resena_data.calificacion}
                                </span>
                              </div>
                            )}
                            <button
                              onClick={() => abrirModalResena(reserva)}
                              className="text-sm text-[#00c951] hover:underline cursor-pointer"
                            >
                              Ver reseña
                            </button>
                          </div>
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
                  className="bg-[#1a6079] text-white px-6 py-3 rounded-lg hover:bg-[#2a7089] transition-colors font-medium"
                >
                  {mostrarTodas ? "Ver menos" : "Ver más"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Modal de reseña */}
        {mostrarModalResena && (
          <div className="fixed inset-0 bg-[#36363695] backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#003044]">
                    {reservaSeleccionada?.resena ? "Editar Reseña" : "Escribir Reseña"}
                  </h2>
                  <button
                    onClick={cerrarModalResena}
                    className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                  >
                    <Cerrar />
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {obtenerNombreEmpresa(reservaSeleccionada)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {formatearFecha(reservaSeleccionada?.fecha)} -{" "}
                    {formatearHora(reservaSeleccionada?.hora_inicio)}
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Calificación
                  </label>
                  <div className="flex justify-center space-x-2">
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
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comentario
                  </label>
                  <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Comparte tu experiencia..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#00c951] focus:ring-2 focus:ring-[#00c951] transition-all duration-300 outline-none resize-none"
                    rows={4}
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {comentario.length}/500 caracteres
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={cerrarModalResena}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={manejarEnvioResena}  // Cambiar de enviarResena a manejarEnvioResena
                    disabled={enviandoResena || calificacion === 0}
                    className="flex-1 px-4 py-3 bg-[#00c951] text-white rounded-lg hover:bg-[#00a844] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    {enviandoResena ? "Enviando..." : "Enviar Reseña"}
                    </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default HistorialReservas;
