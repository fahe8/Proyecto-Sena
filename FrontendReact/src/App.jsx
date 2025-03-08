import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Inicio from "./pages/Inicio/Inicio";
import Calendario from "./pages/Calendario/calendario";
<<<<<<< HEAD
import Login from "./pages/Login/Login";
=======
import Login from "./pages/Login/LogIn";
import Cliente from "./pages/Cliente/PerfilUsuario";
>>>>>>> c67a165a58022eab149bc30f5428167b8c1caa67


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Cliente/>} />
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
