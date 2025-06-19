import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { iconosServicios } from "../../../utils/iconosServicios";
import LazyImage from "../../../utils/LazyImage";
import { useAuth } from "../../../Provider/AuthProvider";
import { Share2 } from "lucide-react";
import { Gps, StarIcon } from "../../../assets/IconosSVG/iconos";

const CardEmpresa = ({ empresa, mostrarFavorito }) => {
  const navigate = useNavigate();
  const [favorito, setFavorito] = useState(false);
  const { user, isAuthenticated } = useAuth(); // Agregamos isAuthenticated

  console.log('Estado de autenticación:', {
    isAuthenticated,
    user,
    empresa: empresa?.nombre
  });


  // Cargar estado de favoritos del localStorage
  useEffect(() => {
    if (user?.id) {
      const favoritosPorUsuario =
        JSON.parse(localStorage.getItem(`favoritos_${user.id}`)) || [];
      setFavorito(favoritosPorUsuario.includes(empresa?.nombre));
      console.log('Cargando favoritos:', {
        userId: user.id,
        favoritos: favoritosPorUsuario,
        empresaNombre: empresa?.nombre,
        esFavorito: favoritosPorUsuario.includes(empresa?.nombre)
      });
    }
  }, [empresa?.nombre, user?.id]);


  // Guardar en el local storage
  const toggleFavorito = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para agregar favoritos');
      return;
    }

    if (!user) {
      console.error('Usuario no encontrado en el contexto');
      return;
    }

    const storageKey = `favoritos_${user.id}`;
    const favoritosGuardados = JSON.parse(localStorage.getItem(storageKey)) || [];
    const nuevoEstado = !favorito;
    
    const nuevosFavoritos = nuevoEstado
      ? [...favoritosGuardados, empresa?.nombre]
      : favoritosGuardados.filter((fav) => fav !== empresa?.nombre);

    setFavorito(nuevoEstado);
    localStorage.setItem(storageKey, JSON.stringify(nuevosFavoritos));
    
    console.log('Estado de favorito actualizado:', {
      nuevoEstado,
      empresa: empresa?.nombre,
      favoritos: nuevosFavoritos,
      usuario: user.id
    });
  };


  // Compartir link de la empresa
  const handleShare = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/empresa/${empresa?.NIT}`;
    if (navigator.share) {
      navigator.share({
        title: empresa?.nombre,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("¡Enlace copiado al portapapeles!");
    }
  };

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, left: "-25px" }}
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
      />
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, right: "-25px z-12" }}
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: empresa?.imagenes?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div
      className={`group w-68 bg-[#fdfdfd] rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.3)] cursor-pointer overflow-hidden  transition-transform duration-300 relative mb-10 ${
        mostrarFavorito ? "hover:scale-103" : "none"
      } `}
      onClick={() => navigate(`/empresa/${empresa?.NIT}`)}
    >
      <div className="relative">
       {/* Opciones flotantes al hacer hover */}
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            
            {mostrarFavorito && (  
              <button
                onClick={toggleFavorito}
                className={`shadow p-2.5 rounded-full transition cursor-pointer ${ favorito ? "text-[#33ea30] bg-green-100" : "text-gray-500 bg-white/90"
                }`}
                title={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={favorito ? "#33ea30" : "#e5e5e5"}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 transition all duration-200"
                      >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            )}
            <button
              onClick={handleShare}
              className="bg-white/90 shadow p-3 rounded-full transition hover:bg-gray-100 text-[#003044] cursor-pointer w-full"
              title="Compartir"
            >
              <Share2 className="h-4 w-4 text-gray-500 " />
            </button>
          </div>

          <Slider {...settings}>
            {empresa?.imagenes?.map((imagen, index) => (
              <div key={index} className="w-full h-42">
                <LazyImage
            src={imagen.url}
            alt={`Imagen ${index + 1} de ${empresa?.nombre}`}
            className="object-cover w-68 h-42 "
                />
              </div>
            ))}
          </Slider>
              </div>

        <div className="px-6 pb-2">
          <div className="bg-white">
            <div className="flex justify-between items-center min-h-[2rem] mt-2">
              <h3 className="font-semibold text-sm">{empresa?.nombre}</h3>
              {mostrarFavorito && (
                <div className="flex items-center mt-1 bg-amber-100 px-3 py-1 rounded-lg text-xs">
                  <StarIcon />
                  <span className="ml-1 font-bold">{parseFloat(empresa?.promedio_calificacion).toFixed(1) || 0}</span>
                </div>
              )}
              
            </div>
            <div className="flex items-center gap-0.5">
              <Gps/>
              <p className="text-xs">{empresa?.direccion}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 mb-5">
              {empresa?.canchas?.map((cancha, idx) => (
                <div key={idx} className="bg-blue-100 text-blue-900 text-xs px-2 py-1 rounded-lg font-semibold">
                  {cancha.tipo_cancha.tipo}
                </div>
              ))}
            </div>

          </div>
          <div className="flex gap-4 justify-center my-2 min-h-[48px]">
            {empresa?.servicios.slice(0, 4).map((servicio, index) => {
              if (!servicio?.tipo) return null;

              const tipoNormalizado = servicio?.tipo
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();

              return (
                <div key={index} className="flex items-center h-8 w-8 bg-green-200 p-1 rounded-xl justify-center">
                  {iconosServicios[tipoNormalizado] &&
                    React.createElement(iconosServicios[tipoNormalizado])}
                </div>
              );
            })}
            {empresa?.servicios.length > 4 && (
              <div className="flex items-center h-8 w-8 bg-green-200 p-1 rounded-xl justify-center text-xs font-medium text-green-800">
                +{empresa.servicios.length - 4}
              </div>
            )}
          </div>
              </div>
      </div>
  );
};

export default CardEmpresa;