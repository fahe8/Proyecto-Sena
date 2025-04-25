import React from 'react';
import { useState } from 'react';

export default function InfoCanchas() {
  const [fields, setFields] = useState([{ id: 1, name: "", size: "", surface: "" }]);
  
  const addField = () => {
    const newField = { 
      id: fields.length + 1, 
      name: "", 
      size: "", 
      surface: "" 
    };
    setFields([...fields, newField]);
  };
  
  return (
    <div>
      <h2 className="text-gray-600 font-medium mb-4 uppercase text-sm">Canchas sintéticas</h2>
      
      {fields.map((field) => (
        <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-md">
          <h3 className="text-gray-700 font-medium mb-3">Cancha #{field.id}</h3>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Nombre de la cancha</label>
            <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-[14px]" placeholder="Ej: Cancha Principal" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tipo de cancha</label>
              <select className="w-full border border-gray-300 rounded-md p-2 text-[14px]">
                <option>Seleccione</option>
                <option>Fútbol 5</option>
                <option>Fútbol 7</option>
                <option>Fútbol 11</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tipo de superficie</label>
              <select className="w-full border border-gray-300 rounded-md p-2 text-[14px]">
                <option>Seleccione un tipo</option>
                <option>Césped sintético</option>
                <option>Pasto natural</option>
                <option>Grama artificial</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Precio por hora</label>
              <input type="number" className="w-full border border-gray-300 rounded-md p-2 text-[14px]" placeholder="ej: 80.000" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Capacidad (jugadores)</label>
              <input type="number" className="w-full border border-gray-300 rounded-md p-2 text-[14px]" placeholder="10" />
            </div>
          </div>
        </div>
      ))}
      
      <button 
        onClick={addField}
        className="w-full py-2 border border-[#003044] bg-green-100 text-[#003044] rounded-md flex items-center justify-center gap-2 mt-2"
      >
        + Agregar otra cancha
      </button>
    </div>
  );
}