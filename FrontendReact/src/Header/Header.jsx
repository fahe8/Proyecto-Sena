import React, { useEffect, useRef, useState } from "react"; // Importamos React y hooks necesarios
import { Link, useNavigate } from "react-router-dom"; // Importamos Link para la navegación entre páginas y useNavigate para redirecciones
import { useAuth } from "../Provider/AuthProvider"; // Importamos el contexto de autenticación
import { signOut } from "firebase/auth"; // Importamos la función para cerrar sesión en Firebase
import { auth } from "../pages/Login/firebaseconfig"; // Importamos la configuración de Firebase
import { BusquedaFiltros } from "./Componentes/BusquedaFiltros"; // Importamos el componente de búsqueda con filtros
import logo from "../assets/logo.png"; // Importamos el logo de la aplicación

// Componente Header
const Header = () => {
  const navigate = useNavigate(); // Hook para redireccionar a diferentes rutas

  return (
    <header className="bg-white sticky top-0 z-10 shadow-sm">
      {/* Contenedor del header con estilos */}
      <div className="container flex justify-around items-center p-2 mx-auto">
        {/* Logo y nombre de la aplicación, al hacer clic redirige a la página principal */}
        <div
          className="flex items-center gap-2 font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo de mi cancha ya" className="w-8 md:w-12" />
          <p className="text-sm md:text-base">MiCanchaYa</p>
        </div>

        {/* Barra de búsqueda y filtros (visible solo en pantallas grandes) */}
        <div className="hidden lg:block">
          <BusquedaFiltros />
        </div>

        {/* Botón de perfil */}
        <BotonPerfil />
      </div>
    </header>
  );
};

// Componente BotonPerfil para mostrar el menú del usuario
export const BotonPerfil = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false); // Estado para mostrar/ocultar el menú
  const menuRef = useRef(null); // Referencia para detectar clics fuera del menú

  const { isAuthenticated } = useAuth(); // Obtenemos el estado de autenticación del usuario

  useEffect(() => {
    // Función para detectar clics fuera del menú y cerrarlo
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMostrarMenu(false);
      }
    };

    // Si el menú está abierto, agregamos un evento para detectar clics fuera de él
    if (mostrarMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Limpiamos el evento al desmontar el componente o al cerrar el menú
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mostrarMenu]);

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra sesión en Firebase
      window.localStorage.removeItem("auth"); // Elimina datos de autenticación almacenados en localStorage
      console.log("Cierre de sesión exitoso");

      window.location.href = "/login"; // Redirige a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Botón de perfil (solo visible si el usuario está autenticado) */}
      {isAuthenticated ? (
        <button
          onClick={() => {
            setMostrarMenu(!mostrarMenu); // Muestra/oculta el menú al hacer clic en el botón
          }}
          className=" text-sm lg:text-lg flex items-center py-1 px-4 bg-green-400 rounded-2xl hover:bg-green-500 cursor-pointer"
        >
          <span className="mr-2">Perfil</span>
          {/* Ícono del usuario */}
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
        // Botones de iniciar sesión y registrarse (cuando el usuario no está autenticado)
        <div className="flex gap-2">
          <Link
            to="/login"
            className=" text-sm lg:text-lg flex items-center py-1 px-1.5 md:px-4 bg-green-400 rounded-2xl hover:bg-green-500 cursor-pointer"
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className=" text-sm lg:text-lg flex items-center py-1 px-1.5 md:px-4 border-2  border-green-400 hover:bg-green-500 rounded-2xl  cursor-pointer"
          >
            Iniciar sesión
          </Link>
        </div>
      )}

      {/* Menú desplegable */}
      {mostrarMenu &&
        (isAuthenticated ? (
          // Menú para usuarios autenticados
          <div className="absolute right-0 w-40 bg-white shadow-lg rounded-t-lg rounded-b-lg cursor-pointer z-50">
            <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-sm text-center rounded-t-lg">
              Eres una empresa?
            </Link>
            <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-sm text-center">
              Centro de ayuda
            </Link>
            <button
              onClick={handleLogout}
              className="w-full block px-4 py-2 text-gray-800 hover:bg-gray-200 text-sm rounded-b-lg"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          // Menú para usuarios no autenticados
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg cursor-pointer z-50">
            <Link to={"/nueva"} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
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

export default Header; // Exportamos el componente Header
