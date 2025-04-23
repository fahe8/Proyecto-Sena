import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "../src/pages/Login/firebaseconfig.js";
import { AuthProvider } from "./Provider/AuthProvider.jsx";
import { EmpresasProvider } from "./Provider/EmpresasProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EmpresasProvider>
      <AuthProvider>
          <App />
      </AuthProvider>
    </EmpresasProvider>
  </StrictMode>
);
