import React from 'react';

export default function InfoRepresentante() {
  return (
    <div>
      <h2 className="text-[#003044] font-medium mb-4 uppercase text-sm">Datos del representante</h2>
      
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block text-sm text-[#003044] mb-1">Nombre</label>
          <input 
            type="text" 
            className="w-full border border-gray-300 rounded-md p-2 text-[14px]" 
            placeholder="Primer nombre" 
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-[#003044] mb-1">Apellido</label>
          <input 
            type="text" 
            className="w-full border border-gray-300 rounded-md p-2 text-[14px]" 
            placeholder="Primer apellido" 
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-[#003044] mb-1">Número de Identificación</label>
        <div className="flex">
          <select className="border border-gray-300 rounded-l-md p-2 w-20 text-[14px]">
            <option>CC</option>
            <option>TI</option>
            <option>CE</option>
          </select>
          <input 
            type="text" 
            className="w-full border-y border-r border-gray-300 rounded-r-md p-2 text-[14px]" 
            placeholder="Número" 
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">Este campo debe tener 10 dígitos</p>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-[#003044] mb-1">Teléfono</label>
        <input 
          type="tel" 
          className="w-full border border-gray-300 rounded-md p-2 text-[14px]" 
          placeholder="Número telefónico" 
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-[#003044] mb-1  items-center gap-1">
          Correo Electrónico
        </label>
        <input 
          type="email" 
          className="w-full border border-gray-300 rounded-md p-2 text-[14px]" 
          placeholder="correo@ejemplo.com" 
        />
      </div>
    </div>
  );
}