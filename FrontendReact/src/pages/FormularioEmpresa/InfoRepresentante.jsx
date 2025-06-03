import React from "react";
import CloudinaryUploader from "../../components/CloudinaryUploader";
import { propietarioServicio } from "../../services/api";

export default function InfoRepresentante({ data, onChange, errors }) {
  // Función para manejar la subida de imágenes
  const handleImageUpload = (url) => {
    onChange("imagen", url);
  };

  return (
    <div>
      <h2 className="text-[#003044] font-medium mb-4 uppercase text-sm">
        Datos del representante
      </h2>

      <div className="flex w-full justify-between">
        <div className=" flex-col w-full">
          <div className="flex-1 mb-4">
            <label className="block text-sm text-[#003044] mb-1">Nombre</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
              placeholder="Primer nombre"
              value={data.nombre || ""} // Vinculado al estado global
              onChange={(e) => onChange("nombre", e.target.value)} // Actualiza el estado global
            />
            {errors?.nombre && (
              <p className="text-red-500 text-sm">{errors.nombre}</p>
            )}
          </div>
          <div className="flex-1 ">
            <label className="block text-sm text-[#003044] mb-1">
              Apellido
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
              placeholder="Primer apellido"
              value={data.apellido || ""} // Vinculado al estado global
              onChange={(e) => onChange("apellido", e.target.value)} // Actualiza el estado global
            />
            {errors?.apellido && (
              <p className="text-red-500 text-sm">{errors.apellido}</p>
            )}
          </div>
        </div>
        <div className="w-50 h-full md:w-32 ml-4 text-center">
          <label className="block text-sm text-[#003044] mb-1 ">Tu Foto</label>
          <CloudinaryUploader onUploadSuccess={handleImageUpload} />
        </div>
      </div>

      <div className="mb-4 mt-4">
        <label className="block text-sm text-[#003044] mb-1">
          Número de Identificación
        </label>
        <div className="flex">
          <select
            className="border border-gray-300 rounded-l-md p-2 w-20 text-[14px]"
            value={data.id_tipoDocumento || "CC"} // Valor predeterminado
            onChange={(e) => onChange("id_tipoDocumento", e.target.value)}
          >
            <option value="CC">CC</option>
            <option value="TI">TI</option>
            <option value="CE">CE</option>
          </select>
          <input
            type="text"
            className="w-full border-y border-r border-gray-300 rounded-r-md p-2 text-[13px]"
            placeholder="Número"
            value={data.num_documento || ""} // Cambiado a num_documento para coincidir con el modelo
            onChange={(e) => onChange("num_documento", e.target.value)} // Actualiza el estado global
          />
        </div>
        {errors?.num_documento && (
          <p className="text-red-500 text-sm">{errors.num_documento}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-[#003044] mb-1">Teléfono</label>
        <input
          type="tel"
          className="w-full border border-gray-300 rounded-md p-2 text-[13px]"
          placeholder="Número telefónico"
          value={data.telefono || ""} // Vinculado al estado global
          onChange={(e) => onChange("telefono", e.target.value)} // Actualiza el estado global
        />
        {errors?.telefono && (
          <p className="text-red-500 text-sm">{errors.telefono}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-[#003044] mb-1">
          Correo Electrónico
        </label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
          placeholder="correo@ejemplo.com"
          value={data.email || ""} // Cambiado a email para coincidir con el modelo
          onChange={(e) => onChange("email", e.target.value)} // Actualiza el estado global
        />
        {errors?.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>
    </div>
  );
}
