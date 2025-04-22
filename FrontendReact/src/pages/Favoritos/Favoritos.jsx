import React, { useState, useEffect } from "react";
import CardEmpresa from "../Inicio/componentes/CardEmpresa"; // Asegúrate de importar correctamente el componente
import { useEmpresas } from "../../Provider/EmpresasProvider";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const {empresas} = useEmpresas()

  useEffect(() => {
    // Obtener los favoritos guardados en localStorage
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Filtrar las empresas que están en favoritos
    const empresasFavoritas = empresas.filter((empresa) =>
      favoritosGuardados.includes(empresa.nombre)
    );

    setFavoritos(empresasFavoritas);
  }, []);

  return (
    <div className=" w-full py-4 px-27 text-center">
      <h2 className="text-xl font-bold mb-4 ">Favoritos</h2>
      <hr />
      {favoritos.length > 0 ? (
        <div className="flex flex-wrap gap-4 pt-4">
          {favoritos.map((empresa) => (
            <CardEmpresa key={empresa.id} empresa={empresa} />
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No tienes empresas en favoritos.</p>
      )}
    </div>
  );
};

export default Favoritos;
