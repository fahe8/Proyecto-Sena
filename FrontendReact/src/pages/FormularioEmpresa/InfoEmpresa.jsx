import React from 'react';
import CloudinaryUploader from '../../components/CloudinaryUploader';
import CloudinaryMultiple from '../../components/CloudinaryMultiple';

export default function InfoEmpresa({ data, onChange, errors }) {
  // Manejar subida de imágenes
  const handleLogoUpload = (url) => {
    onChange('logo', url);
  };
  const handleImagenesUpload = (url) => {
    onChange('imagenes', url);
  };

  return (
    <div>
      <h2 className="text-gray-600 font-medium mb-4 uppercase text-sm">Datos de la empresa</h2>
      <div className='flex w-full justify-between'>
        <div className="flex-col w-full">

          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">Nombre comercial</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 text-xs"
              placeholder="Nombre de la empresa"
              value={data.nombre || ''} // Vinculado al estado global
              onChange={(e) => onChange('nombre', e.target.value)} // Actualiza el estado global
            />
            {errors?.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">NIT / Identificación fiscal</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 text-xs"
              placeholder="Número de NIT"
              value={data.NIT || ''} // Cambiado a NIT para coincidir con el modelo
              onChange={(e) => onChange('NIT', e.target.value)} // Actualiza el estado global
            />
            {errors?.NIT && <p className="text-red-500 text-sm">{errors.NIT}</p>}
          </div>
        </div>
        <div className="w-50 h-full md:w-32 ml-4 text-center">
          <label className="block text-sm text-[#003044] mb-1 ">Logo</label>
          <CloudinaryUploader 
            onUploadSuccess={handleLogoUpload} 
            folder='empresas/logo' 
            returnFile={true} 
            initialValue={data.logo} // Pasar el logo guardado como valor inicial
          />
        </div>

      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Dirección</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 text-xs"
            placeholder="Dirección principal"
            value={data.direccion || ''} // Vinculado al estado global
            onChange={(e) => onChange('direccion', e.target.value)} // Actualiza el estado global
          />
          {errors?.direccion && <p className="text-red-500 text-sm">{errors.direccion}</p>}
        </div>
        <div>
          <label className="block text-sm text-[#003044] mb-1 ">Imagenes</label>
          <CloudinaryMultiple 
            onUploadSuccess={handleImagenesUpload} 
            folder={`empresas/${data.NIT}/`} 
            initialValues={data.imagenes || []} // Pasar las imágenes guardadas como valores iniciales
          />
        </div>
      </div>
    </div>
  );
}