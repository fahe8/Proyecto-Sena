import React, { use, useEffect, useRef, useState } from "react"; // Importamos React y hooks necesarios
import { Link, useNavigate, useLocation } from "react-router-dom"; // Importamos Link para la navegación entre páginas y useNavigate para redirecciones
import { useAuth } from "../Provider/AuthProvider"; // Importamos el contexto de autenticación
import { signOut } from "firebase/auth"; // Importamos la función para cerrar sesión en Firebase
import { auth } from "../pages/Login/firebaseconfig"; // Importamos la configuración de Firebase
import { BusquedaFiltros } from "./Componentes/BusquedaFiltros"; // Importamos el componente de búsqueda con filtros
import logo from "../assets/logo.png"; // Importamos el logo de la aplicación


// Componente Header
const Header = () => {
  const navigate = useNavigate(); // Hook para redireccionar a diferentes rutas
  const location = useLocation(); // <-- get current location
  // Check if the current path matches /empresa/:id
  const hideBusquedaFiltros = /^\/empresa\/[^/]+$/.test(location.pathname);

  return (
    <header className="bg-[#003044]  shadow-sm">
      {/* Contenedor del header con estilos */}
      <div className="container flex justify-around items-center p-4 mx-auto">
        {/* Logo y nombre de la aplicación, al hacer clic redirige a la página principal */}
        <div
          className="flex items-center gap-2 font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo de mi cancha ya" className="w-8 md:w-7 lg:w-8" />
          <p className="text-[#f7f7f7] text-sm md:text-base lg:text-[16px]">MiCanchaYa</p>
        </div>

        {/* Only show BusquedaFiltros if not on /empresa/:id */}
        {!hideBusquedaFiltros && (
          <div className="hidden lg:block ">
            <BusquedaFiltros/>
          </div>
        )}

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

  const { isAuthenticated, cerrarSesion } = useAuth(); // Obtenemos el estado de autenticación del usuario

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
  const handleLogout =  () => {
    cerrarSesion(); // Llamamos a la función de cerrar sesión del contexto de autenticación

  };

  return (
    <div ref={menuRef} className="relative">
      {/* Botón de perfil (solo visible si el usuario está autenticado) */}
      {isAuthenticated ? (
        <button
          onClick={() => {
            setMostrarMenu(!mostrarMenu); // Muestra/oculta el menú al hacer clic en el botón
          }}
          className=" text-sm lg:text-[17px] flex justify-center items-center gap-1 py-1 px-4 bg-[#2fc92c] rounded-2xl hover:bg-green-600 text-[#f6f6f6] cursor-pointer shadow-md transition-all duration-250"
        >
          <span className="">Perfil</span>
          {/* Ícono del usuario */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 lg:size-4.5"
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
        <div className="flex gap-2 text-center items-center">
         
          <Link
            to="/login"
            className="text-sm lg:text-[17px] flex justify-center items-center py-1 px-4 bg-[#2fc92c] rounded-2xl hover:bg-green-600 text-[#f6f6f6] cursor-pointer shadow-md transition-all duration-250"
          >
            Ingresar
          </Link>
        </div>
      )}

      {/* Menú desplegable */}
      {mostrarMenu &&
        (isAuthenticated ? (
          // Menú para usuarios autenticados
          <div className="absolute mt-1 right-0 w-40 bg-white shadow-lg rounded-t-lg rounded-b-lg cursor-pointer z-50">
            <Link to={"/perfil"} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-sm text-center rounded-t-lg">
              Mi Perfil
            </Link>
            <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-sm text-center">
              Centro de ayuda
            </Link>
            <button
              onClick={handleLogout}
              className="w-full block px-4 py-2 text-gray-800 hover:bg-gray-200 text-sm rounded-b-lg cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
         <></>
        ))}
    </div>
  );
};

export default Header; // Exportamos el componente Header
