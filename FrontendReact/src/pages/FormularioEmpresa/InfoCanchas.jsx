import React, { useEffect, useState } from "react";
import CloudinaryUploader from "../../components/CloudinaryUploader";
import { canchasServicio } from "../../services/api";

export default function InfoCanchas({
  data,
  onAddCancha,
  onChange,
  onRemoveCancha,
  errors,
}) {
  const handleImageUpload = (index) => (url) => {
    onChange(index, "imagen", url);
  };

  const [tiposCanchas, setTiposCanchas] = useState();
  const [estadoCanchas, setEstadosCanchas] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const obtenerTiposCanchas = async () => {
      try {
        setLoading(true);
        const [tiposResponse, estadosResponse] = await Promise.all([
          canchasServicio.tiposCanchas(),
          canchasServicio.estadoCanchas(),
        ]);

        if (tiposResponse.data.success) {
          setTiposCanchas(tiposResponse.data.data);
          console.log("Tipos de canchas:", tiposResponse.data.data);
        }

        if (estadosResponse.data.success) {
          setEstadosCanchas(estadosResponse.data.data);
          console.log("Estados de canchas:", estadosResponse.data.data);
        }
      } catch (error) {
        console.error("Error al obtener los datos de canchas:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerTiposCanchas();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Cargando tipos de canchas...</p>
      </div>
    );
  }
  return (
    <div>
      

      {data.map((field, index) => (
        <div
          key={index}
          className="mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 shadow-md rounded-md relative"
        >
          {/* Header con título y botón de eliminar */}
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <h3 className="text-gray-700 font-medium text-sm sm:text-base">
              Cancha <span className="text-green-400">#{index + 1}</span>
            </h3>
            <button
              onClick={() => onRemoveCancha(index)}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label="Eliminar cancha"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Tipo de cancha
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
                value={field.tipo_cancha_id || ""}
                onChange={(e) =>
                  onChange(index, "tipo_cancha_id", e.target.value)
                }
              >
                <option value="">Seleccione</option>
                {tiposCanchas?.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.tipo}
                  </option>
                ))}
              </select>
              {errors?.[index]?.id_tipo_cancha && (
                <p className="text-red-500 text-sm">
                  {errors[index].id_tipo_cancha}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Nombre de la cancha
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-[13px] sm:text-[14px]"
                placeholder="Ej: Cancha Principal"
                value={field.nombre || ""}
                onChange={(e) => onChange(index, "nombre", e.target.value)}
              />
              {errors?.[index]?.nombre && (
                <p className="text-red-500 text-xs sm:text-sm">{errors[index].nombre}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Estado de la cancha
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 text-[14px] mb-2"
                value={field.id_estado_cancha || ""}
                onChange={(e) =>
                  onChange(index, "id_estado_cancha", e.target.value)
                }
              >
                <option value="">Seleccione un estado</option>
                {estadoCanchas?.map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.id_estado_cancha}
                  </option>
                ))}
              </select>
              {errors?.[index]?.id_estado_cancha && (
                <p className="text-red-500 text-sm">
                  {errors[index].id_estado_cancha}
                </p>
              )}
            </div>
            <div>
                <label className="block text-sm text-gray-600 mt-1 mb-1">
                  Precio por hora
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
                  placeholder="ej: 80000"
                  value={field.precio || ""}
                  onChange={(e) => onChange(index, "precio", e.target.value)}
                />
                {errors?.[index]?.precio && (
                  <p className="text-red-500 text-sm">{errors[index].precio}</p>
                )}
              </div>
            </div>
            
            <div className="w-full sm:w-50 h-full sm:ml-0 md:ml-4 text-center">
                <label className="block text-sm text-[#003044] mb-1">
                  Foto
                </label>
                <CloudinaryUploader
                  onUploadSuccess={handleImageUpload(index)}
                  folder={"propietarios"}
                  returnFile={true} // ✅ Solicitar el archivo original
                  initialValue={field.imagen} // Pasar la imagen guardada como valor inicial
                />
                {errors?.[index]?.imagen && (
                  <p className="text-red-500 text-sm">
                    {errors[index].imagen}
                  </p>
                )}
              </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={onAddCancha}
        className="w-full py-2 border border-[#9c9c9c] text-[#003044] rounded-md flex items-center justify-center gap-2 mt-2 text-sm sm:text-base hover:bg-gray-50 transition-colors cursor-pointer"
      >
        + Agregar otra cancha
      </button>
    </div>
  );
}
