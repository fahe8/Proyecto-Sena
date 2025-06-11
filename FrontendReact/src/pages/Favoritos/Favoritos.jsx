import React, { useState, useEffect } from "react"; // Importamos el estado y el efecto
import CardEmpresa from "../Inicio/componentes/CardEmpresa"; // Asegúrate de importar correctamente el componente
import { useAuth } from "../../Provider/AuthProvider"; // Importamos el provider de autenticación
import { empresaServicio } from "../../services/api"; // Importamos el servicio de empresas
import { CloudCog } from "lucide-react"; // Importamos el icono de la nube

const Favoritos = () => { // Componente para mostrar las canchas favoritas
  const [favoritos, setFavoritos] = useState([]); // Estado para almacenar las canchas favoritas
  const { user } = useAuth(); // Estado para almacenar el usuario

  useEffect(() => { // Efecto para obtener las canchas favoritas
  const obtenerFavoritos = async () => { // Función para obtener las canchas favoritas
    if (!user?.uid) return; // Si no hay usuario, no se obtiene las canchas favoritas

    try {
      const empresas = await empresaServicio.obtenerTodos(); // Se obtiene todas las empresas
      const favoritosGuardados = JSON.parse( // Se obtiene las canchas favoritas guardadas
        localStorage.getItem(`favoritos_${user.uid}`) // Se obtiene las canchas favoritas guardadas
      ) || []; // Si no hay canchas favoritas guardadas, se inicializa como un array vacío

      const empresasFavoritas = empresas.data.data.filter((empresa) => // Se filtra las canchas favoritas
        favoritosGuardados.includes(empresa.nombre) // Se filtra las canchas favoritas
      );

      setFavoritos(empresasFavoritas); // Se setean las canchas favoritas
    } catch (error) { // Si hay un error, se muestra en la consola
      console.error("Error al obtener los favoritos:", error); // Se muestra en la consola
    }
  };

    obtenerFavoritos(); // Se obtiene las canchas favoritas
}, [user]); // Se ejecuta cuando el usuario cambia

  return (
    <div className="w-full py-8 px-30 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="rounded-lg shadow-xl bg-white">
        <div className=" bg-[#003044] p-6 text-white rounded-t-lg">
          <h2 className="text-2xl font-bold justify-self-center text-center">CANCHAS FAVORITAS</h2>
          <p className="text-center text-sm p-3">Las canchas que más te han gustado</p>
        </div>
        
      
      {favoritos.length > 0 ? ( // Si hay canchas favoritas, se muestran
        <div className="flex flex-wrap justify-center gap-6 mt-10 items-center">
          {favoritos.map((empresa) => ( // Se muestran las canchas favoritas
            <CardEmpresa
              key={empresa.id} // Se muestra la cancha favorita
              mostrarFavorito={true} // Se muestra la cancha favorita
              empresa={empresa}
            />
          ))} // Se muestran las canchas favoritas
        </div>
      ) : ( // Si no hay canchas favoritas, se muestra un mensaje
        <p className="text-gray-700 text-center py-10">No tienes empresas en favoritos.</p>
      )} 
      </div> 
      
    </div> 
  );
};

export default Favoritos;