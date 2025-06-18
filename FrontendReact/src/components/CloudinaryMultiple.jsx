import React, { useState, useEffect } from "react";

const CloudinaryMultiple = ({
  onUploadSuccess = (files) => console.log("Archivos listos para subir", files),
  multiple = true,
  folder = "default",
  initialValues = [], // Nuevo parámetro para mostrar imágenes iniciales
}) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  
  // Efecto para mostrar las imágenes iniciales si existen
  useEffect(() => {
    if (initialValues && initialValues.length > 0) {
      const initialPreviews = initialValues.map(value => {
        // Si es un objeto File
        if (value instanceof File) {
          return {
            url: URL.createObjectURL(value),
            file: value
          };
        }
        // Si es un string (URL)
        else if (typeof value === 'string') {
          return {
            url: value,
            file: null // No tenemos el archivo original
          };
        }
        // Si es un objeto con url (como los que vienen de Cloudinary)
        else if (value && value.url) {
          return {
            url: value.url,
            file: null // No tenemos el archivo original
          };
        }
        return null;
      }).filter(Boolean); // Eliminar valores nulos
      
      setPreviews(initialPreviews);
      
      // Actualizar files solo si hay archivos File reales
      const realFiles = initialValues.filter(value => value instanceof File);
      if (realFiles.length > 0) {
        setFiles(realFiles);
      }
    }
  }, [initialValues]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const newPreviews = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    const updatedFiles = [...files, ...selectedFiles];
    const updatedPreviews = [...previews, ...newPreviews];
    
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);

    // Retornar array de archivos File en lugar de FormData
    console.log("folder: ", folder);
    onUploadSuccess(updatedFiles);
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedPreviews = previews.filter((_, index) => index !== indexToRemove);
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    
    setPreviews(updatedPreviews);
    setFiles(updatedFiles);
    
    // Actualizar el callback con la lista actualizada de archivos
    onUploadSuccess(updatedFiles);
  };



  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden relative">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-2 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold text-[11px] md:text-xs">Click para subir</span>
          </p>
          <p className="text-[10px] md:text-[12px] text-gray-500">SVG, PNG o JPG</p>
        </div>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
          multiple={multiple}
        />
      </label>

      {/* Vista previa */}
      <div className="flex flex-wrap gap-4 justify-center">
        {previews.map((preview, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={preview.url}
              alt={`preview-${index}`}
              className="w-full h-full object-cover rounded"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              title="Eliminar"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloudinaryMultiple;
