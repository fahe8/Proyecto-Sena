import React, { createContext, useContext, useEffect, useState } from "react";
import { authServicio } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      const storedToken = obtenerToken();

      if (storedToken) {
        try {
          const response = await authServicio.verificarToken(storedToken);
          setToken(storedToken);
          setIsAuthenticated(true);
          setUser(response.data.data.usuario); // Estás guardando los datos del usuario
        } catch (error) {
          console.error("Token inválido o expirado:", error);
          cerrarSesion();

        }finally {
          setLoading(false);
        }
      }
    };

    cargarUsuario();
  }, []);

  const guardarToken = (newToken) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("authToken");
    setToken("");
    setIsAuthenticated(false);
    setUser(null);
  };

  const obtenerToken = () => {
    return localStorage.getItem('authToken');
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        user,
        loading,
        guardarToken,
        cerrarSesion,
        setUser,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
