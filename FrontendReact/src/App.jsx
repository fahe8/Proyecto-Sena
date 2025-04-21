import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Inicio from "./pages/Inicio/Inicio";
import Login from "./pages/Login/Login";
import Cliente from "./pages/Cliente/PerfilUsuario";
import NuevaPagina from "./pages/nuevapagina/NuevaPagina";
import SideBarPerfil from "./pages/SideBarPerfil/SideBarPerfil";
import Favoritos from "./pages/Favoritos/Favoritos";
import PerfilPage from "./pages/Perfil/Perfil";
import NoRecomendadas from "./pages/NoRecomendadas/NoRecomendadas";
import Reservas from "./pages/Reservas/ReservasActivas";
import RutasProtegidas from "./utils/rutasProtegidas";
import FormularioEmpresa from "./pages/FormularioEmpresa/FormEmpresa";
import HistorialReservas from "./pages/HistorialReservas/HistorialReservas";

import iconoCorazon from "./assets/Perfil/corazon.svg";
import iconoArchivo from "./assets/Perfil/archive.svg";
import iconoReciente from "./assets/Perfil/recent.svg";
import iconoPerfil from "./assets/Perfil/iconoPerfil.svg";
import iconoUnlike from "./assets/Perfil/Unlike.svg";

function App() {

  const opciones = [
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
    {
      nombre: "No Recomendado",
      icono: iconoUnlike,
      url: "/norecomendadas",
    },
  ]

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nueva" element={<NuevaPagina />} />
        <Route path="/login" element={<Login />} />
        <Route path="/empresa/:nombre" element={<Cliente />} />
        <Route path="/formulario-empresa" element={<FormularioEmpresa />} />

        {/* Rutas protegidas */}
        <Route element={<RutasProtegidas />}>
          {/* Subrutas protegidas que usan SideBarPerfil */}
          <Route
            element={
              <SideBarPerfil
              opciones={
                opciones
                }
              />
            }
          >
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/reservasactivas" element={<Reservas />} />
            <Route path="/historialReservas" element={<HistorialReservas />} />
            <Route path="/norecomendadas" element={<NoRecomendadas />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
