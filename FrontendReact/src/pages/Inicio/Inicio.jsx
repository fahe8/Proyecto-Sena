import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { empresas } from "./dataPrueba";
import iconHistorialReserva from "../../assets/Inicio/recent.svg";
import iconPendiente from "../../assets/Inicio/archive.svg";
import iconFavoritos from "../../assets/Inicio/corazon.svg";
import iconNoRecomendar from "../../assets/Inicio/thumb-down.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useAuth } from "../../Provider/AuthProvider";
import Header from "../../Header/Header";
import { BusquedaFiltros } from "../../Header/Componentes/BusquedaFiltros";

const Inicio = () => {
  return (
    <>
      <Header />
      <main>
        <div className="lg:hidden">
          <BusquedaFiltros />
        </div>
        <section className="grid container mx-auto pt-5">
          {/* <!-- Seccion lateral izquierda --> */}
          <SeccionHerramientas />

          {/* <!-- listado de canchas --> */}
          <ListaEmpresas />
        </section>
      </main>
    </>
  );
};

const ListaEmpresas = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-self-center"
      id="canchas-seccion"
    >
      {empresas?.map((empresa, index) => (
        <div
          key={index + "a"}
          className="w-64  bg-white rounded-2xl shadow-lg cursor-pointer overflow-hidden hover:scale-103 transition-transform duration-300"
          onClick={() => navigate(`/${empresa.nombre}`)}
        >
          <div className="relative">
            <Slider {...settings}>
              {empresa.imagenes.map((imagen, index) => (
                <img
                  key={index + "ca"}
                  src={imagen}
                  alt={`Imagen ${index + 1} de ${empresa.nombre}`}
                  className="object-cover  h-64 w-64 "
                />
              ))}
            </Slider>
          </div>

          <div className="bg-white px-3 py-2 ">
            <div className=" flex justify-between">
            <h3 className=" font-bold">{empresa.nombre}</h3>
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
              <span className="ml-1">{empresa.calificacion}</span>
            </div>
            </div>
            
            <p className="text-gray-800 text-sm">{empresa.tiposCanchas}</p>
           
          </div>
        </div>
      ))}
    </div>
  );
};

const SeccionHerramientas = () => {
  const { isAuthenticated } = useAuth;
  const menuItems = [
    {
      text: "Historial de reservas",
      ref: "/",
    },
    {
      text: "Reservas pendientes",
      ref: "/",
    },
    {
      text: "Mis favoritos",
      ref: "/",
    },
    {
      text: "No recomendarme",
      ref: "/",
    },
  ];
  return (
    <div className="px-2  border-gray-300 flex flex-col gap-4 items-center self-start overflow-y-auto">
      <ul
        className=" rounded-2xl grid grid-cols-4 justify-around mb-4 border"
        id="menu-lista"
      >
        {menuItems?.map((item, index) => {
          const borderClass =
            index === menuItems.length - 1 ? "" : "border-r-2 border-gray-300";
          return (
            <li key={index + "b"}>
              <Link
                to={isAuthenticated ? "" : "/login"}
                className={`  text-center flex text-[11px] lg:text-sm  lg:px-4 lg:py-6  xl:px-6 xl:py-8 gap-2 justify-center items-center ${borderClass} 
            hover:bg-gray-200 hover:text-green-500 ${index === menuItems.length -1 ?"rounded-r-2xl":""} ${index === 0 ?"rounded-l-2xl":""}  
            transition-colors duration-300`}
              >
                <span>{item.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Inicio;
