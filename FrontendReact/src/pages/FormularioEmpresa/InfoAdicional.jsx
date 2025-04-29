import React from 'react';

export default function InfoAdicional({ data, onChange, errors }) {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const serviciosAdicionales = ['Estacionamiento', 'Vestidores', 'Cafetería', 'Iluminación nocturna', 'WiFi', 'Duchas'];

  const handleCheckboxChange = (field, value) => {
    const updatedArray = data[field].includes(value)
      ? data[field].filter((item) => item !== value) // Elimina si ya está seleccionado
      : [...data[field], value]; // Agrega si no está seleccionado
    onChange(field, updatedArray);
  };

  return (
    <div>
      <h2 className="text-gray-600 font-medium mb-4 uppercase text-sm">Información adicional</h2>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">Horario de atención</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Desde</label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-md p-2"
              value={data.horario.desde || ''} // Vinculado al estado global
              onChange={(e) => onChange('horario', { ...data.horario, desde: e.target.value })} // Actualiza el estado global
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Hasta</label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-md p-2"
              value={data.horario.hasta || ''} // Vinculado al estado global
              onChange={(e) => onChange('horario', { ...data.horario, hasta: e.target.value })} // Actualiza el estado global
            />
          </div>
        </div>
        {errors?.horario && <p className="text-red-500 text-sm">{errors.horario}</p>}
      </div>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">Días de funcionamiento</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {diasSemana.map((day) => (
            <label key={day} className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
              <input
                type="checkbox"
                className="accent-teal-500"
                checked={data.dias.includes(day)} // Vinculado al estado global
                onChange={() => handleCheckboxChange('dias', day)} // Actualiza el estado global
              />
              <span className="text-sm">{day}</span>
            </label>
          ))}
        </div>
        {errors?.dias && <p className="text-red-500 text-sm">{errors.dias}</p>}
      </div>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">Servicios adicionales</label>
        <div className="grid grid-cols-2 gap-4">
          {serviciosAdicionales.map((servicio) => (
            <label key={servicio} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-teal-500"
                checked={data.servicios.includes(servicio)} // Vinculado al estado global
                onChange={() => handleCheckboxChange('servicios', servicio)} // Actualiza el estado global
              />
              <span className="text-sm">{servicio}</span>
            </label>
          ))}
        </div>
        {errors?.servicios && <p className="text-red-500 text-sm">{errors.servicios}</p>}
      </div>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">Descripción de su negocio</label>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 h-24 text-[14px]"
          placeholder="Ej: Somos la mejor cancha de fútbol de la ciudad y ofrecemos..."
          value={data.descripcion || ''} // Vinculado al estado global
          onChange={(e) => onChange('descripcion', e.target.value)} // Actualiza el estado global
        ></textarea>
        {errors?.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}
      </div>
    </div>
  );
}