import React from "react";
import StatCard from "../../Perfil/components/StatCard";

const AdminStatsSection = ({ canchas }) => {
  // Calcular estadísticas
  const canchasActivas = canchas.filter(cancha => cancha.id_estado_cancha === 1).length;
  const canchasMantenimiento = canchas.filter(cancha => cancha.id_estado_cancha === 2).length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <StatCard 
        title="Total de Canchas" 
        value={canchas.length || '0'} 
        icon="⚽" 
      />
      <StatCard 
        title="Canchas Diponibles" 
        value={canchasActivas || '0'} 
        icon="✅" 
      />
      <StatCard 
        title="En Mantenimiento" 
        value={canchasMantenimiento || '0'} 
        icon="🔧" 
      />
    </div>
  );
};

export default AdminStatsSection;