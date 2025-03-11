import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Inicio from "./pages/Inicio/Inicio";

import Login from "./pages/Login/Login";
import Cliente from "./pages/Cliente/PerfilUsuario";
import NuevaPagina from "./pages/nuevapagina/NuevaPagina";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nueva" element={<NuevaPagina />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:nombre" element={<Cliente/>} />
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
