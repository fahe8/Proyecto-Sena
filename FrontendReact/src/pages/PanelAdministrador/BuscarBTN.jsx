import React, { useEffect, useRef, useState } from "react";

const BuscarBTN = () => {
  // Estados
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [search, setSearch] = useState("");

  // Referencias
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Detectar si es dispositivo móvil o tablet al cargar
  useEffect(() => {
    const checkDevice = () => {
      const isMobileOrTablet = window.innerWidth <= 1000;
      setIsMobileOrTablet(isMobileOrTablet);
      setIsOpen(isMobileOrTablet); 
    };
    
    // Verificar al inicio
    checkDevice();
    
    // Verificar cuando cambie el tamaño de la ventana
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Abrir/Cerrar el input
  const handleClick = () => {
    // En dispositivos móviles/tablets, solo permitir cerrar si hay texto
    if (isMobileOrTablet && !isOpen) {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (isMobileOrTablet && search.length === 0) {
      // No cerrar en móvil/tablet si está vacío
      inputRef.current?.focus();
    } else {
      setIsOpen((prev) => {
        const nextState = !prev;
        if (nextState) {
          setTimeout(() => inputRef.current?.focus(), 100);
        } else {
          setSearch("");
        }
        return nextState;
      });
    }
  };

  const handleChange = (e) => setSearch(e.target.value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        (!isMobileOrTablet || (isMobileOrTablet && search.length > 0))
      ) {
        // En móvil/tablet solo cerrar si hay texto
        if (!isMobileOrTablet || (isMobileOrTablet && search.length > 0)) {
          setIsOpen(false);
          setSearch("");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOrTablet, search]);

  const shouldShowCloseIcon = isOpen && !isMobileOrTablet;

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
      <div className="relative text-center">
        <div
          ref={containerRef}
          className={`border border-green-400 relative inline-flex items-center p-1 rounded-full transition-all duration-400  ${
            isOpen
              ? "bg-opacity-100 bg-white"
              : "hover:bg-gray-50"
          }`}
        >
          <input
            ref={inputRef}
            onChange={handleChange}
            placeholder="Buscar..."
            value={search}
            type="text"
            className={`max-w-0 p-0 outline-none bg-transparent text-gray-800 font-['Poppins'] text-base sm:text-lg transition-all duration-400 ${
              isOpen 
                ? "max-w-[300px] px-3 flex-grow" 
                : ""
            }`}
          />
          <button
            onClick={handleClick}
            className={`flex-shrink-0 flex items-center justify-center w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full text-xl sm:text-2xl transition-all duration-300 cursor-pointer ${
              isOpen
                ? "bg-green-400 text-white" 
                : "bg-green-400 text-white"
            }`}
          >
            {shouldShowCloseIcon ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuscarBTN; 