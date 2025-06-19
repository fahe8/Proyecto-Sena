import React from "react";
import StatCard from "../../Perfil/components/StatCard";
import  { BallIcon, MaintenanceIcon, AvailableIcon} from "../../../assets/IconosSVG/iconos";
const AdminStatsSection = ({ canchas }) => {
  // Calcular estadísticas
  const canchasActivas = canchas.filter(cancha => cancha.id_estado_cancha === "disponible").length;
  const canchasMantenimiento = canchas.filter(cancha => cancha.id_estado_cancha === "mantenimiento").length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <StatCard 
        title="Total de Canchas" 
        value={canchas.length || '0'} 
        icon={<BallIcon />}
      />
      <StatCard 
        title="Canchas Diponibles" 
        value={canchasActivas || '0'} 
        icon={<AvailableIcon />}
      />
      <StatCard 
        title="En Mantenimiento" 
        value={canchasMantenimiento || '0'} 
        icon={<MaintenanceIcon />}
      />
    </div>
  );
};

export default AdminStatsSection;