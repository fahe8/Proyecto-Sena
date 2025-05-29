import React from "react";
import StatCard from "./StatCard";

const StatsSection = ({ reservas }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <StatCard 
        title="Reservas Totales" 
        value={reservas.length || '0'} 
        icon="⚽" 
      />
      <StatCard 
        title="Canchas Favoritas" 
        value={JSON.parse(localStorage.getItem("favoritos"))?.length || "0"}
        icon="⭐" 
      />
    </div>
  );
};

export default StatsSection;