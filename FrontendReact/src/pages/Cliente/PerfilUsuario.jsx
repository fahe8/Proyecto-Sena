import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import cancha2 from "./imagen/cancha2.jpg";
import canchasi from "./imagen/canchasin.png";
import Header from "../../Header/Header";
import Calendario from "./Calendario/Calendario";
import { iconosServicios } from "../../utils/iconosServicios";
import insignia from "./imagen/insignia.png";
import { empresaServicio } from "../../services/api";
import { LeftArrowIcon, RightArrowIcon } from "../../assets/IconosSVG/iconos";

// Componente para el Carrusel
const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para moverse a la siguiente imagen
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para moverse a la imagen anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Cambio automático de imágenes cada 5 segundos
  useEffect(() => {
    if (images.length <= 1) return;//Solo si hay una imagen
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden mb-6">
      <div className="w-full h-64 bg-gray-200">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md"
        aria-label="Anterior"
      >
        {React.createElement(LeftArrowIcon)}
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md"
        aria-label="Siguiente"
      >
        {React.createElement(RightArrowIcon)}
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Perfil = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showMobileCalendar, setShowMobileCalendar] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [reviews] = useState([
    {
      id: 1,
      name: "Lucas Morales",
      date: "13/04/2023",
      fieldType: "Fútbol 7",
      rating: 4,
      comment:
        "Reservar esta cancha fue muy sencillo y la calidad del césped sintético es impresionante. Mis amigos y yo disfrutamos de un partido increíble sin ningún inconveniente. Definitivamente volveré a reservar aquí.",
    },
    {
      id: 2,
      name: "María Gómez",
      date: "13/04/2023",
      fieldType: "Fútbol 5",
      rating: 5,
      comment:
        "Me encantó jugar en esta cancha. El espacio es amplio, las condiciones son perfectas, y además ofrecen un servicio al cliente excelente. Lo recomendaría a cualquiera que quiera pasar un buen rato.",
    },
    {
      id: 3,
      name: "Javier Torres",
      date: "13/04/2023",
      fieldType: "Fútbol 7",
      rating: 5,
      comment:
        "La cancha está en perfectas condiciones, y el proceso de reserva fue rápido y sin complicaciones. El césped se siente casi natural. Fue una gran experiencia para todos.",
    },
    {
      id: 4,
      name: "leonidas",
      date: "13/04/2023",
      fieldType: "Fútbol 7",
      rating: 5,
      comment:
        "La cancha está en perfectas condiciones, y el proceso de reserva fue rápido y sin complicaciones. El césped se siente casi natural. Fue una gran experiencia para todos.",
    },
    {
      id: 5,
      name: "meliodas",
      date: "13/04/2023",
      fieldType: "Fútbol 7",
      rating: 5,
      comment:
        "La cancha está en perfectas condiciones, y el proceso de reserva fue rápido y sin complicaciones. El césped se siente casi natural. Fue una gran experiencia para todos.",
    },
    {
      id: 6,
      name: "carlos guerrero",
      date: "13/04/2023",
      fieldType: "Fútbol 7",
      rating: 5,
      comment:
        "La cancha está en perfectas condiciones, y el proceso de reserva fue rápido y sin complicaciones. El césped se siente casi natural. Fue una gran experiencia para todos.",
    },
  ]);

  const [empresa, setEmpresa] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const obtenerEmpresa = async () => {
      if (id) {
        try {
          const empresa = await empresaServicio.obtenerPorId(id);
          console.log(empresa.data.data);
          setEmpresa(empresa.data.data);
        } catch (error) {
          setEmpresa([]);
        }
      }
    };
    obtenerEmpresa();
  }, [id]);

  // Imágenes para el carrusel
  const carouselImages = [cancha2, canchasi];

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
                    <button
                      className={`px-4 py-2 w-16 rounded-md text-sm transition duration-100 ease-in-out ${
                        isOpen ? "text-green-500" : "text-red-500"
                      }`}
                      onClick={toggleOpenStatus}
                    >
                      {isOpen ? "Abierto" : "Cerrado"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Carrusel - con tamaño más controlado */}
              <div className="max-w-full h-auto overflow-hidden mb-6">
                <Carousel images={empresa?.imagenes && empresa.imagenes.length > 0 ? empresa.imagenes : [cancha2, canchasi]} />
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
                    const key = servicio
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
                  <span className="font-medium mr-1.5">4.8</span>
                  <span className="text-gray-500 text-sm ml-1">(23)</span>
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
                      <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">4</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full w-1/5"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">3</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full w-0"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">2</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full w-0"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">1</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full w-0"></div>
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
            {reviews
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
              ))}

            {/* Botón para mostrar más */}
            <div className="col-span-full text-center mt-4">
              <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                {showAllReviews ? "Mostrar menos" : "Mostrar todas las reseñas"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botón flotante para reservar (visible solo en móvil) */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button
          onClick={() => setShowMobileCalendar(true)}
          className="bg-[#2fc92c] hover:bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
        >
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
