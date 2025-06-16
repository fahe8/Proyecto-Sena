import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Inicio/balonRoto.png";

const HeaderPropietario = ({ empresa, propietario }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    window.localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  return (
    <header className="bg-green-800 shadow-lg">
      <div className="container flex justify-between items-center p-8 md:px-20 mx-auto">
        {/* Logo y nombre */}
        <div
          className="flex items-center gap-2  font-bold cursor-pointer"
          onClick={() => navigate("/interfazpropietario")}
        >
          <div className="flex items-center justify-center bg-white w-10 h-10 rounded-full">
            <img src={logo} alt="Logo de mi cancha ya" className="w-10 md:w-7 lg:w-15" />
          </div>
          <span className="text-white text-base lg:text-lg">{empresa?.nombre || "Mi Empresa"}</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/formulario-canchas" className=" text-white hover:bg-[#005571] bg-[#003344] rounded-full py-1.5 px-5 transition shadow-lg text-center">Agregar Cancha</Link>

          {/* Botón de perfil propietario */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 py-1 px-4 h-[40px] text-white hover:bg-[#005571] bg-[#003344] border-0 rounded-2xl relative z-10 transition-all duration-200 ease-in-out shadow-lg cursor-pointer"
              onClick={toggleDropdown}
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <span className="material-icons">account_circle</span>
              <span className="hidden md:block">{propietario?.nombre || "Propietario"}</span>
              <span className={`material-icons transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
            {/* Menú desplegable */}
            <div
              className={`absolute right-0 top-[45px] w-[200px] bg-[#003344] rounded-lg overflow-hidden z-[50] transition-all duration-500 ease-in-out origin-top-right ${
                isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-0 invisible'
              }`}
            >
              <Link to="/perfiladministrador" className="block px-4 py-2 text-white hover:bg-[#005571] text-sm text-center rounded-t-lg">
                Perfil
              </Link>
              <Link to="/reservaspasadas" className="block px-4 py-2 text-white hover:bg-[#005571] text-sm text-center">
                Reservas pasadas
              </Link>
              <Link to="/reservaspendientes" className="block px-4 py-2 text-white hover:bg-[#005571] text-sm text-center">
                Reservas pendientes
              </Link>
              <button
                onClick={handleLogout}
                className="w-full block px-4 py-2 text-white hover:bg-red-500 text-sm rounded-b-lg cursor-pointer"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
          </div>
        
      </div>
    </header>
  );
};

export default HeaderPropietario;