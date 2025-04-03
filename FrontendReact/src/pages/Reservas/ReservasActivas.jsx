import React, { useState } from "react";

const svgs = {
  gps: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  ),
  calendar: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9.75v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
      />
    </svg>
  ),
  clock: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  ),
  football: (
    <svg
      fill="#000000"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xml:space="preserve"
      className="size-4.5"
    >
      <g>
        <g>
          <path
            d="M0,71.442v369.116h512V71.442H0z M273.86,205.491c20.788,7.373,35.721,27.225,35.721,50.509s-14.933,43.137-35.721,50.509
			V205.491z M35.721,190.512h47.628v130.977H35.721V190.512z M238.14,306.509c-20.788-7.373-35.721-27.225-35.721-50.509
			c0-23.284,14.933-43.137,35.721-50.509V306.509z M238.14,168.494c-40.712,8.297-71.442,44.38-71.442,87.506
			s30.729,79.208,71.442,87.506v61.332H35.721v-47.628h59.535c13.131,0,23.814-10.683,23.814-23.814V178.605
			c0-13.131-10.683-23.814-23.814-23.814H35.721v-47.628H238.14V168.494z M476.279,321.488h-47.628V190.512h47.628V321.488z
			 M476.279,154.791h-59.535c-13.131,0-23.814,10.683-23.814,23.814v154.791c0,13.131,10.683,23.814,23.814,23.814h59.535v47.628
			H273.86v-61.332c40.712-8.297,71.442-44.38,71.442-87.506s-30.73-79.208-71.442-87.506v-61.332h202.419V154.791z"
          />
        </g>
      </g>
    </svg>
  ),
  money: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  ),
};

const ReservasActivas = () => {
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto mt-20 px-3">
      {/* Título de la sección */}
      <h2 className="font-bold text-center text-xl">RESERVAS ACTIVAS</h2>
      <hr className="font-bold border-t-2 p-1 mt-2" />

      {/* Cancha la 64 - Card Container */}
      <div className="bg-gray-200 rounded-lg shadow-md mt-4 overflow-hidden">
        {/* Main Card Info */}
        <div className="p-4 grid grid-cols-2">
          <div className="flex items-center gap-4">
            {/* Circular green indicator */}
            <div className="w-10 h-10 bg-green-500 rounded-full"></div>
            {/* Location info */}
            <div>
              <h3 className="font-bold">Canchas la 64</h3>
             <span className="flex">
              <div>{svgs.gps}</div>
             <p className="text-sm">Avenida 64 con carrera 9, Jordan</p>
             </span>
            </div>
          </div>

          {/* Button for description */}
          <div className="flex justify-end items-center">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
              onClick={() => setMostrarDescripcion(!mostrarDescripcion)}
            >
              {mostrarDescripcion ? "Ocultar" : "Descripción"}
            </button>
          </div>
        </div>

        {/* Expandable Description Section */}
        {mostrarDescripcion && (
          <div className="bg-gray-100 p-4 border-t border-gray-300">
            <h4 className="font-medium mb-2">Descripción de reserva</h4>

            <div className="grid grid-cols-2 gap-4">
              {/* Left column - Date and Time */}
              <div className="border-r border-gray-300 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  {svgs.calendar}
                  <span>15 de Marzo 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  {svgs.clock}
                  <span>09:00PM - 10:00 PM</span>
                </div>
              </div>

              {/* Right column - Court Type and Price */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {svgs.football}
                  <span>Cancha futbol 5</span>
                </div>
                <div className="flex items-center gap-2">
                  {svgs.money}
                  <span>Total: 70.000</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/*Aca colo otro igual a lo que realice  al principio*/}
    </div>
  );
};

export default ReservasActivas;
