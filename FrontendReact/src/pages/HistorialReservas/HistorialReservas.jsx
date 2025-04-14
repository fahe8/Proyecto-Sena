import React, { useState } from "react";
import { HistorialReservasData } from "./ReservaPrueba";


const HistorialReservas = () => {

  
  
  //dropdown filtro
  const [mostrar, setmostrar] = useState (false);
  const mostraropciones = () => {
    setmostrar (!mostrar);
  };

  //muestra las reservas 
  const [HistorialCanchas, setHistorialCanchas] = useState (
    HistorialReservasData
  );

  //Clona el array y los ordena 
  const MasAntiguo = () => {
    const OrdenAntiguo = [...HistorialReservasData].sort((a, b) => new Date(a.Fecha) - new Date(b.Fecha));
    setHistorialCanchas(OrdenAntiguo)
  }

  const Masrecientes = () => {
    const OrdenReciente = [...HistorialReservasData].sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));
    console.log(OrdenReciente)
    setHistorialCanchas(OrdenReciente)
  }

  const  cambiarFormatoFecha =(fecha) => {
    const opciones = { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" };
  
  const formato = new Date(fecha).toLocaleDateString("es-ES", opciones);
    return formato;
  }
  

  return (
    <div className="w-full h-screen container mx-auto">
      <div className="flex items-center justify-center text-2xl pt-7">
        <h1>Historial de Reservas</h1>
      </div>

      <div className="flex items-center justify-between pt-7 pb-3 px-6 border-gray-400">
        <div className="flex items-center bg-gray-300 px-3 py-1.5 gap-2 rounded-lg">
          <svg
            className="w-6 h-6 text-gray-800"
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
          <input type="text" placeholder="Buscar reserva" />
        </div>
        <div className="relative">
          <button onClick={mostraropciones} className="flex items-center bg-gray-300 px-3 py-1.5 gap-2 rounded-lg hover:cursor-pointer">
            <span className="mr-2 b">Ordenar</span>  
            <svg
              className="w-6 h-6 text-gray-800 "
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
          {mostrar && (
            <div className="absolute right-0 top-10  bg-gray-300 border-1 rounded-[10px] shadow-md  z-20">
              <div className="flex flex-col">
                <button className="py-2 px-6 text-left hover:bg-gray-100 hover:cursor-pointer hover:rounded-tr-[10px] hover:rounded-tl-[10px] " onClick={Masrecientes}>Reciente</button>
                
                <button className="py-2 px-6 text-left hover:bg-gray-100 hover:cursor-pointer hover:rounded-br-[10px] hover:rounded-bl-[10px]" onClick={MasAntiguo}>Antiguo</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-6 border-b-2 border-gray-400"></div>
      <div className="px-6">
  
          {HistorialCanchas.length === 0 ? (
            <p className="flex items-center justify-center text-2xl text-gray-600 pt-4">No tienes ninguna reserva registrada</p>
          ) : ( 
          HistorialCanchas.map(cancha => (
            <div className="grid grid-cols-3 bg-gray-300 py-3 rounded-l-[20px] rounded-tr-[20px] h-28 mt-4">
            <div className="flex gap-4.5 border-r-2 border-gray-500 px-6">
              <div className="flex justify-center items-center">
                <img
                  src={cancha.Image}
                  alt=""
                  className="rounded-full w-28 h-18 object-cover"
                />
              </div>
              <div className="flex flex-col justify-between">
                <h2 className="font-semibold">{cancha.NombreCancha}</h2>
                <p className="font-semibold">
                  {cancha.Direccion}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-20 justify-center">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                <p>{cambiarFormatoFecha(cancha.Fecha)}</p>
              </div>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <p>{cancha.HoraInicio} - {cancha.HoraFin} </p>
              </div>
            </div>
            <div className="flex flex-col border-l-2 border-gray-500 px-4 items-center justify-center gap-2.5">
              <p className="bg-gray-400 px-3 py-1.5 rounded-[20px]">{cancha.TipoCancha}</p>
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