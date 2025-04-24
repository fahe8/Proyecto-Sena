import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Usuario autenticado:", user);
        setIsAuthenticated(true);
        setUser(user);
        const token = await user.getIdToken();
        setToken(token);
      } else {
        console.log("Usuario no autenticado");
        setIsAuthenticated(false);
        setUser(null);
        setToken("");
      }
      setLoading(false); // Marcar como finalizada la verificación
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar
  }, [auth]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
