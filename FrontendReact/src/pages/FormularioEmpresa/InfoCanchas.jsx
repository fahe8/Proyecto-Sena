import React from 'react';

export default function InfoCanchas({ data, onAddCancha, onChange, onRemoveCancha, errors }) {
  
  return (
    <div>
      <h2 className="text-gray-600 font-medium mb-4 uppercase text-sm">Canchas sintéticas</h2>
      
      {data.map((field, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 shadow-md rounded-md relative">
          {/* Header con título y botón de eliminar */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-gray-700 font-medium">Cancha <span className='text-green-400'>#{index + 1}</span></h3>
            <button 
              onClick={() => onRemoveCancha(index)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Eliminar cancha"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          

          
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Nombre de la cancha</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
              placeholder="Ej: Cancha Principal"
              value={field.name || ''} 
              onChange={(e) => onChange(index, 'name', e.target.value)} 
            />
            {errors?.[index]?.name && <p className="text-red-500 text-sm">{errors[index].name}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tipo de cancha</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
                value={field.size || ''} 
                onChange={(e) => onChange(index, 'size', e.target.value)} 
              >
                <option value="">Seleccione</option>
                <option value="Fútbol 5">Fútbol 5</option>
                <option value="Fútbol 7">Fútbol 7</option>
                <option value="Fútbol 9">Fútbol 9</option>
                <option value="Fútbol 11">Fútbol 11</option>
              </select>
              {errors?.[index]?.size && <p className="text-red-500 text-sm">{errors[index].size}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tipo de superficie</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
                value={field.surface || ''} 
                onChange={(e) => onChange(index, 'surface', e.target.value)} 
              >
                <option value="">Seleccione un tipo</option>
                <option value="Césped sintético">Césped sintético</option>
                <option value="Pasto natural">Pasto natural</option>
                <option value="Grama artificial">Grama artificial</option>
              </select>
              {errors?.[index]?.surface && <p className="text-red-500 text-sm">{errors[index].surface}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Precio por hora</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
                placeholder="ej: 80.000"
                value={field.price || ''} 
                onChange={(e) => onChange(index, 'price', e.target.value)} 
              />
              {errors?.[index]?.price && <p className="text-red-500 text-sm">{errors[index].price}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Capacidad (jugadores)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
                placeholder="10"
                value={field.capacity || ''} 
                onChange={(e) => onChange(index, 'capacity', e.target.value)} 
              />
              {errors?.[index]?.capacity && <p className="text-red-500 text-sm">{errors[index].capacity}</p>}
            </div>
          </div>
        </div>
      ))}
      
      <button 
        onClick={onAddCancha}
        className="w-full py-2 border border-[#9c9c9c] text-[#003044] rounded-md flex items-center justify-center gap-2 mt-2"
      >
        + Agregar otra cancha
      </button>
    </div>
  );
}