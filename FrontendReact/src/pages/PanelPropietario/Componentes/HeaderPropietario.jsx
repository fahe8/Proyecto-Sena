import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CompanyIcon } from "../../../assets/IconosSVG/iconos";
import { useAuth } from "../../../Provider/AuthProvider";

const HeaderPropietario = ({ empresa, propietario }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { cerrarSesion } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    try {
      cerrarSesion(); // Utilizamos la función cerrarSesion del AuthProvider
      console.log("Cierre de sesión exitoso");
      navigate("/login"); // Redirigimos a la página de login usando navigate
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="bg-green-700 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 sm:px-10 lg:px-14">
        <div className="flex justify-between items-center">
          {/* Logo y nombre */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/interfazpropietario")}
          >
            {empresa?.logo ? (
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md transition-transform ">
                <img 
                  src={empresa.logo?.url} 
                  alt="Logo de la empresa" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/40?text=E';
                  }}
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center border-2 border-[#003344] shadow-md transition-transform">
                <CompanyIcon className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-white text-lg font-semibold tracking-wide">
                {empresa?.nombre || "Mi Empresa"}
              </span>
              <span className="text-green-100 text-xs">Panel de Administración</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-3 sm:gap-4">
          

            {/* Botón de perfil propietario */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2.5 px-4 h-[40px] text-[#f6f6f6] bg-[#2fc92c] hover:bg-green-600 border-0 rounded-2xl relative z-10 transition-all duration-300 ease-in-out shadow-md cursor-pointer"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <span className="material-icons">account_circle</span>
                <span className="hidden sm:block">{propietario?.nombre || "Propietario"}</span>
                <span className={`material-icons transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              
              {/* Menú desplegable */}
              <div
                className={`absolute right-0 top-[45px] w-[220px] bg-[#17c514] rounded-lg overflow-hidden z-[50] shadow-lg transition-all duration-500 ease-in-out origin-top-right ${
                  isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-0 invisible'
                }`}
              >
                
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
                
                <button
                  onClick={handleLogout}
                  className="w-full block px-4 py-2 text-white hover:bg-green-600 text-sm rounded-b-lg cursor-pointer transition-all duration-200 text-center"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPropietario;