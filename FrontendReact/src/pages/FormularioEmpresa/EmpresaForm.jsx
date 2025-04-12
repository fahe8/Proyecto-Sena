import React from 'react';
export default function EmpresaForm({ formData, handleChange, handlePrev }) {
  return (
    <div className="space-y-3">
      <h2 className="text-8 md:text-[20px] font-bold text-gray-800 mb-4">Información de la Empresa</h2>
      
      <div>
        <label htmlFor="nombre" className="block text-xs font-medium text-gray-700 mb-1">Nombre de la Empresa</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-3 py-1 h-8 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ea30]"
          placeholder="Nombre de su empresa"
          required
        />
      </div>
      
      <div>
        <label htmlFor="NIT" className="block text-xs font-medium text-gray-700 mb-1">NIT</label>
        <input
          type="number"
          id="NIT"
          name="NIT"
          value={formData.NIT}
          onChange={handleChange}
          className="w-full px-3 py-1 h-8 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ea30]"
          placeholder="Digite el NIT"
          required
        />
      </div>
      
      <div>
        <label htmlFor="direccion" className="block text-xs font-medium text-gray-700 mb-1">Dirección</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          className="w-full px-3 py-1 h-8 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ea30]"
          placeholder="Dirección física de la empresa"
          required
        />
      </div>
      
      <div>
        <label htmlFor="descripcion" className="block text-xs font-medium text-gray-700 mb-1">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-1 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ea30] resize-none"
          placeholder="Breve descripción de la empresa"
          required
        ></textarea>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="hora_apertura" className="block text-xs font-medium text-gray-700 mb-1">Hora de Apertura</label>
          <input
            type="time"
            id="hora_apertura"
            name="hora_apertura"
            value={formData.hora_apertura}
            onChange={handleChange}
            className="w-full px-3 py-1 h-8 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ea30]"
            required
          />
        </div>
        
        <div>
          <label htmlFor="hora_cierre" className="block text-xs font-medium text-gray-700 mb-1">Hora de Cierre</label>
          <input
            type="time"
            id="hora_cierre"
            name="hora_cierre"
            value={formData.hora_cierre}
            onChange={handleChange}
            className="w-full px-3 py-1 h-8 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ea30]"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-between pt-3">
        <button type="button" onClick={handlePrev}
          className="h-8 px-4 py-1 text-[15px] bg-gray-200 text-gray-800 font-medium rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 cursor-pointer"
        >Anterior</button>
        
        <button type="submit"
          className="h-8 px-6 py-1 text-[15px] bg-[#33ea30] text-white font-medium rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 flex items-center cursor-pointer"
          onClick={'/'}
        >Enviar</button>
      </div>
    </div>
  );
}