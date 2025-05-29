import React, { useState, useEffect } from "react";
import { canchasServicio } from "../../../services/api";

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
    id_tipo_cancha: "",
    id_estado_cancha: "",
    precio: "",
    imagen: "",
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (infoCancha && isOpen) {
      setCanchaData({
        nombre: infoCancha.nombre || "",
        id_tipo_cancha: infoCancha.id_tipo_cancha || "",
        id_estado_cancha: infoCancha.id_estado_cancha || "",
        precio: infoCancha.precio || "",
        imagen: infoCancha.imagen || infoCancha.image || "",
      });

      // Establecer la vista previa de la imagen
      if (infoCancha.imagen || infoCancha.image) {
        setImagePreview(infoCancha.imagen || infoCancha.image);
      }
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
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Aquí normalmente enviarías el archivo a Cloudinary y obtendrías una URL
      // Para este ejemplo, solo crearemos una URL local para la vista previa
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);

      // En una implementación real, deberías subir el archivo a Cloudinary y
      // luego actualizar canchaData.imagen con la URL que devuelve Cloudinary
      handleChange("imagen", "");

      // Ejemplo de cómo podría verse la subida a Cloudinary:
      /*
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'tu_upload_preset');
      
      fetch('https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        handleChange('imagen', data.secure_url);
      })
      .catch(error => {
        console.error('Error al subir la imagen:', error);
        setErrors({...errors, imagen: "Error al subir la imagen"});
      });
      */
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!canchaData.nombre.trim()) {
      newErrors.nombre = "El nombre de la cancha es obligatorio";
    }

    if (!canchaData.id_tipo_cancha) {
      newErrors.id_tipo_cancha = "Seleccione un tipo de cancha";
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
      onClose();
    }
  };

  const guardarCambiosCancha = async () => {
    try {
      // Evitar enviar la imagen si está vacía
      const dataToSend = { ...canchaData };
      if (dataToSend.imagen === "") {
        delete dataToSend.imagen;
      }

      await canchasServicio.actualizar(infoCancha.id_cancha, dataToSend);
      console.log("se actualizo");
      onConfirm(dataToSend);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-700">
              Modificar Cancha
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
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
                value={canchaData.id_tipo_cancha}
                onChange={(e) => handleChange("id_tipo_cancha", e.target.value)}
              >
                <option value="">Seleccione</option>
                {tiposCanchas?.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
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
                <option value="">Seleccione el estado</option>
                {estadoCanchas?.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
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
            <div className="flex items-center space-x-4">
              {imagePreview && (
                <div className="w-20 h-20 relative">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
              />
            </div>
            {errors.imagen && (
              <p className="text-red-500 text-sm">{errors.imagen}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#06c509] text-white rounded-md hover:bg-green-600"
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
