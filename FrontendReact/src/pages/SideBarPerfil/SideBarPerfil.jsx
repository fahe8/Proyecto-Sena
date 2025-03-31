import React from "react";
import { Outlet } from "react-router-dom";

import iconoCorazon from "../../assets/Perfil/corazon.svg";
import iconoArchivo from "../../assets/Perfil/archive.svg";
import iconoReciente from "../../assets/Perfil/recent.svg";
import iconoPerfil from "../../assets/Perfil/iconoPerfil.svg";
import logo from "../../assets/logo.png";
import logOut from "../../assets/Perfil/logout.svg";

import "./sidebar.css";

const opciones = [
  { nombre: "Información Personal", icono: iconoPerfil },
  { nombre: "Reservas", icono: iconoReciente },
  { nombre: "Historial de Reservas", icono: iconoArchivo },
  { nombre: "Canchas Favoritas", icono: iconoCorazon },
  { nombre: "No Recomendado", icono: iconoCorazon },
];

const SideBarPerfil = () => {
  return (
    <div className=" flex flex-row ">
      <div className="h-screen w-auto bg-green-400 group fixed z-10 ">
        <a href=""><img className="w-8 h-8 mx-auto my-4" src={logo} alt="Logo" />
         
        </a>
        <ul className="space-y-4">
          {opciones.map((opcion, index) => (
            <li
              key={index}
              className="flex items-center p-2 rounded-lg hover:bg-gray-400 cursor-pointer relative"
            >
              <a href="" className="flex items-center w-full">
              {/* Imagen con tamaño fijo */}
              <div className="w-8 h-8 flex justify-center items-center  rounded-full shrink-0">
                
                <img
                  src={opcion.icono}
                  alt={opcion.nombre}
                  className="w-6 h-6"
                />
          
              </div>

              {/* Texto oculto inicialmente pero que aparece suavemente */}
              <span className=" text-gray-800 font-normal text-sm overflow-hidden whitespace-nowrap transition-all duration-500 max-w-0 group-hover:max-w-xs group-hover:ml-3">
                {opcion.nombre}
              </span>
              </a>
            </li>
          ))}
        </ul>
       
      <div className="absolute bottom-0 left-0 w-full items-center justify-center">
        <button
          className="flex items-center justify-center w-full p-2 bg-red-500  hover:bg-white hover:stroke-red-500 transition-colors cursor-pointer">
          <img src={logOut} alt="Cerrar sesión" className="w-6 h-6" />
        </button>
      </div>
        
      </div>

      <Outlet />
    </div>
  );
};

export default SideBarPerfil;
