import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import Inicio from "./pages/Inicio/Inicio";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
      </Routes>
    </Router>
  );
}

export default App;
