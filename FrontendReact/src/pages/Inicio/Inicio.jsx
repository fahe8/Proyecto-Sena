import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../../Provider/AuthProvider";
import Header from "../../Header/Header";
import { BusquedaFiltros } from "../../Header/Componentes/BusquedaFiltros";
import CardEmpresa from "./componentes/CardEmpresa";
import { useEmpresas } from "../../Provider/EmpresasProvider";
import balonroto from "../../assets/Inicio/balonRoto.png";
import { empresaServicio } from "../../services/api";
import CardLoader from "./componentes/CardLoader";
import LogPopUp from "../Login/components/logPopUp";

const Inicio = () => {
  const { filteredOptions, setFilteredOptions, setEmpresas } = useEmpresas();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    subText: "",
  });

  useEffect(() => {
    if (location.state && location.state.showPopup) {
      setPopup({
        show: true,
        message: location.state.popupMessage,
        subText: location.state.popupSubText
      });
      
    
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await empresaServicio.obtenerTodos();
        if (response.data.success) {
          setEmpresas(response.data.data);
          setFilteredOptions(response.data.data);
        }
      } catch (error) {
        console.error("Error obteniendo empresas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmpresas();
  }, [setEmpresas, setFilteredOptions]);

  return (
    <>
      <Header />
      <main>
        <div className="lg:hidden">
          <BusquedaFiltros />
        </div>
        <section className="grid container mx-auto bg-white gap-4">
          <SeccionHerramientas />
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-self-center">
              {[...Array(8)].map((_, index) => (
                <CardLoader key={index} />
              ))}
            </div>
          ) : filteredOptions.length > 0 ? (
            <ListaEmpresas empresas={filteredOptions} />
          ) : (
            <div className="w-full flex flex-col justify-center items-center">
              <p className="w- text-center">No hay empresas</p>
              <img src={balonroto} alt="" width={600} />
            </div>
          )}
        </section>
      </main>

      {popup.show && (
        <LogPopUp
          setShowPopUp={(show) => setPopup({...popup, show})}
          message={popup.message}
          subText={popup.subText}
          onClose={() => setPopup({...popup, show: false})}
        />
      )}
    </>
  );
};

const ListaEmpresas = ({ empresas}) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-self-center"
      id="canchas-seccion"
    >
      {empresas?.map((empresa, index) => (
        <CardEmpresa empresa={empresa} mostrarFavorito={true} key={index + "a"} />
      ))}
    </div>
  );
};

const SeccionHerramientas = () => {
  const { isAuthenticated } = useAuth();
  const menuItems = [
    {
      text: "Historial de reservas",
      ref: "/historialReservas",
    },
    {
      text: "Reservas pendientes",
      ref: "/reservasactivas",
    },
    {
      text: "Mis favoritos",
      ref: "/favoritos",
    },
    
  ];
  return (
    <div className="flex flex-col gap-4 items-center self-start overflow-y-auto">
      <ul
        className=" grid grid-cols-4 justify-around mb-4 "
        id="menu-lista"
      >
        {menuItems?.map((item, index) => {
            index === menuItems.length - 1 ? "" : "border-r-2 border-gray-300";
          return (
            <li className="grid items-center" key={index + "b"}>
              <Link
                to={isAuthenticated ? item.ref : "/login"}
                className={`hover-items  text-center flex  text-[11px] lg:text-[15px] lg:py-2  xl:px-3  gap-2 justify-center items-center  hover:text-green-500 ${
              index === menuItems.length - 1 ? "" : ""
            } ${index === 0 ? "" : ""}  
            transition-colors duration-200`}
              >
                <span>{item.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Inicio;
