import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { iconosServicios } from "../../../utils/iconosServicios";
import LazyImage from "../../../utils/LazyImage";
import corazon from "./corazon.svg";

const CardEmpresa = ({ empresa, mostrarFavorito }) => {
  const navigate = useNavigate();
  const [favorito, setFavorito] = useState(false);

  // Cargar estado de favoritos del localStorage
  useEffect(() => {
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavorito(favoritosGuardados.includes(empresa?.nombre));
  }, [empresa?.nombre]);

  // Guardar en el local storage
  const toggleFavorito = (e) => {
    e.stopPropagation(); // detiene la carta al darle click al corazon

    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    let nuevosFavoritos;

    if (favoritosGuardados.includes(empresa?.nombre)) {
      nuevosFavoritos = favoritosGuardados.filter((fav) => fav !== empresa?.nombre);
    } else {
      nuevosFavoritos = [...favoritosGuardados, empresa?.nombre];
    }

    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    setFavorito(!favorito);
  };

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, left: "-25px" }} onClick={(event) => {event.stopPropagation(); onClick()}} />;
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, right: "-25px z-12",}} onClick={(event) => {event.stopPropagation(); onClick()}} />;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div
      className={`w-64 bg-[#fdfdfd] rounded-2xl shadow-lg cursor-pointer overflow-hidden  transition-transform duration-300 relative mb-10 ${ mostrarFavorito ? "hover:scale-103" : "none"} `}
      onClick={() => navigate(`/empresa/${empresa?.slug}`)}
    >
      <div className="relative">

        {mostrarFavorito && (
        <button
          onClick={toggleFavorito}
          className={`absolute top-2 right-2 z-1 text-2xl rounded-full transition ${
          favorito ? "text-[#33ea30]" : "text-[#8f8f8f]"}`}>

          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill={favorito ? "#33ea30" : "#8f8f8f"} viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
        
          className="h-6">
          <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
        )}

        <Slider {...settings}>
          {empresa?.imagenes?.map((imagen, index) => (
            <LazyImage
              key={index}
              src={imagen}
              alt={`Imagen ${index + 1} de ${empresa?.nombre}`}
              className="object-cover h-48 w-64 "
            />
          ))}
        </Slider>
      </div>

      <div className="px-6 py-4">
        <div className="bg-white">
          <div className="flex justify-between items-center min-h-[3rem]">
            <h3 className="font-semibold text-sm">{empresa?.nombre}</h3>
            {mostrarFavorito && (
            <div className="flex items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              <span className="ml-1">{empresa?.calificacion}</span>
            </div>)}
          </div>
            
          <p className="text-gray-800 text-sm">{empresa?.tiposCanchas?.join(", ")}</p>
        </div>
        <div className="flex gap-4 justify-center my-2">
          {empresa.servicios?.map((servicio, index) => (
            <div key={index} className="flex items-center h-5 w-5 ">
              {iconosServicios[servicio] && React.createElement(iconosServicios[servicio])}
            </div>
          ))}
        </div>
    
      </div>
    </div>
  );
};

export default CardEmpresa;