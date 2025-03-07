import React from "react";

import { Link } from "react-router-dom";
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
        <section className="grid lg:grid-cols-[20%_80%] container mx-auto pt-5">
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
          className="w-56 h-[280px] bg-white rounded-2xl shadow-lg cursor-pointer overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          <div className="relative h-[60%]">
            <Slider {...settings}>
              {empresa.imagenes.map((imagen, index) => (
                <img
                  key={index + "ca"}
                  src={imagen}
                  alt={`Imagen ${index + 1} de ${empresa.nombre}`}
                  className="object-cover  h-40"
                />
              ))}
            </Slider>
          </div>

          <div className="bg-white p-3 h-[40%]">
            <h3 className=" font-bold">{empresa.nombre}</h3>
            <p className="text-gray-800 text-sm">{empresa.tiposCanchas}</p>
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
      icon: iconHistorialReserva,
    },
    {
      text: "Reservas pendientes",
      ref: "/",
      icon: iconPendiente,
    },
    {
      text: "Mis favoritos",
      ref: "/",
      icon: iconFavoritos,
    },
    {
      text: "No recomendarme",
      ref: "/",
      icon: iconNoRecomendar,
    },
  ];
  return (
    <div className="px-2 lg:pr-2 lg:border-r-2 border-gray-300 flex flex-col gap-4 items-center lg:sticky top-24 self-start lg:h-[600px] overflow-y-auto">
      <ul
        className=" rounded-2xl grid grid-cols-4 lg:grid-cols-1 gap-4 lg:gap-0 justify-around mb-4"
        id="menu-lista"
      >
        {menuItems?.map((item, index) => {
          const borderClass =
            index === menuItems.length - 1 ? "" : "border-b-2 border-gray-300";
          return (
            <li key={index + "b"}>
              <Link
                to={isAuthenticated ? "" : "/login"}
                className={` lg:bg-white text-center flex text-[11px] lg:text-sm  lg:px-4 lg:py-6  xl:px-6 xl:py-8 gap-2 justify-center items-center ${borderClass} 
            hover:bg-gray-200 hover:text-green-500 
            transition-colors duration-300`}
              >
                <span>{item.text}</span>
                <img
                  src={item.icon}
                  alt="iconos correspondientes a la seccion"
                  width={20}
                  className="hidden lg:block"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Inicio;
