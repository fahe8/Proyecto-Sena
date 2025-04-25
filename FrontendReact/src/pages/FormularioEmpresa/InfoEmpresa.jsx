import React from 'react';
export default function InfoEmpresa() {
  return (
    <div>
      <h2 className="text-gray-600 font-medium mb-4 uppercase text-sm">Datos de la empresa</h2>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">Nombre comercial</label>
        <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-xs" placeholder="Nombre de la empresa" />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">NIT / Identificación fiscal</label>
        <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-xs" placeholder="Número de NIT" />
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Dirección</label>
          <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-xs" placeholder="Dirección principal" />
        </div>
      </div>
      
    </div>
  );
}