import React, { useEffect } from "react";
import StatCard from "./StatCard";
import { StarIcon2, BallIcon } from "../../../assets/IconosSVG/iconos";
import { useAuth } from "../../../Provider/AuthProvider";

const StatsSection = ({ reservas, historialReservas }) => {
  const { user } = useAuth();
  
  // Obtener favoritos del localStorage usando la clave con el ID del usuario
  const favoritos = JSON.parse(localStorage.getItem(`favoritos_${user?.id}`)) || [];
  
  // Depuración para ver qué contiene historialReservas
  useEffect(() => {
    console.log('StatsSection - historialReservas:', historialReservas);
    console.log('StatsSection - reservas:', reservas);
  }, [historialReservas, reservas]);
  
  // Calcular el total de reservas (historial + activas)
  const activeReservasCount = reservas && reservas.data && Array.isArray(reservas.data) ? reservas.data.length : 0;
  const historialReservasCount = historialReservas ? historialReservas.length : 0;
  const totalReservas = historialReservasCount + activeReservasCount;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 ">
      <StatCard 
        title="Reservas Totales" 
        value={totalReservas || '0'} 
        icon={<BallIcon />}
      />
      <StatCard 
        title="Canchas Favoritas" 
        value={favoritos.length || '0'} 
        icon={<StarIcon2/>}
      />
    </div>
  );
};

export default StatsSection;