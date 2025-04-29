import React, { useState, useEffect, useRef } from "react";
import { HistorialReservasData } from "./ReservaPruebaData";

const HistorialReservas = () => {
  
  // Estado para controlar la visibilidad del menú desplegable de filtro
  const [mostrar, setmostrar] = useState(false);

  // Estado para almacenar el término de búsqueda
  const [BuscarTerm, setBuscarTerm] = useState("");
  
  // Estado para almacenar las reservas filtradas por búsqueda y ordenamiento
  const [reservaFiltrada, setReservaFiltrada] = useState(HistorialReservasData);
  
  // Estado para almacenar los datos originales de las reservas
  const [HistoialCanchas, setHistoialCanchas] = useState(HistorialReservasData);
  
  // Estado para controlar el texto mostrado en el botón de filtro
  const [TextoBoton, setTextoBoton] = useState("Ordenar");

  // Referencias para detectar clics fuera del menú desplegable
  const mostrarRef = useRef(null);
  const buttonRef = useRef(null);


  // Función para manejar la búsqueda por nombre de cancha
  const ManejarBusqueda = (e) => {
    const value = e.target.value;
    setBuscarTerm(value);
    
    // Si el campo de búsqueda está vacío, muestra todas las reservas
    if (value.length === 0) {
      setReservaFiltrada(HistoialCanchas);
    } else {
      // Filtra las reservas por nombre de cancha
      const filtro = HistoialCanchas.filter(reserva =>
        reserva.NombreCancha.toLowerCase().includes(value.toLowerCase())
      );
      setReservaFiltrada(filtro);
    }
  };
  
  // Función para alternar la visibilidad del menú desplegable
  const mostraropciones = () => {
    setmostrar(!mostrar);
  };
  
  // Función para ordenar las reservas de más antigua a más reciente
  const MasAntiguo = () => {
    const OrdenAntiguo = [...reservaFiltrada].sort((a, b) => new Date(a.Fecha) - new Date(b.Fecha));
    setReservaFiltrada(OrdenAntiguo);
    setmostrar(false); 
    setTextoBoton("Antiguo");
  }

  // Función para ordenar las reservas de más reciente a más antigua
  const Masrecientes = () => {
    const OrdenReciente = [...reservaFiltrada].sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));
    setReservaFiltrada(OrdenReciente);
    setmostrar(false); 
    setTextoBoton("Reciente");
  }

  // Función para formatear la fecha al estilo español (día, mes, año)
  const cambiarFormatoFecha = (fecha) => {
    const opciones = { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" };
    const formato = new Date(fecha).toLocaleDateString("es-ES", opciones);
    return formato;
  }
  
  // Efecto para detectar clics fuera del menú desplegable y cerrarlo
  useEffect(() => {
    // Función para detectar clics fuera del menú
    const handleClickOutside = (event) => {
      // Verifica si el clic fue fuera del botón y fuera de las opciones
      if (mostrarRef.current && 
          !mostrarRef.current.contains(event.target) && 
          buttonRef.current && 
          !buttonRef.current.contains(event.target)) {
        setmostrar(false);
      }
    };

    // Si el menú está abierto, agrega un evento para detectar clics fuera de él
    if (mostrar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Limpia el evento al desmontar el componente o al cerrar el menú
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mostrar]);


  return (
    <div className="min-h-screen w-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003044] mb-2">Historial de Reservas</h1>
          <p className="text-gray-600">Gestiona tus reservas anteriores y próximas</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <input 
                id="buscador" 
                onChange={ManejarBusqueda} 
                value={BuscarTerm} 
                name="Buscar" 
                placeholder="Buscar por nombre de cancha..." 
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#00c951] focus:ring-2 focus:ring-[#00c951] transition-all duration-300 outline-none" 
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button 
                ref={buttonRef}
                onClick={mostraropciones} 
                className="flex items-center justify-center px-6 py-3 bg-[#00c951] text-white rounded-lg hover:bg-[#00a844] transition-all duration-300 gap-2 min-w-[160px]"
              >
                <span>{TextoBoton}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mostrar && (
                <div ref={mostrarRef} className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-20 min-w-[160px] border border-gray-100">
                  <button className="w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors duration-200" onClick={Masrecientes}>Más recientes</button>
                  <button className="w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors duration-200" onClick={MasAntiguo}>Más antiguos</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          {reservaFiltrada.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl text-gray-600">No se han encontrado reservas registradas</p>
            </div>
          ) : (
            reservaFiltrada.map((cancha, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                  {/* Field Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={cancha.Image}
                      alt=""
                      className="w-20 h-20 rounded-lg object-cover shadow-md"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-[#003044]">{cancha.NombreCancha}</h3>
                      <p className="text-gray-600 text-sm">{cancha.Direccion}</p>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="flex flex-col justify-center space-y-3">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <svg className="w-5 h-5 text-[#00c951]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{cambiarFormatoFecha(cancha.Fecha)}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <svg className="w-5 h-5 text-[#00c951]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{cancha.HoraInicio} - {cancha.HoraFin}</span>
                    </div>
                  </div>

                  {/* Field Type and Price */}
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="px-4 py-2 bg-[#003044] text-white rounded-full text-sm">{cancha.TipoCancha}</span>
                    <p className="text-lg font-semibold text-[#00c951]">{cancha.CanchaTotal}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorialReservas;