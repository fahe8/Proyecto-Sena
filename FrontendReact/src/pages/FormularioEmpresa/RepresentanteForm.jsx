import React from 'react';
export default function RepresentanteForm({ formData, handleChange, handleNext, value, onChange }) {
  return (
    <div className="space-y-3 ">
      <h2 className="text-8 md:text-[20px] font-bold text-gray-800 mb-6">Información del Representante</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block text-xs font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-3 py-1 h-8 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ea30]"
            placeholder='John' required/>
        </div>
        
        <div>
          <label htmlFor="apellido" className="block text-xs font-medium text-gray-700 mb-1">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full px-3 py-1 h-8 border text-[14px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ea30]"
            placeholder='Doe'required
          />
        </div>
      </div>

      {/* Seccion del documento del representante */}
      <div className="flex flex-col w-full">
        <label htmlFor="tipoDocumento" className="text-xs font-medium text-gray-700 mb-1">Documento de Identidad</label>
        <div className="flex w-full">
          <div className="mr-4">
            <select id="tipoDocumento" name="tipoDocumento" value={value} onChange={onChange}
              className="w-18 h-8 px-2 py-1 border border-gray-300 text-[14px] rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ea30]" 
              required>
              <option value="CC">CC</option>
              <option value="CE">CE</option>
              <option value="TI">TI</option>
            </select>
          </div>

          <div className="flex-grow">
            <input type="text" id="documento" name="documento" value={formData.documento} onChange={handleChange}
              className="w-full px-3 py-1 h-8 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ea30]" 
              placeholder='Digite su documento...' required/>
          </div>
        </div>
      </div>
      
      
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full h-8 px-4 py-1 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ea30]"
          placeholder='john.doe@ejemplo.com' required />
      </div>
      
      <div>
        <label htmlFor="telefono" className="block text-xs font-medium text-gray-700 mb-1">Teléfono</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full h-8 px-4 py-1 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33ea30]"
          placeholder='Pon tu número de teléfono'required
        />
      </div>
      
      <div className="flex justify-end pt-3">
        <button
          type="button"
          onClick={handleNext}
          className="h-8 px-4 py-1 text-[15px] bg-[#33ea30] text-white font-medium rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 flex items-center cursor-pointer">
          Siguiente
          <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
}
