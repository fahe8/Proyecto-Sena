import React, { useEffect, useState } from "react";
import CloudinaryUploader from "../../components/CloudinaryUploader";
import { propietarioServicio } from "../../services/api";

export default function InfoRepresentante({ data, onChange, errors, isAuthenticated }) {
  const [tiposDocumentos, setTiposDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Función para manejar la subida de imágenes
  const handleImageUpload = (url) => {
    onChange("imagen", url);
  };

  useEffect(() => {
    const obtenerTiposDocumentos = async () => {
      try {
        setLoading(true);
        const response = await propietarioServicio.obtenerTiposDocumentos();
        if (response.data.success) {
          // Aquí podrías hacer algo con los tipos de documentos obtenidos
          setTiposDocumentos(response.data.data);
          console.log("Tipos de documentos:", response.data.data);
        }
      } catch (error) {
        console.error("Error al obtener los tipos de documentos:", error);
      }finally{
        setLoading(false);
      }
    }
    obtenerTiposDocumentos();
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Cargando tipos de documentos...</p>
      </div>
    );
  }
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
              value={data.nombre || ""}
              onChange={(e) => onChange("nombre", e.target.value)}
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
              value={data.apellido || ""}
              onChange={(e) => onChange("apellido", e.target.value)}
            />
            {errors?.apellido && (
              <p className="text-red-500 text-sm">{errors.apellido}</p>
            )}
          </div>

          {!isAuthenticated && (
            <>
              <div className="flex-1 mb-4 mt-4">
                <label className="block text-sm text-[#003044] mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
                  placeholder="correo@ejemplo.com"
                  value={data.email || ""}
                  onChange={(e) => onChange("email", e.target.value)}
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="flex-1 mb-4">
                <label className="block text-sm text-[#003044] mb-1">Contraseña</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
                  placeholder="Ingrese su contraseña"
                  value={data.password || ""}
                  onChange={(e) => onChange("password", e.target.value)}
                />
                {errors?.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </>
          )}
        </div>
        <div className="w-50 h-full md:w-32 ml-4 text-center">
          <label className="block text-sm text-[#003044] mb-1 ">Tu Foto</label>
          <CloudinaryUploader 
            onUploadSuccess={handleImageUpload} 
            folder={"propietarios"} 
            returnFile={true}
            initialValue={data.imagen} // Pasar la imagen guardada como valor inicial
          />
        </div>
      </div>

      <div className="mb-4 mt-4">
        <label className="block text-sm text-[#003044] mb-1">
          Número de Identificación
        </label>
        <div className="flex">
          <select
            className="border border-gray-300 rounded-l-md p-2 w-20 text-[14px]"
            value={data.tipo_documento_id || "CC"} // Valor predeterminado
            onChange={(e) => onChange("tipo_documento_id", e.target.value)}
          >
            {tiposDocumentos?.map(tipo => (<option key={tipo} value={tipo}>{tipo}</option>))}
          </select>
          <input
            type="text"
            className="w-full border-y border-r border-gray-300 rounded-r-md p-2 text-[13px]"
            placeholder="Número"
            // Si el backend espera 'numero_documento'
            value={data.numero_documento || ""}
            onChange={(e) => onChange("numero_documento", e.target.value)} // Actualiza el estado global
          />
        </div>
        {errors?.numero_documento && (
          <p className="text-red-500 text-sm">{errors.numero_documento}</p>
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

    </div>
  );
}