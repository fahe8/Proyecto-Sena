import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider"; // Importamos el contexto de autenticación
import logo from "../../assets/logo.png";
import iconoCerrarSesion from "../../assets/Perfil/cerrarSesion.svg";

const SideBarPerfil = ({opciones = [], bgClass = "bg-[#003044]", activeClass = "bg-[#1a6079]", hoverClass = "hover:bg-[#1a6079]", logoNavigate = "/"}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [urlActual, seturlActual] = useState(location.pathname);
  const sidebarRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(60);
  const { cerrarSesion } = useAuth(); // Obtenemos la función cerrarSesion del contexto de autenticación

  
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

  const handleLogout = () => {
      try {
        cerrarSesion(); // Utiliza la función cerrarSesion del AuthProvider
        console.log("Cierre de sesión exitoso");
        
        navigate("/login"); // Redirige a la página de inicio de sesión usando navigate en lugar de window.location
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

  return (
    <div className="flex flex-row relative min-h-screen">
      <div
        ref={sidebarRef}
        className={`fixed h-screen w-auto group-hover:max-w-xs group flex flex-col z-20 ${bgClass}`}
      >
        <div className="flex items-center pt-5 justify-center cursor-pointer mb-5" onClick={() => navigate(logoNavigate)}>
          <img src={logo} className="w-8 h-auto mx-auto" alt="Logo-MiCanchaYa" />
        </div>
        <ul className="flex flex-col items-center h-full">
          {opciones?.map((opcion, index) => (
            <li
              key={index}
              onClick={() => cambiarRutas(opcion.url)}
              className={`flex items-center justify-center w-full h-10 px-2 cursor-pointer
                ${hoverClass}
                ${urlActual == opcion.url ? activeClass : ""}
              `}
              style={{
                margin: 0,
                paddingTop: 0,
                paddingBottom: 0,
                lineHeight: 1,
              }}
            >
              <a href="#" className="flex items-center w-full">
                <img
                  src={opcion.icono}
                  alt={opcion.nombre}
                  className="w-6 h-6 mx-1 filter invert"
                />
                <span className=" text-gray-200 font-normal text-sm overflow-hidden whitespace-nowrap transition-all duration-500 max-w-0 group-hover:max-w-xs group-hover:ml-3 group-hover:mr-3">
                  {opcion.nombre}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center hover:justify-normal hover:bg-red-500 cursor-pointer w-full p-2 mt-auto" onClick={handleLogout}>
          <a href="#" className="flex items-center w-full ">
            <img src={iconoCerrarSesion} alt={""} className="w-6 h-6 filter invert" />
            <span className="text-center text-gray-200 font-normal text-sm overflow-hidden whitespace-nowrap transition-all duration-500 max-w-0 group-hover:max-w-xs group-hover:ml-3">
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