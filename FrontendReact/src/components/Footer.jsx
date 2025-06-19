import React from 'react';
import { MapPin, Phone, Mail, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'; // Asegúrate de tener un logo en esta ruta
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white relative w-full">
      {/* Botón volver arriba */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
        aria-label="Volver arriba"
      >
        <ChevronUp size={24} className="text-white" />
      </button>

      {/* Contenido principal horizontal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-15 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-12">
          
          {/* Logo y descripción */}
          <div className="flex-shrink-0 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mr-3">
                <img src={Logo} alt="" />
              </div>
              <h3 className="text-xl font-bold">Mi Cancha Ya</h3>
            </div>
            <p className="text-gray-300 text-sm max-w-xs">
              Reserva tu cancha de fútbol de forma rápida y segura en todo Ibagué.
            </p>
          </div>

          {/* Enlaces rápidos horizontales
          <div className="flex-1">
            <div className="flex flex-wrap justify-center lg:justify-center gap-x-8 gap-y-2">
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm whitespace-nowrap">Buscar Canchas</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm whitespace-nowrap">Mis Reservas</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm whitespace-nowrap">Registrar Cancha</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm whitespace-nowrap">Cómo Funciona</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm whitespace-nowrap">Preguntas Frecuentes</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm whitespace-nowrap">Soporte</a>
            </div>
          </div> */}

          {/* Contacto y redes sociales */}
          <div className="flex-shrink-0 text-center lg:text-right">
            <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-end space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-0 lg:space-y-2">
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <div className="flex items-center">
                  <Phone size={14} className="text-green-600 mr-1" />
                  <span>+57 3214650172</span>
                </div>
                <div className="flex items-center">
                  <Mail size={14} className="text-green-600 mr-1" />
                  <span>contactoleidev@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className=" md:flex-row justify-between items-center space-y-3 md:space-y-0 text-center">
            
            <div className="text-gray-400 text-sm mb-3">
              © {currentYear} Mi Cancha Ya. Todos los derechos reservados.
            </div>

            {/* Enlaces legales horizontales */}
            <div className="flex flex-wrap justify-center space-x-1 sm:space-x-4">
              <Link to="/politica-privacidad" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm px-2 py-1">
                Política de Privacidad
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/terminos-condiciones" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm px-2 py-1">
                Términos y Condiciones
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/politica-cookies" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm px-2 py-1">
                Política de Cookies
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;