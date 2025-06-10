import React from "react";
import StatCard from "./StatCard";
import { StarIcon2, BallIcon } from "../../../assets/IconosSVG/iconos";

const StatsSection = ({ reservas }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 ">
      <StatCard 
        title="Reservas Totales" 
        value={reservas.length || '0'} 
        icon={<BallIcon />}
      />
      <StatCard 
        title="Canchas Favoritas" 
        value={JSON.parse(localStorage.getItem('favoritos'))?.length || '0'} 
        icon={<StarIcon2/>}
      />
    </div>
  );
};

export default StatsSection;