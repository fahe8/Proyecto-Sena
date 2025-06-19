import React, { use, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../../Provider/AuthProvider";
import Header from "../../Header/Header";
import { BusquedaFiltros } from "../../Header/Componentes/BusquedaFiltros";
import CardEmpresa from "./componentes/CardEmpresa";
import { useEmpresas } from "../../Provider/EmpresasProvider";
import balonroto from "../../assets/Inicio/balonRoto.png";
import { authServicio, empresaServicio } from "../../services/api";
import CardLoader from "./componentes/CardLoader";
import LogPopUp from "../Login/components/logPopUp";
import { obtenerToken } from "../../utils/authLocalStorage";

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
        const response = await empresaServicio.obtenerEmpresasActivas();
        if (response.data.success) {
          setEmpresas(response.data.data);
          console.log(response.data.data)
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


  const enviarCorreoVerificacion = async () => {
    try {
      const token = obtenerToken();
      console.log(token)
      if (!token) {
        setPopup({
          show: true,
          message: "No estás autenticado",
          subText: "Por favor, inicia sesión para enviar el correo de verificación."
        });
        return;
      }

      const response = await authServicio.enviarCorreoVerificacion(token);
      if (response.data.success) {
        setPopup({
          show: true,
          message: "Correo de verificación enviado",
          subText: "Revisa tu bandeja de entrada para verificar tu correo electrónico."
        });
      } else {
        setPopup({
          show: true,
          message: "Error",
          subText: response.data.message || "Por favor, intenta nuevamente más tarde."
        });
      }
    } catch (error) {
      console.error("Error enviando correo de verificación:", error);
      setPopup({
        show: true,

        message: "Error",
        subText: "Por favor, intenta nuevamente más tarde."
      });
    }
  }
  return (
    <>
      <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main >
          <div className="lg:hidden">
            <BusquedaFiltros />
          </div>
          <section className="grid container mx-auto gap-4 mt-10">
           
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
      </div>
    </>
  );
};

const ListaEmpresas = ({ empresas }) => {
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

export default Inicio;