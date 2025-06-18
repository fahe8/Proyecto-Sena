import React, { useState, useEffect } from "react";
import CardEmpresa from "../Inicio/componentes/CardEmpresa";
import { useAuth } from "../../Provider/AuthProvider";
import { empresaServicio } from "../../services/api";
import Loading from "../Login/components/Loading";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const obtenerFavoritos = async () => {
      if (!user?.id) {
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        const empresas = await empresaServicio.obtenerTodos();
        const favoritosGuardados = JSON.parse(
          localStorage.getItem(`favoritos_${user.id}`)
        ) || [];

        console.log('Obteniendo favoritos:', {
          userId: user.id,
          favoritosGuardados
        });

        const empresasFavoritas = empresas.data.data.filter((empresa) =>
          favoritosGuardados.includes(empresa.nombre)
        );

        setFavoritos(empresasFavoritas);
      } catch (error) {
        console.error('Error al obtener favoritos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerFavoritos();
  }, [user?.id]);

  return (
    <div className="w-full py-8 px-5 md:px-30 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="rounded-lg shadow-xl bg-white">
        <div className=" bg-[#003044] p-6 text-white rounded-t-lg">
          <h2 className="text-2xl font-bold justify-self-center text-center">CANCHAS FAVORITAS</h2>
          <p className="text-center text-sm p-3">Las canchas que más te han gustado</p>
        </div>
        
        <div className="min-h-[400px] flex flex-col justify-center">
          {cargando ? (
            <div className="flex justify-center items-center py-10">
              <Loading />
            </div>
          ) : favoritos.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6 mt-10 items-center">
              {favoritos.map((empresa) => (
                <CardEmpresa
                  key={empresa.id}
                  mostrarFavorito={true}
                  empresa={empresa}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-center py-10">No tienes empresas en favoritos.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favoritos;