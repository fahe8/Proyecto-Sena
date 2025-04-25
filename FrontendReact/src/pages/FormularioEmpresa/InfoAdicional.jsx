import React from 'react';
export default function InfoAdicional() {
    return (
      <div>
        <h2 className="text-gray-600 font-medium mb-4 uppercase text-sm">Información adicional</h2>
        
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Horario de atención</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Desde</label>
              <input type="time" className="w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Hasta</label>
              <input type="time" className="w-full border border-gray-300 rounded-md p-2" />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Días de funcionamiento</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(day => (
              <label key={day} className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                <input type="checkbox" className="accent-teal-500" />
                <span className="text-sm">{day}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Servicios adicionales</label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-teal-500" />
              <span className="text-sm">Estacionamiento</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-teal-500" />
              <span className="text-sm">Vestidores</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-teal-500" />
              <span className="text-sm">Cafetería</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-teal-500" />
              <span className="text-sm">Iluminación nocturna</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-teal-500" />
              <span className="text-sm">WiFi</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-teal-500" />
              <span className="text-sm">Duchas</span>
            </label>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Descripción adicional</label>
          <textarea 
            className="w-full border border-gray-300 rounded-md p-2 h-24" 
            placeholder="Detalles adicionales sobre su establecimiento..."
          ></textarea>
        </div>
      </div>
    );
  }