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
import HistorialReservas from "./pages/HistorialReservas/HistorialReservas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nueva" element={<NuevaPagina />} />
        <Route path="/login" element={<Login />} />
        <Route path="/empresa/:nombre" element={<Cliente />} />

        {/* Rutas protegidas */}
        <Route element={<RutasProtegidas />}>
          {/* Subrutas protegidas que usan SideBarPerfil */}
          <Route element={<SideBarPerfil />}>
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/reservas" element={<Reservas />} />
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
