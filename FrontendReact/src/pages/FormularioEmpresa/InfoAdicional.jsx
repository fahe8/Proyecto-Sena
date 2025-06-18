import React, { useEffect, useState } from "react";
import { ServiciosServicio } from "../../services/api";

export default function InfoAdicional({ data, onChange, errors }) {
  const [ListaServicios, setListaServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        setLoading(true);
        const serviciosResponse = await ServiciosServicio.obtenerTodos();
        console.log(serviciosResponse)
        if (serviciosResponse.status == '200') {
          console.log(serviciosResponse.data.servicios)
          setListaServicios(serviciosResponse.data.servicios);
        }
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarServicios();
  }, []);

  const handleCheckboxChange = (field, value) => {
    // Asegurarse de que data[field] sea un array
    const currentArray = Array.isArray(data[field]) ? data[field] : [];
    
    const updatedArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value) // Elimina si ya está seleccionado
      : [...currentArray, value]; // Agrega si no está seleccionado
    
    onChange(field, updatedArray);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Cargando servicios...</p>
      </div>
    );
  }


  return (
    
    <div>
      <h2 className="text-gray-600 font-medium mb-4 uppercase text-sm">
        Información adicional
      </h2>

      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">
          Horario de atención
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Desde
            </label>
            <input
              id="desde"
              type="time"
              className="w-full border border-gray-300 rounded-md p-2"
              value={data.hora_apertura || ""} // Vinculado al estado global
              onChange={(e) =>
                onChange("hora_apertura", e.target.value)
              } // Actualiza el estado global
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Hasta</label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-md p-2"
              value={data.hora_cierre || ""} // Vinculado al estado global
              onChange={(e) =>
                onChange("hora_cierre", e.target.value)
              } // Actualiza el estado global
            />
          </div>
        </div>
        {errors?.horario && (
          <p className="text-red-500 text-sm">{errors.horario}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">
          Servicios adicionales
        </label>
        <div className="grid grid-cols-2 gap-4">
          {ListaServicios?.map((servicio) => (
            <label key={servicio.tipo} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-teal-500"
                checked={Array.isArray(data?.servicios) && data.servicios.includes(servicio.id)} // Vinculado al estado global
                onChange={() =>
                  handleCheckboxChange("servicios", servicio.id)
                } // Actualiza el estado global
              />
              <span className="text-sm">{servicio.tipo}</span>
            </label>
          ))}
        </div>
        {errors?.servicios && (
          <p className="text-red-500 text-sm">{errors.servicios}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">
          Descripción de su negocio
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 h-24 text-[14px]"
          placeholder="Ej: Somos la mejor cancha de fútbol de la ciudad y ofrecemos..."
          value={data.descripcion || ""} // Vinculado al estado global
          onChange={(e) => onChange("descripcion", e.target.value)} // Actualiza el estado global
        ></textarea>
        {errors?.descripcion && (
          <p className="text-red-500 text-sm">{errors.descripcion}</p>
        )}
      </div>
    </div>
  );
}