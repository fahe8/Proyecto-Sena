import React, { use, useEffect, useRef, useState } from "react"; // Importamos React y hooks necesarios
import { Link, useNavigate, useLocation } from "react-router-dom"; // Importamos Link para la navegación entre páginas y useNavigate para redirecciones
import { useAuth } from "../Provider/AuthProvider"; // Importamos el contexto de autenticación
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

  const { isAuthenticated, cerrarSesion, user } = useAuth(); // Obtenemos el estado de autenticación del usuario
  // Dentro de BotonPerfil

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
  const handleLogout =  () => {
    cerrarSesion(); // Llamamos a la función de cerrar sesión del contexto de autenticación

  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón de perfil (solo visible si el usuario está autenticado) */}
      {isAuthenticated ? (
        <button 
          className="flex items-center gap-2.5 px-4 h-[40px] text-[#f6f6f6] bg-[#2fc92c] hover:bg-green-600 border-0 rounded-2xl relative transition-all duration-300 ease-in-out shadow-md cursor-pointer"
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
        // Botón de iniciar sesión (cuando el usuario no está autenticado)
        <div className="flex gap-2 text-center items-center">
          <Link
            to="/login"
            className="text-sm lg:text-[17px] flex justify-center items-center px-5 h-8 bg-[#2fc92c] rounded-2xl hover:bg-green-600 text-[#f6f6f6] cursor-pointer shadow-md transition-all duration-250"
          >
            Ingresar
          </Link>
        </div>
      )}

      {/* Menú desplegable */}
      {isAuthenticated && (
        <div 
          className={`absolute right-0 top-[45px] w-[200px] bg-[#17c514] rounded-lg overflow-hidden z-[50] transition-all duration-500 ease-in-out origin-top-right ${
            isOpen 
              ? 'opacity-100 scale-100 visible' 
              : 'opacity-0 scale-0 invisible'
          }`}
        >
         {/* Opciones para USUARIO */}
    {user?.rol_actual === "usuario" && (
      <>
        <Link to="/perfil" className="block px-4 py-2 text-white hover:bg-green-600 text-sm text-center rounded-t-lg transition-all duration-200">
          Mi Perfil
        </Link>
        <Link to="/historialreservas" className="block px-4 py-2 text-white hover:bg-green-600 text-sm text-center transition-all duration-200">
          Historial de reservas
        </Link>
        <Link to="/reservasactivas" className="block px-4 py-2 text-white hover:bg-green-600 text-sm text-center transition-all duration-200">
          Reservas activas
        </Link>
        <Link to="/favoritos" className="block px-4 py-2 text-white hover:bg-green-600 text-sm text-center transition-all duration-200">
          Mis favoritos
        </Link>
      </>
    )}

    {/* Opciones para PROPIETARIO */}
    {user?.rol_actual === "propietario" && (
      <>
        <Link to="/interfazpropietario" className="block px-4 py-2 text-white hover:bg-green-600 text-sm text-center rounded-t-lg transition-all duration-200">
          Panel Propietario
        </Link>
        <Link to="/perfiladministrador" className="block px-4 py-2 text-white hover:bg-green-600 text-sm text-center transition-all duration-200">
          Perfil propietario
        </Link>
        <Link to="/reservaspasadas" className="block px-4 py-2 text-white hover:bg-green-600 text-sm text-center transition-all duration-200">
          Reservas pasadas
        </Link>
        <Link to="/reservaspendientes" className="block px-4 py-2 text-white hover:bg-green-600 text-sm text-center transition-all duration-200">
          Reservas pendientes
        </Link>
        <Link to="/editarservicios" className="block px-4 py-2 text-white hover:bg-green-600 text-sm text-center transition-all duration-200">
          Editar servicios
        </Link>
      </>
    )}

    {/* Opciones para ADMINISTRADOR */}
    {user?.rol_actual === "admin" && (
      <>
        
        <Link to="/ListaUsuarios" className="block px-4 py-2 text-white hover:bg-green-600 text-sm text-center transition-all duration-200">
          Lista de usuarios
        </Link>
        <Link to="/ListaEmpresas" className="block px-4 py-2 text-white hover:bg-green-600 text-sm text-center transition-all duration-200">
          Lista de empresas
        </Link>
        
      </>
    )}
                
                <button
                  onClick={handleLogout}
                  className="w-full block px-4 py-2 text-white hover:bg-green-600 text-sm rounded-b-lg cursor-pointer transition-all duration-200 text-center"
                >
                  Cerrar Sesión
            </button>
        </div>
      )}
    </div>
  );
};

export default Header; // Exportamos el componente Header