import React, { useEffect, useRef, useState } from "react"; // Importamos React y hooks necesarios
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
    <header className="bg-[#003044] shadow-lg">
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
  const [isOpen, setIsOpen] = useState(false); // Estado para mostrar/ocultar el menú
  const dropdownRef = useRef(null); // Referencia para detectar clics fuera del menú

  const { isAuthenticated } = useAuth(); // Obtenemos el estado de autenticación del usuario

  useEffect(() => {
    // Función para detectar clics fuera del menú y cerrarlo
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Agregamos un evento para detectar clics fuera del menú
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle del dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
    <div className="relative" ref={dropdownRef}>
      {/* Botón de perfil (solo visible si el usuario está autenticado) */}
      {isAuthenticated ? (
        <button 
          className="flex items-center gap-2.5 py-0 px-4 h-[40px] text-[#f6f6f6] bg-[#2fc92c] hover:bg-green-600 border-0 rounded-2xl relative z-10 transition-all duration-300 ease-in-out shadow-md cursor-pointer"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="material-icons">account_circle</span>
          
          <span>Perfil</span>
          

          <span 
            className={`material-icons transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
          >
            expand_more
          </span>
        </button>
      ) : (
        // Botones de iniciar sesión (cuando el usuario no está autenticado)
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
      {isAuthenticated && (
        <div 
          className={`absolute right-0 top-[45px] w-[200px] bg-[#16bb13] rounded-lg overflow-hidden z-[50] transition-all duration-500 ease-in-out origin-top-right ${
            isOpen 
              ? 'opacity-100 scale-100 visible' 
              : 'opacity-0 scale-0 invisible'
          }`}
        >
              <Link to={"/perfil"} className="block px-4 py-2 text-white hover:bg-green-700 text-sm text-center rounded-t-lg">
                  Mi Perfil
                </Link>
                <Link to={"/historialreservas"} className="block px-4 py-2 text-white hover:bg-green-700 text-sm text-center ">
                  Historial de reservas
                </Link>
                <Link to={"/reservasactivas"} className="block px-4 py-2 text-white hover:bg-green-700 text-sm text-center">
                  Reservas activas
                </Link>
                <Link to={"/favoritos"} className="block px-4 py-2 text-white hover:bg-green-700 text-sm text-center">
                  Mis favoritos
                </Link>
                {/* <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-sm text-center">
                  Centro de ayuda
                </Link> */}
                <button
                  onClick={handleLogout}
                  className="w-full block px-4 py-2 text-white hover:bg-green-700 text-sm rounded-b-lg cursor-pointer"
                >
                  Cerrar Sesión
            </button>
        </div>
      )}
    </div>
  );
};

export default Header; // Exportamos el componente Header
