import axios from "axios";
import React, { useState, useEffect } from "react";

const CloudinaryUploader = ({
  onUploadSuccess = (url) => {
    console.log("Imagen subida:", url);
  },
  multiple = false,
  folder = 'default',
  returnFile = false, // ✅ Nuevo parámetro
  initialValue = null, // Nuevo parámetro para mostrar imagen inicial
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // Efecto para mostrar la imagen inicial si existe
  useEffect(() => {
    if (initialValue) {
      // Si initialValue es un objeto File
      if (initialValue instanceof File) {
        setPreviewUrl(URL.createObjectURL(initialValue));
      } 
      // Si initialValue es un string (URL)
      else if (typeof initialValue === 'string') {
        setPreviewUrl(initialValue);
      }
      // Si initialValue es un objeto con url (como los que vienen de Cloudinary)
      else if (initialValue && initialValue.url) {
        setPreviewUrl(initialValue.url);
      }
    }
  }, [initialValue]);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const file = files[0];

    // Mostrar vista previa
    if (!multiple) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }

    if (returnFile) {
      // Para canchas: enviar el archivo original
      onUploadSuccess(file);
    } else {
      // Para otros casos: enviar FormData
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", folder);
      onUploadSuccess(formData);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden relative">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Vista previa"
            className="object-cover w-full h-full"
          />
        ) : (
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
        )}
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
          multiple={multiple}
          disabled={uploading}
        />
      </label>
      {uploading && <div className="text-sm text-gray-500">Subiendo...</div>}
    </div>
  );
};

export default CloudinaryUploader;