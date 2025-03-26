import React from "react";
import { Outlet } from "react-router-dom";

import iconoCorazon from "../../assets/Perfil/corazon.svg";
import iconoArchivo from "../../assets/Perfil/archive.svg";
import iconoReciente from "../../assets/Perfil/recent.svg";
import iconoPerfil from "../../assets/Perfil/iconoPerfil.svg";

import "./sidebar.css";

const opciones = [
  { nombre: "Información Personal", icono: iconoPerfil },
  { nombre: "Reservas Activas", icono: iconoReciente },
  { nombre: "Historial de Reservas", icono: iconoArchivo },
  { nombre: "Canchas Favoritas", icono: iconoCorazon },
  { nombre: "No Recomendado", icono: iconoCorazon },
];

const SideBarPerfil = () => {
  return (
    <div className=" flex flex-row">
      <div className="h-screen w-auto bg-gray-300 px-2 group">
        <ul className="space-y-4">
          {opciones.map((opcion, index) => (
            <li
              key={index}
              className="flex items-center p-2 rounded-lg hover:bg-gray-400 cursor-pointer"
            >
              {/* Imagen con tamaño fijo */}
              <div className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded-full shrink-0">
                <img
                  src={opcion.icono}
                  alt={opcion.nombre}
                  className="w-6 h-6"
                />
              </div>

              {/* Texto oculto inicialmente pero que aparece suavemente */}
              <span className=" text-gray-800 font-medium overflow-hidden whitespace-nowrap transition-all duration-500 max-w-0 group-hover:max-w-xs group-hover:ml-3">
                {opcion.nombre}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default SideBarPerfil;
