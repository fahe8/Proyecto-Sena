import React from 'react';
import CloudinaryUploader from '../../components/CloudinaryUploader';

export default function InfoRepresentante({ data, onChange, errors }) {
  return (
    <div>
      <h2 className="text-[#003044] font-medium mb-4 uppercase text-sm">Datos del representante</h2>

      <div className="flex w-full justify-between">
        <div className=" flex-col w-full">

          <div className="flex-1 mb-4">
            <label className="block text-sm text-[#003044] mb-1">Nombre</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
              placeholder="Primer nombre"
              value={data.nombre || ''} // Vinculado al estado global
              onChange={(e) => onChange('nombre', e.target.value)} // Actualiza el estado global
            />
            {errors?.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>} 
          </div>
          <div className="flex-1 ">
            <label className="block text-sm text-[#003044] mb-1">Apellido</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
              placeholder="Primer apellido"
              value={data.apellido || ''} // Vinculado al estado global
              onChange={(e) => onChange('apellido', e.target.value)} // Actualiza el estado global
            />
            {errors?.apellido && <p className="text-red-500 text-sm">{errors.apellido}</p>}
          </div>
        </div>
        <div className="w-50 h-full md:w-32 ml-4 text-center">
          <label className="block text-sm text-[#003044] mb-1 ">Tu Foto</label>
          <CloudinaryUploader />
        </div>
      </div>

      <div className="mb-4 mt-4">
        <label className="block text-sm text-[#003044] mb-1">Número de Identificación</label>
        <div className="flex">
          <select
            className="border border-gray-300 rounded-l-md p-2 w-20 text-[14px]"
            value={data.tipoIdentificacion || ''} // Vinculado al estado global
            onChange={(e) => onChange('tipoIdentificacion', e.target.value)} // Actualiza el estado global
          >
            <option value="CC">CC</option>
            <option value="TI">TI</option>
            <option value="CE">CE</option>
          </select>
          <input
            type="text"
            className="w-full border-y border-r border-gray-300 rounded-r-md p-2 text-[13px]"
            placeholder="Número"
            value={data.identificacion || ''} // Vinculado al estado global
            onChange={(e) => onChange('identificacion', e.target.value)} // Actualiza el estado global
          />
        </div>
        {errors?.identificacion && <p className="text-red-500 text-sm">{errors.identificacion}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-[#003044] mb-1">Teléfono</label>
        <input
          type="tel"
          className="w-full border border-gray-300 rounded-md p-2 text-[13px]"
          placeholder="Número telefónico"
          value={data.telefono || ''} // Vinculado al estado global
          onChange={(e) => onChange('telefono', e.target.value)} // Actualiza el estado global
        />
        {errors?.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-[#003044] mb-1">Correo Electrónico</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
          placeholder="correo@ejemplo.com"
          value={data.correo || ''} // Vinculado al estado global
          onChange={(e) => onChange('correo', e.target.value)} // Actualiza el estado global
        />
        {errors?.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
      </div>

      
    </div>
  );
}