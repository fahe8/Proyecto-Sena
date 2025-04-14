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
    <div className="w-full min-h-screen container mx-auto px-4 md:px-6">
      <div className="flex items-center justify-center text-2xl sm:text-3xl md:text-4xl pt-4 md:pt-7">
        <h1>Historial de Reservas</h1>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 pt-4 md:pt-7 pb-3">
        {/* Campo de búsqueda */}
        <div className="flex items-center bg-gray-300 px-3 py-1.5 gap-2 rounded-lg w-full sm:w-auto">
          <label htmlFor="buscador"> 
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6 text-gray-800 dark:text-white cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </label>
          <input 
            id="buscador" 
            onChange={ManejarBusqueda} 
            value={BuscarTerm} 
            name="Buscar" 
            placeholder="Buscar reserva" 
            className="bg-transparent w-full outline-none" 
          />
        </div>

        {/* Menú desplegable para ordenar */}
        <div className="relative w-full sm:w-auto mt-2 sm:mt-0">
          <button 
            ref={buttonRef}
            onClick={mostraropciones} 
            className="flex items-center bg-gray-300 px-3 py-1.5 gap-2 rounded-lg hover:cursor-pointer w-full sm:w-auto justify-center sm:justify-start"
          >
            <span className="mr-2">{TextoBoton}</span>
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
              />
            </svg>
          </button>

          {/* Opciones de ordenamiento */}
          {mostrar && (
            <div ref={mostrarRef} className="absolute right-0 top-10 bg-gray-300 border-1 rounded-lg shadow-md z-20 w-full sm:w-auto">
              <div className="flex flex-col">
                <button className="py-2 px-6 text-left hover:bg-gray-100 hover:cursor-pointer hover:rounded-tr-lg hover:rounded-tl-lg" onClick={Masrecientes}>Reciente</button>
                <button className="py-2 px-6 text-left hover:bg-gray-100 hover:cursor-pointer hover:rounded-br-lg hover:rounded-bl-lg" onClick={MasAntiguo}>Antiguo</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Línea separadora */}
      <div className="mx-0 sm:mx-0,5 border-b-2 border-gray-400"></div>
      
      {/* Listado de reservas */}
      <div className="px-0 sm:px-0,5 overflow-x-auto">
        {/* Mensaje cuando no hay reservas */}
        {reservaFiltrada.length === 0 ? (
          <p className="flex items-center justify-center text-xl sm:text-2xl text-gray-600 pt-4">No se han encontrado reservas registradas</p>
        ) : ( 
          /* Mapeo de las reservas filtradas */
          reservaFiltrada.map((cancha, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 md:text-[14px] lg:text-base bg-gray-300 py-3 rounded-lg md:rounded-l-2xl md:rounded-tr-2xl min-h-fit md:h-28 mt-4 overflow-hidden">
              {/* Columna 1: Imagen y datos de la cancha */}
              <div className="flex flex-col md:flex-row gap-4 justify-items-center items-center border-b-2 md:border-b-0 md:border-r-2 border-gray-500 px-4">
                <div className="min-w-[100px] md:min-w-[60px] lg:min-w-[100px]"> 
                  <img
                    src={cancha.Image}
                    alt=""
                    className="rounded-full w-[100px] h-[100px] md:w-[60px] md:h-[60px] lg:w-[100px] lg:h-[100px] object-cover"
                  />
                </div>
            
                <div className="flex flex-col justify-between text-center md:text-left mt-2 md:mt-0">
                  <h2 className="font-semibold">{cancha.NombreCancha}</h2>
                  <p className="font-semibold md:text-[11px] lg:text-[16px] lg:mt-2">
                    {cancha.Direccion}
                  </p>
                </div>
              </div>
              
              {/* Columna 2: Fecha y hora de la reserva */}
              <div className="flex flex-col gap-4 px-4 md:px-4 lg:px-8 xl:px-16 lg:mx-0 justify-center py-3 md:py-0 border-gray-500 border-b-2 md:border-b-0">
                {/* Fecha de la reserva */}
                <div className="flex gap-2 items-center justify-center md:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 md:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                  <p>{cambiarFormatoFecha(cancha.Fecha)}</p>
                </div>
                
                {/* Horario de la reserva */}
                <div className="flex gap-2 items-center justify-center md:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 md:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <p>{cancha.HoraInicio} - {cancha.HoraFin}</p>
                </div>
              </div>
              
              {/* Columna 3: Tipo de cancha y precio total */}
              <div className="flex flex-col md:border-l-2 border-gray-500 px-4 items-center justify-center gap-2.5 py-3 md:py-0">
                <p className="bg-gray-400 px-3 py-1.5 rounded-full">{cancha.TipoCancha}</p>
                <p>Total: {cancha.CanchaTotal}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorialReservas;