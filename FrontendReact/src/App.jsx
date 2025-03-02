import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Inicio from "./pages/Inicio/Inicio";
import Calendario from "./pages/Calendario/calendario";



//hola
import Login from "./pages/Login/LogIn";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
