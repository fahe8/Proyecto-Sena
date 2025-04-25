import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../pages/Login/firebaseconfig"; // Importamos la configuración de Firebase
import { signOut } from "firebase/auth"; // Importamos la función para cerrar sesión en Firebase


import logo from "../../assets/logo.png";
import iconoCerrarSesion from "../../assets/Perfil/cerrarSesion.svg";

const SideBarPerfil = ({opciones = []}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [urlActual, seturlActual] = useState(location.pathname);
  const sidebarRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(60);

  
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

  const handleLogout = async () => {
      try {
        await signOut(auth); // Cierra sesión en Firebase
        window.localStorage.removeItem("auth"); // Elimina datos de autenticación almacenados en localStorage
        console.log("Cierre de sesión exitoso");
  
        window.location.href = "/login"; // Redirige a la página de inicio de sesión
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

  return (
    <div className="flex flex-row relative h-screen">
      
      <div
        ref={sidebarRef}
        className="fixed h-screen py-3 w-auto group-hover:max-w-xs bg-[#003044] group flex flex-col justify-between z-20"
      >
        <div className="flex items-center justify-center cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} className="w-8 h-auto" alt="Logo-MiCanchaYa" />
        </div>
        <ul className="space-y-15  flex-col justify-center items-center  ">
          { opciones?.map((opcion, index) => (
            <li
              key={index}
              onClick={() => cambiarRutas(opcion.url)}
              className={`flex items-center p-2 hover:bg-[#1a6079] cursor-pointer ${
                urlActual == opcion.url && "bg-[#1a6079]"
              }`}
            >
              <a href="" className="flex items-center w-full ">
                <img
                  src={opcion.icono}
                  alt={opcion.nombre}
                  className="w-6 h-6 mx-1 justify-start filter invert"
                />
                <span className="text-center text-gray-200 font-normal text-sm overflow-hidden whitespace-nowrap transition-all duration-500 max-w-0 group-hover:max-w-xs group-hover:ml-3 group-hover:mr-3">
                  {opcion.nombre}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center hover:bg-red-500 cursor-pointer w-full p-2 " onClick={handleLogout}>
          <a href="" className="flex items-center w-full text-center gap-3">
          <img src={iconoCerrarSesion} alt={""} className="w-6 h-6 filter invert justify-start"/>
          
          <span className="text-center text-gray-200 font-normal text-sm overflow-hidden  whitespace-nowrap transition-all duration-500 max-w-0 group-hover:max-w-xs group-hover:ml-3">
            {"Cerrar Sesión"}
          </span>
          </a>
        </div>
      </div>
      <div style={{ width: sidebarWidth + "px" }}></div>
      <Outlet />
    </div>
  );
};

export default SideBarPerfil;