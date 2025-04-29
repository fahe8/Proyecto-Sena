import React, { useState, createContext, useContext } from "react";
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
      slug:"Canchas-la-64"
    },
    {
      nombre: "Canchas el triangulo",
      calificacion: "4.8",
      imagenes: [imagenCancha, imagenCancha2, imagenCancha3],
      tipoCanchas: ["Futbol 5", "Futbol 7"],
      servicios: ["baños", "tienda", "parqueadero", "wifi"],
      slug:"Canchas-el-triangulo"
    },
    {
      nombre: "Canchas la estacion",
      calificacion: "4.8",
      imagenes: [imagenCancha, imagenCancha2, imagenCancha3],
      tipoCanchas: ["Futbol 11", "Futbol 9"],
      servicios: ["baños", "tienda", "parqueadero", "wifi"],
      slug:"Canchas-la-estacion"
    },
    {
      nombre: "Canchas de Futbol Calarca Junior",
      calificacion: "4.8",
      imagenes: [imagenCancha, imagenCancha2, imagenCancha3],
      tipoCanchas: ["Futbol 5", "Futbol 8"],
      servicios: ["baños", "tienda", "parqueadero", "wifi"],
      slug:"Canchas-de-Futbol-Calarca-Junior"
    },
    {
      nombre: "Garzagol",
      calificacion: "4.8",
      imagenes: [imagenCancha, imagenCancha2, imagenCancha3],
      tipoCanchas: ["Futbol 5", "Futbol 7", "Futbol 8"],
      servicios: ["baños", "tienda", "parqueadero", "wifi"],
      slug:"Garzagol"
    },
    {
      nombre: "Canchas sintéticas chelsea fútbol club",
      calificacion: "4.8",
      imagenes: [imagenCancha, imagenCancha2, imagenCancha3],
      tipoCanchas: ["Futbol 5", "Futbol 7", "Futbol 8", "Futbol 11"],
      servicios: ["baños", "parqueadero", "wifi", "restaurante"],
      slug:"Canchas-sintéticas-chelsea-fútbol-club"
    },
  ];

  const [empresas, setEmpresas] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [loading, setLoading] = useState(false);



  return (
    <EmpresasContext.Provider
      value={{
        empresas,
        setEmpresas,
        filteredOptions,
        setFilteredOptions,
        copiaEmpresas,
        loading,
        setLoading
      }}
    >
      {children}
    </EmpresasContext.Provider>
  );
};

export const useEmpresas = () => useContext(EmpresasContext);