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
    <div className="w-full py-8 px-30 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="rounded-lg shadow-xl bg-white">
        <div className=" bg-[#003044] p-6 text-white rounded-t-lg">
          <h2 className="text-2xl font-bold justify-self-center text-center">CANCHAS FAVORITAS</h2>
          <p className="text-center text-sm p-3">Las canchas que más te han gustado</p>
        </div>
        
      
      {favoritos.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 mt-10 items-center">
          {favoritos.map((empresa) => (
            <CardEmpresa key={empresa.id} mostrarFavorito={true} empresa={empresa} />
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center py-10">No tienes empresas en favoritos.</p>
      )}
      </div>
      
    </div>
  );
  
};

export default Favoritos;
