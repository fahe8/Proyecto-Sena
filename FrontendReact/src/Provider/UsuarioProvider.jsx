import React, { createContext, useContext, useEffect, useState } from "react";

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  // Este usuario es de ejemplo, esto debe hacer conexión con el backend
  const usuarioBackend = {
    usuario_id: 3,
    id_persona: 4,
    nombre: "Fabián",
    apellido: "Carrión",
    telefono: "",
    email: "fabiancarrion1@gmail.com",
  };

  const [usuario, setUsuario] = useState({
    id_usuario: 1,
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
  });

  useEffect(() => {
    // Simulación de traer el usuario desde el backend
    setUsuario({
      id_usuario: usuarioBackend.usuario_id,
      nombre: usuarioBackend.nombre,
      apellido: usuarioBackend.apellido,
      telefono: usuarioBackend.telefono,
      email: usuarioBackend.email,
    });
  }, []);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => useContext(UsuarioContext)
