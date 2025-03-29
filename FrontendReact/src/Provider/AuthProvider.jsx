import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { checkAndDeleteUnverifiedUser } from "../pages/Login/firebaseconfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user)
        setIsAuthenticated(true);
        const token = await user.getIdToken();
        setToken(token);
      } else {
        console.log("Usuario no autenticado");
        setIsAuthenticated(false);
        setToken("");
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
