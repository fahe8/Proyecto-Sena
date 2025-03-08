import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../pages/Login/firebaseconfig";
import { BusquedaFiltros } from "./Componentes/BusquedaFiltros";

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-10 shadow-sm">
      <div className="container flex justify-between items-center p-4 mx-auto">
        <div className="text-xl font-bold">LOGO</div>
        {/* <!-- Barra de busqueda y boton filtros--> */}
        <div className="hidden lg:block">
          <BusquedaFiltros />
        </div>
        <BotonPerfil />
      </div>
    </header>
  );
};

export const BotonPerfil = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const menuRef = useRef(null);

  const { isAuthenticated } = useAuth();

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.localStorage.removeItem("auth");
      console.log("Cierre de sesión exitoso");

      window.location.href = "/login";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div ref={menuRef} className="relative">
      {/* <!-- Botón de perfil --> */}
      {isAuthenticated ? (
        <button
          onClick={() => {
            setMostrarMenu(!mostrarMenu);
          }}
          className=" text-sm lg:text-lg flex items-center py-2 px-4 bg-green-400 rounded-2xl hover:bg-green-300 cursor-pointer"
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
      ) : (
        <div className="flex gap-2">
          <Link
            to="/login"
            className=" text-sm lg:text-lg flex items-center py-2 px-4 bg-green-400 rounded-2xl hover:bg-green-500 cursor-pointer"
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className=" text-sm lg:text-lg flex items-center py-2 px-4 border-2  border-green-400 hover:bg-green-500 rounded-2xl  cursor-pointer"
          >
            Iniciar Sesión
          </Link>
        </div>
      )}
      {/* <!-- Menú desplegable --> */}

      {mostrarMenu &&
        (isAuthenticated ? (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg cursor-pointer z-50">
            <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Pon tus canchas
            </Link>
            <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Centro de ayuda
            </Link>
            <button
              onClick={handleLogout}
              className="w-full block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-b-lg"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg cursor-pointer z-50">
            <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Pon tus canchas
            </Link>
            <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-b-lg">
              Centro de ayuda
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Header;
