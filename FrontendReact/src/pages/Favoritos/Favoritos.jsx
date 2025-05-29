import React, { useState, useEffect } from "react";
import CardEmpresa from "../Inicio/componentes/CardEmpresa"; // Asegúrate de importar correctamente el componente
import { useAuth } from "../../Provider/AuthProvider";
import { empresaServicio } from "../../services/api";
import { CloudCog } from "lucide-react";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const { user } = useAuth();

useEffect(() => {
  const obtenerFavoritos = async () => {
    if (!user?.uid) return;

    try {
      const empresas = await empresaServicio.obtenerTodos();
      const favoritosGuardados = JSON.parse(
        localStorage.getItem(`favoritos_${user.uid}`)
      ) || [];

      const empresasFavoritas = empresas.data.data.filter((empresa) =>
        favoritosGuardados.includes(empresa.nombre)
      );

      setFavoritos(empresasFavoritas);
    } catch (error) {
      console.error("Error al obtener los favoritos:", error);
    }
  };

  obtenerFavoritos();
}, [user]);

  return (
    <div className="w-full py-8 px-14">
      <h2 className="text-2xl font-bold mb-4 justify-self-center text-center">
        Favoritos
      </h2>
      <hr />
      {favoritos.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {favoritos.map((empresa) => (
            <CardEmpresa
              key={empresa.id}
              mostrarFavorito={true}
              empresa={empresa}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center">
          No tienes empresas en favoritos.
        </p>
      )}
    </div>
  );
};

export default Favoritos;
