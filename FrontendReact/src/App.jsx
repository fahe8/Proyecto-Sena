import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Inicio from "./pages/Inicio/Inicio";
import Login from "./pages/Login/Login";
import Cliente from "./pages/Cliente/PerfilUsuario";
import SideBarPerfil from "./pages/SideBarPerfil/SideBarPerfil";
import Favoritos from "./pages/Favoritos/Favoritos";
import PerfilPage from "./pages/Perfil/Perfil";
import Reservas from "./pages/Reservas/ReservasActivas";
import RutasProtegidas from "./utils/RutasProtegidas";
import FormularioEmpresa from "./pages/FormularioEmpresa/FormEmpresa";
import FormularioCanchas from "./pages/FormularioEmpresa/InfoCanchas";
import HistorialReservas from "./pages/HistorialReservas/HistorialReservas";
import InterfazPropietario from "./pages/PanelPropietario/InterfazPropietario";
import PerfilPropietario from "./pages/PanelPropietario/PerfilPropietario";
import ReservasActivas from "./pages/PanelPropietario/ReservasActivas";
import ReservasPasadas from "./pages/PanelPropietario/ReservasPasadas";

import iconoCorazon from "./assets/Perfil/corazon.svg";
import iconoArchivo from "./assets/Perfil/archive.svg";
import iconoReciente from "./assets/Perfil/recent.svg";
import iconoPerfil from "./assets/Perfil/iconoPerfil.svg";
import iconoUnlike from "./assets/Perfil/Unlike.svg";
import IconoHome from "./assets/Inicio/Home.svg";
import AgregarCancha from "./pages/PanelPropietario/Componentes/AgregarCancha";

function App() {

  const opcionesUsuario = [
    {
      nombre: "Inicio",
      icono: IconoHome,
      url: "/",
    },

    {
      nombre: "Información Personal",
      icono: iconoPerfil,
      url: "/perfil",
    },
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
    {
      nombre: "Canchas Favoritas",
      icono: iconoCorazon,
      url: "/favoritos",
    },

  ]

  const opcionesEmpresario = [
    {
      nombre: "Inicio",
      icono: IconoHome,
      url: "/",
    },
    {
      nombre: "Interfaz pro",
      icono: IconoHome,
      url: "/InterfazPropietario",
    },
    {
      nombre: "Perfil ",
      icono: iconoPerfil,
      url: "/PerfilPropietario",
    },
    {
      nombre: "Reservas Pasadas",
      icono: iconoReciente,
      url: "/ReservasPasadas",
    },
    {
      nombre: "Reservas Activas",
      icono: iconoReciente,
      url: "/ReservasActivas",
    },
    
  ]

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/empresa/:id" element={<Cliente />} />
        <Route path="/formulario-empresa" element={<FormularioEmpresa />} />
        <Route path="/formulario-canchas" element={<AgregarCancha/>}/>

        {/* Rutas protegidas */}
        {/* Rutas de USUARIO */}
        <Route element={<RutasProtegidas />}>
          {/* Subrutas protegidas que usan SideBarPerfil */}
          <Route
            element={
              <SideBarPerfil
              opciones={
                opcionesUsuario
                }
              />
            }
          >
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/reservasactivas" element={<Reservas />} />
            <Route path="/historialReservas" element={<HistorialReservas />} />
            {/* <Route path="/norecomendadas" element={<NoRecomendadas />} /> */}
          </Route>

        <Route element={<SideBarPerfil
              opciones={
                opcionesEmpresario
                }
              />
            }
          >
            <Route path="/" element={<Inicio/>} />
            <Route path="/InterfazPropietario" element={<InterfazPropietario />} />
            <Route path="/PerfilPropietario" element={<PerfilPropietario />} />
            <Route path="/ReservasActivas" element={<ReservasActivas />} />
            <Route path="/ReservasPasadas" element={<ReservasPasadas />} />
          
        </Route>

        </Route>
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
