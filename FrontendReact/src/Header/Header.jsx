import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import iconSearch from "../assets/Inicio/search.svg";

const Header = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMostrarMenu(false);
      }
    };

    if (mostrarMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mostrarMenu]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container flex justify-between items-center p-4 mx-auto">
        <div className="text-xl font-bold">LOGO</div>
        {/* <!-- Barra de busqueda y boton filtros--> */}
        <div className="hidden lg:block">
          <BusquedaFiltros />
        </div>

        <div ref={menuRef} className="relative">
          {/* <!-- Botón de perfil --> */}
          <button
            onClick={() => {
              console.log(mostrarMenu);
              setMostrarMenu(!mostrarMenu);
            }}
            className=" text-sm lg:text-lg flex items-center py-2 px-4 bg-green-400 rounded-2xl peer"
          >
            <span>Perfil</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 lg:size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>
          {/* <!-- Menú desplegable --> */}

          {mostrarMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg cursor-pointer">
              <Link
                to={"/registrar"}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-t-lg"
              >
                Registrarse
              </Link>

              <Link
                to={"/iniciarSesion"}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Iniciar sesión
              </Link>

              <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Pon tus canchas
              </Link>
              <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-b-lg">
                Centro de ayuda
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export const BusquedaFiltros = () => {
  return (
    <div className="flex gap-1 px-2 lg:gap-6 w-full justify-start lg:justify-center pt-4 lg:pt-0">
      <button className="w-12 lg:w-24 flex shadow-md py-2 justify-center border border-gray-300 rounded-md hover:border-black hover:bg-gray-200 transition-all duration-300 ease-in-out">
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
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>

        <span className="hidden lg:block">Filtros</span>
      </button>
      <form className="relative w-full lg:w-[500px] flex">
        <input
          type="text"
          placeholder="Busca alguna cancha que conozcas..."
          className="w-full pl-4 pr-10 lg:pl-10 lg:pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <img
          className="absolute right-4 top-3"
          src={iconSearch}
          alt="Icono de lupa"
        />
      </form>
    </div>
  );
};

export default Header;
