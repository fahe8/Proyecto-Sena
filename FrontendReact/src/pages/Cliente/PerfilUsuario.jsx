import React, { useState, useEffect } from "react";
import cancha2 from "./imagen/cancha2.jpg";
import canchasi from "./imagen/canchasin.png";
import Header from "../../Header/Header";
import Calendario from "./Calendario/Calendario";
import insignia from "./imagen/insignia.png";
 

const imagen = {
  // Tus SVGs e imágenes aquí...
};

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
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
        {imagen.flechaIzq}
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md"
        aria-label="Siguiente"
      >
        {imagen.flecha}
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
  const [selectedField, setSelectedField] = useState("Fútbol 7");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [showBookingSummary, setShowBookingSummary] = useState(false);
  const [showMobileCalendar, setShowMobileCalendar] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  const [reviews, setReviews] = useState([
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
  ]);
  
  const [newReview, setNewReview] = useState({
    name: "Usuario Actual",
    fieldType: selectedField,
    rating: 5,
    comment: "",
  });

  // Imágenes para el carrusel
  const carouselImages = [cancha2, canchasi];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectField = (field) => {
    setSelectedField(field);
    setIsDropdownOpen(false);
    setNewReview({ ...newReview, fieldType: field });
  };

  const toggleOpenStatus = () => {
    setIsOpen(!isOpen);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;

    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      date: formattedDate,
      fieldType: newReview.fieldType,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    setReviews([review, ...reviews]);
    setNewReview({ ...newReview, comment: "", rating: 5 });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handlePayment = () => {
    setShowBookingSummary(true);
  };

  return (
    <div className="min-h-screen bg-white ">
      {/* Encabezado de navegación */}
      <Header />

      {/* Contenedor padre principal con márgenes alineados al header */}
      <div className="container mx-auto px-4 py-6">
        
        {/* Primer contenedor: Info a la izquierda y calendario a la derecha */}
        <div className="flex flex-col md:flex-row gap-6 mb-6 px-25">
          {/* Columna izquierda: Información del lugar (hasta valoración general) */}
          <div className="flex-1">
            <div>
              {/* Venue header */}
              <div className="flex flex-col sm:flex-row items-start mb-4">
                <div className="flex items-start mb-4 sm:mb-0">
                  <div className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-gray-600">🏟️</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-lg">Canchas MeteGol</h2>
                    <div className="flex">
                      {imagen.gps}
                      <p className="text-sm text-gray-500">
                        Calle 3 N°00-00 Barrio salado
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center ml-auto">
                  <span className="flex flex-col items-center text-xs mr-4">
                    <span className="mr-1 w-8 h-auto">{imagen.insignia}</span>
                    <p className="font-semibold">Preferido</p>
                  </span>

                  <div className="text-sm text-gray-600">
                    <button
                      className={`px-4 py-2 w-16 rounded-md text-sm transition duration-100 ease-in-out ${
                        isOpen
                          ? "text-green-500"
                          : "text-red-500"
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
                <Carousel images={carouselImages} />
              </div>

              {/* Información del empresario */}
              <div className="flex items-center mb-4">
                <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <span className="text-gray-600">👤</span>
                </div>
                <div>
                  <h3 className="font-medium">Encargado: Juan Avila</h3>
                </div>
              </div>

              {/* Descripción de la empresa */}
              <p className="text-sm text-gray-700 mb-6">
                Canchas MeteGoles una empresa especializada en la
                administración y alquiler de canchas sintéticas de última
                generación. Ofrecemos espacios deportivos de alta calidad para
                fútbol 5, 7 y 9, con césped sintético de alta resistencia,
                iluminación LED, graderías cómodas y vestuarios equipados.
                Nuestras canchas garantizan durabilidad, confort y un
                excelente rendimiento para jugadores de todos los niveles.
              </p>

              {/* Canchas disponibles */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Canchas disponibles:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between bg-gray-100 px-3 py-2 rounded-md">
                    <span className="text-sm">Fútbol 5</span>
                    <span className="text-sm text-gray-500">(3)</span>
                  </div>
                  <div className="flex justify-between bg-gray-100 px-3 py-2 rounded-md">
                    <span className="text-sm">Fútbol 7</span>
                    <span className="text-sm text-gray-500">(2)</span>
                  </div>
                  <div className="flex justify-between bg-gray-100 px-3 py-2 rounded-md">
                    <span className="text-sm">Fútbol 9</span>
                    <span className="text-sm text-gray-500">(3)</span>
                  </div>
                  <div className="flex justify-between bg-gray-100 px-3 py-2 rounded-md">
                    <span className="text-sm">Fútbol 11</span>
                    <span className="text-sm text-gray-500">(1)</span>
                  </div>
                </div>
              </div>

              <hr className="my-6" />

              {/* Servicios adicionales */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Servicios adicionales:</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-sm">
                    <span className="mr-2">{imagen.arbitro}</span>
                    <span>Árbitro</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2">{imagen.baños}</span>
                    <span>Baños</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2">{imagen.Tienda}</span>
                    <span>Tienda</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2">{imagen.bar}</span>
                    <span>Bar</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2">{imagen.carro}</span>
                    <span>Parqueadero</span>
                  </div>
                </div>
              </div>

              <hr className="my-6" />

              {/* Valoración general de usuarios */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Valoración general:</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">
                      {imagen.estrella}
                    </span>
                    <span className="font-medium">4.8</span>
                    <span className="text-gray-500 text-sm ml-1">(23)</span>
                    <div className="ml-3 bg-gray-100 px-2 py-1 rounded-md text-sm">
                      {reviews.length} Reseñas
                    </div>
                  </div>
                </div>

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
            <div className="sticky top-4">
              <Calendario />
            </div>
          </div>
        </div>

        {/* Segundo contenedor Opiniones de usuarios (ancho completo) */}
        <div className="mt-8 px-25">
          <h3 className="font-medium mb-3">Reseñas de usuarios:</h3>

          {/* Mostrar reseñas de usuarios */}
          <div className="space-y-6">
            {reviews
              .slice(0, showAllReviews ? reviews.length : 3)
              .map((review) => (
                <div key={review.id} className="border-b pb-6">
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
                        <span key={i}>
                          {i < review.rating ? "★" : "☆"}
                        </span>
                      ))}
                  </div>
                  <p className="text-sm">"{review.comment}"</p>
                </div>
              ))}

            <div className="text-center">
              <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                {showAllReviews
                  ? "Mostrar menos"
                  : "Mostrar todas las reseñas"}
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
            <span className="text-xs font-medium">Reservar</span>
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