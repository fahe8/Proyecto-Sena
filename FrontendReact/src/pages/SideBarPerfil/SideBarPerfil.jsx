import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import iconoCorazon from "../../assets/Perfil/corazon.svg";
import iconoArchivo from "../../assets/Perfil/archive.svg";
import iconoReciente from "../../assets/Perfil/recent.svg";
import iconoPerfil from "../../assets/Perfil/iconoPerfil.svg";
import iconoCerrarSesion from "../../assets/Perfil/cerrarSesion.svg";

const SideBarPerfil = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [urlActual, seturlActual] = useState(location.pathname);
  const sidebarRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(60);

  const opciones = [
    { nombre: "Información Personal", icono: iconoPerfil, url: "/perfil" },
    {
      nombre: "Reservas Activas",
      icono: iconoReciente,
      url: "/reservasactivas",
    },
    {
      nombre: "Historial de Reservas",
      icono: iconoArchivo,
      url: "/historialReservas",
    },
    { nombre: "Canchas Favoritas", icono: iconoCorazon, url: "/favoritos" },
    { nombre: "No Recomendado", icono: iconoCorazon, url: "/noRecomendado" },
  ];

  const cambiarRutas = (url) => {
    seturlActual(url);
    navigate(url);
  };

  useEffect(() => {
    const updateWidth = () => {
      if (sidebarRef.current) {
        setSidebarWidth(sidebarRef.current.offsetWidth + 2);
      }
    };

    updateWidth(); // Obtener ancho inicial
    window.addEventListener("resize", updateWidth); // Recalcular en resize

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="flex flex-row relative h-screen">
      <div
        ref={sidebarRef}
        className=" absolute h-screen p-2 w-auto group-hover:max-w-xs bg-gray-300 group flex flex-col justify-between z-50 "
      >
        <ul className="space-y-4">
          {opciones.map((opcion, index) => (
            <li
              key={index}
              onClick={() => cambiarRutas(opcion.url)}
              className={`flex items-center p-2 rounded-lg hover:bg-gray-400 cursor-pointer ${
                urlActual == opcion.url && "bg-gray-500"
              }`}
            >
              {/* Imagen con tamaño fijo */}

              <img
                src={opcion.icono}
                alt={opcion.nombre}
                className="w-6 h-6 shrink-0"
              />

              {/* Texto oculto inicialmente pero que aparece suavemente */}
              <span className=" text-gray-800 font-medium overflow-hidden whitespace-nowrap transition-all duration-500 max-w-0 group-hover:max-w-xs group-hover:ml-3">
                {opcion.nombre}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center rounded-lg hover:bg-gray-400 cursor-pointer">
          {/* Imagen con tamaño fijo */}

          <img src={iconoCerrarSesion} alt={""} className="w-6 h-6" />

          {/* Texto oculto inicialmente pero que aparece suavemente */}
          <span className=" text-gray-800 font-medium overflow-hidden whitespace-nowrap transition-all duration-500 max-w-0 group-hover:max-w-xs group-hover:ml-3">
            {"Cerrar Sesión"}
          </span>
        </div>
      </div>
      <div style={{ width: sidebarWidth + "px" }}></div>
      <Outlet />
    </div>
  );
};

export default SideBarPerfil;
