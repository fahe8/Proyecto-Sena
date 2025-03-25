import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { iconosServicios } from "../../../utils/iconosServicios";

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
      className="w-64  bg-white rounded-2xl shadow-lg cursor-pointer overflow-hidden hover:scale-103 transition-transform duration-300"
      onClick={() => navigate(`/${empresa?.nombre}`)}
    >
      <div className="relative">
        <Slider {...settings}>
          {empresa?.imagenes?.map((imagen, index) => (
            <img
              key={index + "ca"}
              src={imagen}
              alt={`Imagen ${index + 1} de ${empresa?.nombre}`}
              className="object-cover  h-48 w-64 "
            />
          ))}
        </Slider>
      </div>

     <div className="px-4 py-4">
     <div className="bg-white  ">
        <div className=" flex justify-between items-center min-h-[3rem]">
          <h3 className=" font-bold ">{empresa?.nombre}</h3>
          <div className="flex items-center mt-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <span className="ml-1">{empresa?.calificacion}</span>
          </div>
        </div>

        <p className="text-gray-800 text-sm">{empresa?.tiposCanchas}</p>
      </div>
      <div className="flex gap-2 justify-center">
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
