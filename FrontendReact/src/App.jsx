import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import Inicio from "./pages/Inicio/Inicio";
import NuevaPagina from "./pages/nuevapagina/NuevaPagina"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nueva" element={<NuevaPagina />} />
      </Routes>
    </Router>
  );
}

export default App;
