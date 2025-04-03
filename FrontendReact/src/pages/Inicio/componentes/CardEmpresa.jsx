import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { iconosServicios } from "../../../utils/iconosServicios";
import LazyImage from "../../../utils/LazyImage";
import { EyeIcon, EyeOffIcon, LetterIcon, KeyIcon, BathroomIcon, StoreIcon, ParkingIcon, RefereeIcon, BarIcon, WifiIcon,LeftArrowIcon,RightArrowIcon, StarIcon } from "../../../assets/IconosSVG/iconos.jsx";
const CardEmpresa = ({ empresa }) => {
  const navigate = useNavigate();

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: "-25px" }}
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
        style={{ ...style, display: "block", right: "-25px" }}
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
      />
    );
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
      className="w-64 bg-white rounded-2xl shadow-lg cursor-pointer overflow-hidden hover:scale-105 transition-transform duration-300"
      onClick={() => navigate(`/empresa/${empresa?.slug}`)}
    >
      <div className="relative">
        <Slider {...settings}>
          {empresa?.imagenes?.map((imagen, index) => (
            <LazyImage
              key={index + "ca"}
              src={imagen}
              alt={`Imagen ${index + 1} de ${empresa?.nombre}`}
              className="object-cover h-48 w-64"
            />
          ))}
        </Slider>
      </div>

      <div className="px-4 py-4">
        <div className="bg-white">
          <div className="flex justify-between items-center min-h-[3rem]">
            <h3 className="font-bold">{empresa?.nombre}</h3>
            <div className="flex items-center mt-1">
              <span className="ml-1">{empresa?.calificacion}</span>
            </div>
          </div>

          <p className="text-gray-800 text-sm">{empresa?.tiposCanchas}</p>
        </div>
        <div className="flex gap-2 justify-center my-2">
          {empresa.servicios?.map((servicio, index) => (
            <div key={index} className="flex items-center gap-1">
              <span className="text-lg">{iconosServicios[servicio] || "❓"}</span>
            </div>
          ))}
        </div>
    
      </div>
    </div>
  );
};

export default CardEmpresa;
