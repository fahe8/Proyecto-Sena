import React, { useState } from "react";
import "./nuevapagina.css";
import iconHistorialReserva from "../../assets/Inicio/recent.svg";
import iconPendiente from "../../assets/Inicio/archive.svg";
import iconBloqueado from "../../assets/Inicio/bloqueado.svg";
import iconReservaCancelada from "../../assets/Inicio/Reserva_cancelado.svg";
import iconReporteIngreso from "../../assets/Inicio/Reporte_ingreso.svg";
import ImagenCancha from "../../assets/Inicio/cancha.jpeg";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const NuevaPagina = () => {
  // Estado para manejar las canchas
  const [canchas, setCanchas] = useState([
    { id: 1, image: ImagenCancha, nombre: "Futbol 7", rating: 4.8 },
    { id: 2, image: ImagenCancha, nombre: "Futbol 5", rating: 4.8 },
    { id: 2, image: ImagenCancha, nombre: "Futbol 5", rating: 4.8 },
    { id: 2, image: ImagenCancha, nombre: "Futbol 5", rating: 4.8 },
    { id: 2, image: ImagenCancha, nombre: "Futbol 5", rating: 4.8 },
    { id: 2, image: ImagenCancha, nombre: "Futbol 5", rating: 4.8 },
  ]);

  // Función para eliminar cancha pero con swet
  const eliminarCancha = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setCanchas(canchas.filter((cancha) => cancha.id !== id));
        Swal.fire("¡Eliminado!", "La cancha ha sido eliminada.", "success");
      }
    });
  };
// FUNCION PARA DROP DE PERIL     
  const [mostrar, setMostrar] = useState(false);
  const mostraropciones = () => {
    setMostrar(!mostrar);
  };

  return (
    <div className="contenedor_empresario">
      <div className="container_header shadow-md">
        <div className="header_empresario">
          <div className="nom_empresa flex items-center gap-3 ">
            <div className="rueda"></div>
            <p>Nombre empresa</p>
          </div>
          <div className="botones_ flex gap-12 items-center">
            <button className="agregar_can">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
              <div className="text_bot">
                <span>Agregar canchas</span>
              </div>
            </button>
          
            <div className="perfil_container">
              <button onClick={mostraropciones} className="perfil_emp">
                <span>Profile</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </button>
              {mostrar && (
                <div className="perfil_dropdown">
                  <div className="dropdown_content">
                    <button className="config_perfil">Configurar perfil</button>
                    <button className="cerrar_sesion">Cerrar sesión</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <section className="main_emp">
        <div>
          {/* Sección lateral izquierdo - HERRAMIENTAS */}
          <SeccionHerramientas />
        </div>
        {/* Sección lateral derecho - Canchas */}
        <div className="canchas_container">
          <h2 className="canchas_title">Tus canchas</h2>

          {canchas.length === 0 ? (
            <p className="no_canchas">No tienes ninguna cancha registrada</p>
          ) : (
            <div className="canchas_grid">
              {canchas.map((cancha) => (
                <div key={cancha.id} className="cancha_card">
                  <div className="cancha_info">
                    <div className="imagen_cancha">
                      <img
                        className="imagen_cancha1"
                        src={cancha.image}
                        alt={cancha.nombre}
                      />
                    </div>
                  </div>
                  <div className="contenerdor_info">
                    <h3>{cancha.nombre}</h3>
                    <div className="rating">
                      <span className="star">★</span>
                      <span>{cancha.rating}</span>
                    </div>
                  </div>
                  <div className="cancha_actions">
                    <button className="btn_modificar">Modificar</button>
                    <button
                      className="btn_eliminar"
                      onClick={() => eliminarCancha(cancha.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const SeccionHerramientas = () => {
  const menuItems = [
    { text: "Reservas Previas", ref: "/", icon: iconHistorialReserva },
    { text: "Reservas pendientes", ref: "/", icon: iconPendiente },
    { text: "Usuarios Bloqueados", ref: "/", icon: iconBloqueado },
    { text: "Reservas Canceladas", ref: "/", icon: iconReservaCancelada },
    { text: "Reporte Ingreso", ref: "/", icon: iconReporteIngreso },
  ];

  return (
    <div class="pr-2 lg:border-r-2 border-gray-300 flex flex-col gap-4 items-center lg:sticky top-24 self-start lg:h-[600px] overflow-y-auto">
      <ul class="bg-gray-200 rounded-2xl" id="menu-lista">
        {menuItems?.map((item, index) => {
          const borderClass =
            index === menuItems.length - 1 ? "" : "border-b-2 border-gray-300";
          return (
            <li key={index + "b"}>
              <Link
                to={item.ref}
                className={`flex lg:text-sm  rounded-2xl lg:px-4 lg:py-6  xl:px-6 xl:py-8 gap-2 justify-center items-center ${borderClass} 
              hover:bg-gray-200 hover:text-green-500 
              transition-colors duration-300`}
              >
                <span>{item.text}</span>
                <img
                  src={item.icon}
                  alt="iconos correspondientes a la seccion"
                  width={20}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NuevaPagina;
