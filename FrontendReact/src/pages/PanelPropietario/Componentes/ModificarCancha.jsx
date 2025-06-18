import React, { useState, useEffect } from "react";
import { canchasServicio } from "../../../services/api";
import CloudinaryUploader from "../../../components/CloudinaryUploader";
const ModificarCancha = ({
  isOpen,
  onClose,
  onConfirm,
  infoCancha,
  tiposCanchas,
  estadoCanchas,
}) => {
  const [canchaData, setCanchaData] = useState({
    nombre: "",
    tipo_cancha_id: "",
    id_estado_cancha: "",
    precio: "",
    imagen: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (infoCancha && isOpen) {
      setCanchaData({
        nombre: infoCancha.nombre || "",
        tipo_cancha_id: infoCancha.tipo_cancha_id || "",
        id_estado_cancha: infoCancha.id_estado_cancha || "",
        precio: infoCancha.precio || "",
        imagen: infoCancha.imagen || infoCancha.image || "",
      });
      console.log(infoCancha);
      
    }
  }, [infoCancha, isOpen]);

  const handleChange = (field, value) => {
    setCanchaData({
      ...canchaData,
      [field]: value,
    });

    // Limpiar error cuando el usuario corrige el campo
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
    console.log(canchaData)
  };



  const validateForm = () => {
    const newErrors = {};

    if (!canchaData.nombre.trim()) {
      newErrors.nombre = "El nombre de la cancha es obligatorio";
    }

    if (!canchaData.tipo_cancha_id) {
      newErrors.tipo_cancha_id = "Seleccione un tipo de cancha";
    }

    if (!canchaData.id_estado_cancha) {
      newErrors.id_estado_cancha = "Seleccione el estado de su cancha";
    }

    if (!canchaData.precio || parseFloat(canchaData.precio) <= 0) {
      newErrors.precio = "Ingrese un precio válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      guardarCambiosCancha();
      // No cerramos el modal aquí, dejamos que InterfazPropietario.jsx lo haga
    }
  };

  const guardarCambiosCancha = async () => {
    try {
      // Crear FormData para enviar los datos incluyendo la imagen
      const formData = new FormData();
      console.log('cancha imagen:', canchaData.imagen);
      // Agregar todos los campos al FormData
      formData.append('nombre', canchaData.nombre);
      formData.append('tipo_cancha_id', canchaData.tipo_cancha_id);
      formData.append('id_estado_cancha', canchaData.id_estado_cancha);
      formData.append('precio', canchaData.precio);
      
      // Agregar la imagen solo si existe y es un archivo
      if (canchaData.imagen instanceof File) {
        formData.append('imagen', canchaData.imagen);
      }
      
      // Enviar el FormData al servicio
      const response = await canchasServicio.actualizar(infoCancha.id, formData);
      console.log("modifciar0", response);
      console.log("se actualizo");
      onConfirm(canchaData);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-700">
              Modificar Cancha
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Nombre de la cancha
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
              placeholder="Ej: Cancha Principal"
              value={canchaData.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm">{errors.nombre}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Tipo de cancha
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
                value={canchaData.tipo_cancha_id}
                onChange={(e) => handleChange("tipo_cancha_id", e.target.value)}
              >
                <option value="">Seleccione</option>
                {tiposCanchas?.map((tipo, index) => (
                  <option key={`tipo-${index}`} value={tipo.id}>
                    {tipo.tipo}
                  </option> 
                ))}
              </select>
              {errors.tipo && (
                <p className="text-red-500 text-sm">{errors.tipo}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Estado de la Cancha
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
                value={canchaData.id_estado_cancha}
                onChange={(e) =>
                  handleChange("id_estado_cancha", e.target.value)
                }
              >
                {estadoCanchas?.map((estado, index) => (
                  <option key={`estado-${index}`} value={estado.id_estado_cancha}>
                    {estado.id_estado_cancha}
                  </option>
                ))}
              </select>
              {errors.estado && (
                <p className="text-red-500 text-sm">{errors.estado}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Precio por hora
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
              placeholder="ej: 80000"
              value={canchaData.precio}
              onChange={(e) => handleChange("precio", e.target.value)}
            />
            {errors.precio && (
              <p className="text-red-500 text-sm">{errors.precio}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Imagen de la cancha
            </label>
            <CloudinaryUploader 
              onUploadSuccess={(url) => handleChange("imagen", url)}
              folder="canchas"
              returnFile={true}
            />
            {errors.imagen && (
              <p className="text-red-500 text-sm">{errors.imagen}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#06c509] text-white rounded-md hover:bg-green-600 cursor-pointer"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModificarCancha;
