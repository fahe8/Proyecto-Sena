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
    <div className="w-full py-8 px-14">
      <h2 className="text-2xl font-bold mb-4 justify-self-center text-center">Favoritos</h2>
      <hr />
      {favoritos.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {favoritos.map((empresa) => (
            <CardEmpresa key={empresa.id} mostrarFavorito={true} empresa={empresa} />
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center">No tienes empresas en favoritos.</p>
      )}
    </div>
  );
  
};

export default Favoritos;
