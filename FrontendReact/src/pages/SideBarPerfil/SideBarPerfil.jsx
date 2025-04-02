import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import iconoCorazon from "../../assets/Perfil/corazon.svg";
import iconoArchivo from "../../assets/Perfil/archive.svg";
import iconoReciente from "../../assets/Perfil/recent.svg";
import iconoPerfil from "../../assets/Perfil/iconoPerfil.svg";
import logo from "../../assets/logo.png";
import iconoCerrarSesion from "../../assets/Perfil/cerrarSesion.svg";
import iconoUnlike from "../../assets/Perfil/Unlike.svg";

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
      url: "/ReservasActivas",
    },
    {
      nombre: "Historial de Reservas",
      icono: iconoArchivo,
      url: "/historialReservas",
    },
    { nombre: "Canchas Favoritas", icono: iconoCorazon, url: "/favoritos" },
    { nombre: "No Recomendado", icono: iconoUnlike, url: "/norecomendadas" },
  ];

  const cambiarRutas = (url) => {
    seturlActual(url);
    navigate(url);
  };

  useEffect(() => {
    const updateWidth = () => {
      if (sidebarRef.current) {
        console.log(sidebarRef.current.offsetWidth);
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
        className="fixed h-screen py-3 w-auto group-hover:max-w-xs bg-[#2fe14d] group flex flex-col justify-between z-20"
      >
        <div className="flex items-center justify-center">
          <img src={logo} className="w-8 h-auto" alt="Logo-MiCanchaYa" />
        </div>
        <ul className="space-y-15  flex-col justify-center items-center">
          {opciones.map((opcion, index) => (
            <li
              key={index}
              onClick={() => cambiarRutas(opcion.url)}
              className={`flex items-center p-2 hover:bg-green-700 cursor-pointer${
                urlActual == opcion.url && "bg-green-700"
              }`}
            >
              <a href="" className="flex items-center w-full">
                <img src={opcion.icono} alt={opcion.nombre} className="w-6 h-6 mx-1"/>
                <span className=" text-gray-200 font-normal text-sm overflow-hidden whitespace-nowrap transition-all duration-500 max-w-0 group-hover:max-w-xs group-hover:ml-3">
                  {opcion.nombre}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center rounded-lg hover:bg-green-700 cursor-pointer w-full p-2">
          <img src={iconoCerrarSesion} alt={""} className="w-6 h-6" />
          <span className=" text-gray-200 font-normal text-sm overflow-hidden whitespace-nowrap transition-all duration-500 max-w-0 group-hover:max-w-xs group-hover:ml-3">
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
