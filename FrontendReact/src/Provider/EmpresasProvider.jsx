import React, { useState } from "react";
import { createContext, useContext } from "react";
import imagenCancha from "../assets/Inicio/cancha.jpeg";
import imagenCancha2 from "../assets/Inicio/cancha2.jpeg";
import imagenCancha3 from "../assets/Inicio/cancha3.jpeg";

const EmpresasContext = createContext();

export const EmpresasProvider = ({ children }) => {
  const copiaEmpresas = [
    {
      nombre: "Canchas la 64",
      calificacion: "4.8",
      imagenes: [imagenCancha, imagenCancha2, imagenCancha3],
      tipoCanchas: ["Futbol 5", "Futbol 7"],
      servicios: ["baños", "tienda", "parqueadero", "wifi"],
    },
    {
      nombre: "Canchas el triangulo",
      calificacion: "4.8",
      imagenes: [imagenCancha, imagenCancha2, imagenCancha3],
      tipoCanchas: ["Futbol 5", "Futbol 7"],
      servicios: ["baños", "tienda", "parqueadero", "wifi"],
    },
    {
      nombre: "Canchas la estacion",
      calificacion: "4.8",
      imagenes: [imagenCancha, imagenCancha2, imagenCancha3],
      tipoCanchas: ["Futbol 11", "Futbol 9"],
      servicios: ["baños", "tienda", "parqueadero", "wifi"],
    },
    {
      nombre: "Canchas de Futbol Calarca Junior",
      calificacion: "4.8",
      imagenes: [imagenCancha, imagenCancha2, imagenCancha3],
      tipoCanchas: ["Futbol 5", "Futbol 8"],
      servicios: ["baños", "tienda", "parqueadero", "wifi"],
    },
    {
      nombre: "Garzagol",
      calificacion: "4.8",
      imagenes: [imagenCancha, imagenCancha2, imagenCancha3],
      tipoCanchas: ["Futbol 5", "Futbol 7", "Futbol 8"],
      servicios: ["baños", "tienda", "parqueadero", "wifi"],
    },
    {
      nombre: "Canchas sintéticas chelsea fútbol club",
      calificacion: "4.8",
      imagenes: [imagenCancha, imagenCancha2, imagenCancha3],
      tipoCanchas: ["Futbol 5", "Futbol 7", "Futbol 8", "Futbol 11"],
      servicios: ["baños", "parqueadero", "wifi", "restaurante"],
    },
  ];
  const [empresas, setEmpresas] = useState(copiaEmpresas);
  const [filteredOptions, setFilteredOptions] = useState(copiaEmpresas);

  return (
    <EmpresasContext.Provider
      value={{ empresas, setEmpresas, filteredOptions, setFilteredOptions }}
    >
      {children}
    </EmpresasContext.Provider>
  );
};

export const useEmpresas = () => useContext(EmpresasContext);
