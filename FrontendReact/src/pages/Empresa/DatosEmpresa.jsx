import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Header/Header";
import Calendario from "./Calendario/Calendario";
import { iconosServicios } from "../../utils/iconosServicios";
import insignia from "./imagen/insignia.png";
import { empresaServicio, reservaServicio } from "../../services/api";
import ImageGallery from "./galeria";

const Perfil = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para verificar si la empresa está abierta
  const [showMobileCalendar, setShowMobileCalendar] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Reemplazar el estado estático de reseñas con un estado vacío
  const [reviews, setReviews] = useState([]);
  // Estado para estadísticas de calificaciones
  const [ratingStats, setRatingStats] = useState({
    promedio: 0,
    total: 0,
    distribucion: {}
  });

  const [empresa, setEmpresa] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const obtenerEmpresa = async () => {
      if (id) {
        try {
          const empresa = await empresaServicio.obtenerPorId(id);   
          console.log(empresa.data.data); 
          setEmpresa(empresa.data.data);
          
          // Verificar si la empresa está abierta
          const ahora = new Date(); // Fecha actual
          const horaActual = ahora.getHours(); // Hora actual
          const minutosActuales = ahora.getMinutes(); // Minutos actuales
          const horaActualEnMinutos = horaActual * 60 + minutosActuales; // Hora actual en minutos

          const horaApertura = empresa.data.data.hora_apertura ?            
            parseInt(empresa.data.data.hora_apertura.split(':')[0]) * 60 + // Hora de apertura en minutos
            parseInt(empresa.data.data.hora_apertura.split(':')[1]) : 0; // Si no hay hora de apertura, se establece en 0

          const horaCierre = empresa.data.data.hora_cierre ? 
            parseInt(empresa.data.data.hora_cierre.split(':')[0]) * 60 + // Hora de cierre en minutos
            parseInt(empresa.data.data.hora_cierre.split(':')[1]) : 0; // Si no hay hora de cierre, se establece en 0

          setIsOpen(horaActualEnMinutos >= horaApertura && horaActualEnMinutos <= horaCierre); // Verificar si la empresa está abierta
          
          // Una vez que tenemos la empresa, obtenemos sus reseñas
          obtenerResenasEmpresa(empresa.data.data.NIT);
        } catch (error) {
          setEmpresa([]);
        }
      }
    };
    obtenerEmpresa();
  }, [id]);

  // Función para obtener las reseñas de la empresa
  const obtenerResenasEmpresa = async (nit) => {
    try {
      const response = await reservaServicio.obtenerResenasEmpresa(nit);
      if (response.data && response.data.success) {
        const resenasData = response.data.data;
        
        // Formatear las reseñas para que coincidan con la estructura esperada
        const resenasFormateadas = resenasData.resenas.map(resena => ({
          id: resena.id,
          name: resena.usuario ? `${resena.usuario.nombre} ${resena.usuario.apellido}` : "Usuario",
          date: new Date(resena.fecha_resena).toLocaleDateString(),
          fieldType: resena.cancha ? resena.cancha.tipo : "Cancha",
          rating: resena.calificacion,
          comment: resena.comentario
        }));
        
        setReviews(resenasFormateadas);
        
        // Actualizar estadísticas de calificaciones
        setRatingStats({
          promedio: resenasData.promedio_calificacion || 0,
          total: resenasData.total_resenas || 0,
          distribucion: resenasData.distribucion_calificaciones || {}
        });
      }
    } catch (error) {      
      console.error("Error al obtener reseñas:", error);
    }
  };

  const toggleOpenStatus = () => {
    setIsOpen(!isOpen);
  };

  const CanchasAgrupadas = useMemo(() => {
    if (!empresa?.canchas) return [];
    const counts = {};
    empresa.canchas.forEach((cancha) => {
      const tipo = cancha.id_tipo_cancha;
      if (!counts[tipo]) {
        counts[tipo] = { tipo, cantidad: 1 };
      } else {
        counts[tipo].cantidad += 1;
      }
    });
    return Object.values(counts);
  }, [empresa]);

  // Función para calcular el porcentaje de cada calificación
  const calcularPorcentajeCalificacion = (calificacion) => {
    if (!ratingStats.total || ratingStats.total === 0) return 0;
    const cantidad = ratingStats.distribucion[calificacion] || 0;
    return (cantidad / ratingStats.total) * 100;
  };

  return (
    <div className="min-h-screen bg-white ">
      {/* Encabezado de navegación */}
      <Header />

      {/* Contenedor padre principal con márgenes alineados al header */}
      <div className="container mx-auto px-4 py-6">
        {/* Primer contenedor: Info a la izquierda y calendario a la derecha */}
        <div className="flex flex-col md:flex-row gap-6 mb-6 lg:px-25">
          {/* Columna izquierda: Información del lugar (hasta valoración general) */}
          <div className="flex-1  lg:mr-15">
            <div>
              {/* Venue header */}
              <div className="flex flex-col sm:flex-row items-start mb-4">
                <div className="flex items-start mb-4 sm:mb-0"> 
                  <div className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-gray-600">🏟️</span> 
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-lg">{empresa?.nombre}</h2>
                    <div className="flex"></div>
                    <p className="text-sm text-gray-500">
                      {empresa?.direccion}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center ml-auto">
                  <div className="flex flex-col items-center text-xs mr-4">
                    <img src={insignia} alt="insignia" className="w-8" /> 
                    <p className="font-semibold">Preferido</p>
                  </div>

                  <div className="text-sm text-gray-600">
                    <div
                      className={`px-4 py-2 w-16 rounded-md text-sm ${ // Estilo del botón de apertura/cierre
                        isOpen ? "text-green-500" : "text-red-500" // Si la empresa está abierta, el texto es verde, si está cerrado, el texto es rojo
                      }`}
                    >
                      {isOpen ? "Abierto" : "Cerrado"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Carrusel - con tamaño más controlado */}
              <div className="mb-6">
                <ImageGallery images={empresa?.imagenes || []} />
              </div>

              {/* Información del empresario */}
              <div className="flex items-center mb-4">
                <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <span className="text-gray-600">👤</span>
                </div>
                <div>
                  <h3 className="font-medium">
                    Propietario:{" "}
                    {empresa?.propietario?.nombre +
                      " " +
                      empresa?.propietario?.apellido}{" "}
                  </h3>
                </div>
              </div>

              {/* Descripción de la empresa */}
              <p className="text-sm text-gray-700 mb-6">
                {empresa?.descripcion}
              </p>

              {/* Canchas disponibles */}
              <div className="mb-6 w-70">
                <h3 className="font-medium mb-2">Canchas disponibles:</h3>
                <div className="space-y-2">
                  {empresa?.tipos_cancha?.map((cancha, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between bg-gray-100 px-3 py-2 rounded-md"
                    >
                      <span className="text-sm">{cancha.tipo}</span>
                      <span className="text-sm text-gray-500">
                        ({cancha.cantidad})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="my-6" />

              {/* Servicios adicionales */}
              <div className="mb-6 w-70">
                <h3 className="font-medium mb-3">Servicios adicionales:</h3>
                <div className="flex flex-col gap-4">
                  {empresa?.servicios.map((servicio, index) => {
                    // Remove accents and convert to lowercase
                    const key = servicio.tipo
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLowerCase();
                    return (
                      <div className="flex items-center text-sm" key={index}>
                        <span className="mr-2">
                          {iconosServicios[key] && React.createElement(iconosServicios[key])}
                        </span>
                        <span>{servicio.tipo}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <hr className="my-6" />

              {/* Valoración general de usuarios */}
              <div className="flex items-center mb-3">
                <h3 className="font-medium mr-20">Valoración general:</h3>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1"></span>
                  <span className="font-medium mr-1.5">{ratingStats.promedio.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm ml-1">({ratingStats.total})</span>
                  <div className="bg-black w-[1px] h-10 mx-5 "></div>
                  <div className="  py-1 rounded-md text-[18px] text-center">
                    {reviews.length}{" "}
                    <p className="text-[13px] underline "> Reseñas </p>
                  </div>
                </div>
              </div>
              <div className="w-70">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">5</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${calcularPorcentajeCalificacion(5)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">4</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${calcularPorcentajeCalificacion(4)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">3</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${calcularPorcentajeCalificacion(3)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">2</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${calcularPorcentajeCalificacion(2)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">1</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${calcularPorcentajeCalificacion(1)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: Calendario - Oculto en móvil */}
          <div className="hidden md:block ">
            <div className="sticky top-26">
              <Calendario empresa={empresa} />
            </div>
          </div>
        </div>

        {/* Segundo contenedor Opiniones de usuarios (ancho completo) */}
        <div className="mt-8 px-10 lg:px-25">
          <h3 className="font-medium mb-3">Reseñas de usuarios:</h3>

          {/* Mostrar reseñas de usuarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-25 gap-y-14">
            {reviews.length > 0 ? (
              reviews
                .slice(0, showAllReviews ? reviews.length : 4)
                .map((review) => (
                  <div key={review.id} className="border-b pb-6 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                          <span className="text-gray-600">👤</span>
                        </div>
                        <span className="font-medium">{review.name}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {review.date} - {review.fieldType}
                      </div>
                    </div>
                    <div className="flex text-yellow-500 mb-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                        ))}
                    </div>
                    <p className="text-sm">"{review.comment}"</p>
                  </div>
                ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No hay reseñas disponibles para esta empresa.</p>
              </div>
            )}

            {/* Botón para mostrar más */}
            {reviews.length > 4 && (
              <div className="col-span-full text-center mt-4">
                <button
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                >
                  {showAllReviews ? "Mostrar menos" : "Mostrar todas las reseñas"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botón flotante para reservar (visible solo en móvil) */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button
          onClick={() => setShowMobileCalendar(true)}
          className="bg-[#2fc92c] hover:bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
        >
          
          {/* Icono del botón flotante */}  
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </button>
      </div>

      {/* Modal de calendario para móvil */}
      {showMobileCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold">Reservar cancha</h3>
              <button
                onClick={() => setShowMobileCalendar(false)}
                className="text-gray-500 hover:text-gray-700"
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
            <div className="p-4">
              <Calendario />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;