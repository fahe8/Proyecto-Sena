import React from "react";

const CardCancha = ({ cancha, onClick, isLoading }) => {
  return (
    <div key={cancha.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <h3 className="text-xl font-semibold text-[#003044] mb-2">{cancha.nombre}</h3>
      <p className="text-gray-600 mb-4">Tipo: {cancha.tipo}</p>
      <p className="text-gray-600 mb-4">Estado: {cancha.estado}</p>
      <p className="text-gray-600">Precio por hora: ${cancha.precioHora}</p>
    </div>
  );
}
export default CardCancha;