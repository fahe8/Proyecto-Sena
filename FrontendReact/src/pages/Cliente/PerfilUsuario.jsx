import React, { useState, useEffect } from "react";
import cancha2  from "./imagen/cancha2.jpg";
import canchasi from "./imagen/canchasin.png";
;

const imagen = {
  gps: (
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
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  ),
  trofeo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
      />
    </svg>
  ),
  estrella: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#FFC107"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Tienda: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </svg>
  ),
  flecha: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  ),
  flechaIzq: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  )
};

// implemento este componente para el Carrusel
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

  // aca le coloco  cambio automático de imágenes cada 5 segundos
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
            className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
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
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  // Imágenes que implementarios al carrusel
  const carouselImages = [
    cancha2,
    canchasi
    
  ];

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
    <div className="min-h-screen bg-gray-100">
      {/* encabezado de navegacion */}
      <nav className="bg-white p-4 shadow-md flex justify-between items-center">
        <button className="bg-[#00b04b] text-gray-700 px-4 py-2 rounded-md text-sm transition duration-400 ease-in-out hover:bg-[#71fe8e] ">
          Logo
        </button>
        <button className="bg-[#00b04b] text-gray-700 px-4 py-2 rounded-md text-sm flex items-center transition duration-400 ease-in-out hover:bg-[#71fe8e] ">
          Profile <span className="ml-1">👤</span>
        </button>
      </nav>

      {/* Contenido principal*/}
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Left column: Venue info */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {/* Venue header */}
              <div className="flex items-start mb-4">
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
                <div className="flex flex-col items-center">
                  <div className="bg-white p-2 rounded-md border border-gray-200">
                    <span className="flex items-center text-sm">
                      <span className="text-yellow-500 mr-1">
                        {imagen.trofeo}
                      </span>
                      Preferido
                    </span>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <button
                      className={`text-white px-4 py-2 rounded-md text-sm transition duration-400 ease-in-out ${
                        isOpen
                          ? "bg-[#00b04b] hover:bg-[#009040]"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      onClick={toggleOpenStatus}
                    >
                      {isOpen ? "Abierto" : "Cerrado"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Carrusel - reemplaza el grid de 2 columnas */}
              <Carousel images={carouselImages} />

              {/* Thumbnails de imágenes pequeñas debajo del carrusel */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {carouselImages.map((img, index) => (
                  <div key={index} className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-md overflow-hidden">
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
              </div>

              {/* Informacion del empresario */}
              <div className="flex items-center mb-4">
                <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <span className="text-gray-600">👤</span>
                </div>
                <div>
                  <h3 className="font-medium">Encargado: Juan Avila</h3>
                </div>
              </div>

              {/* Descripcion de la empresa */}
              <p className="text-sm text-gray-700 mb-6">
                Canchas MeteGoles una empresa especializada en la administración
                y alquiler de canchas sintéticas de última generación. Ofrecemos
                espacios deportivos de alta calidad para fútbol 5, 7 y 9, con
                césped sintético de alta resistencia, iluminación LED, graderías
                cómodas y vestuarios equipados. Nuestras canchas garantizan
                durabilidad, confort y un excelente rendimiento para jugadores
                de todos los niveles.
              </p>

              {/* Canchas disponibles que los usuarios visualizan */}
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
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center text-sm">
                    <span className="mr-2"></span>
                    <span>Árbitro</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2">🚿</span>
                    <span>Baños</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2">
                      <div> {imagen.Tienda}</div>
                    </span>

                    <span>Tienda</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2">🍹</span>
                    <span>Bar</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2">🚗</span>
                    <span>Parqueadero</span>
                  </div>
                </div>
              </div>

              <hr className="my-6" />

              {/* valoracion general de usuarios */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Valoración general:</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1"></span>{" "}
                    {imagen.estrella}
                    <span className="font-medium">4.8</span>
                    <span className="text-gray-500 text-sm ml-1">(23)</span>
                    <div className="ml-3 bg-gray-100 px-2 py-1 rounded-md text-sm">
                      {reviews.length} Reseñas
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
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

              <hr className="my-6" />

              {/* agregar reseña */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Deja tu reseña</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-3">
                    <div className="flex items-center mb-2">
                      <label className="mr-4 text-sm">Calificación:</label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="text-2xl focus:outline-none"
                            onClick={() => handleRatingChange(star)}
                          >
                            <span
                              className={
                                star <= newReview.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }
                            >
                              ★
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="w-full border rounded-md p-2 text-sm"
                      rows="3"
                      placeholder="Comparte tu experiencia con esta cancha..."
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview({ ...newReview, comment: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>
                  <div className="text-right">
                    <button
                      type="submit"
                      className="bg-[#00b04b] text-white px-4 py-2 rounded-md text-sm hover:bg-[#009040]"
                    >
                      Publicar reseña
                    </button>
                  </div>
                </form>
              </div>

              {/* opiniones de usuarios  */}
              <div className="space-y-6">
                <h3 className="font-medium mb-3">Reseñas de usuarios:</h3>

                {/* Mostrar reseñas de usuarios  */}
                {reviews
                  .slice(0, showAllReviews ? reviews.length : 3)
                  .map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
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

                {reviews.length > 3 && (
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
                )}
              </div>
            </div>
            {/* pie de pagina */}
            <div className="text-center text-sm text-gray-500 mb-6"></div>
          </div>
          {/*aca fabian coloca el calendario */}
        </div>
      </div>
    </div>
  );
};

export default Perfil;