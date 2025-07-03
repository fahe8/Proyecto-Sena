import React, { useRef, useState } from "react";
import camara from "../../../assets/Perfil/camara.svg";
import { empresaServicio } from "../../../services/api";

const AdminProfileHeader = ({ propietario, empresa, onLogoUpdate }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido');
      return;
    }

    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('El archivo es demasiado grande. Máximo 2MB permitido.');
      return;
    }

    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('logo', file);

      const response = await empresaServicio.actualizarLogo(empresa.NIT, formData);
      
      if (response.data.success) {
        // Llamar callback para actualizar el logo en el componente padre
        if (onLogoUpdate) {
          onLogoUpdate(response.data.data.logo);
        }
        alert('Logo actualizado correctamente');
      }
    } catch (error) {
      console.error('Error al actualizar logo:', error);
      alert('Error al actualizar el logo. Inténtalo de nuevo.');
    } finally {
      setIsUploading(false);
      // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
      event.target.value = '';
    }
  };

  return (
    <div className="bg-green-700 rounded-t-lg shadow-lg p-8 ">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div 
              className="w-15 h-15 rounded-full bg-[#003344] flex items-center justify-center shadow-xl border-3 border-white overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={handleLogoClick}
              title="Haz clic para cambiar el logo"
            >
              {empresa?.logo ? (
                <img 
                  src={empresa.logo?.url} 
                  alt="Logo de la empresa" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    // Mostrar contenido alternativo cuando la imagen no carga
                    e.target.parentNode.innerHTML = `<p class="text-2xl font-bold text-white">${empresa.nombre ? empresa.nombre[0].toLocaleUpperCase() : ''}</p>`;
                  }}
                />
              ) : (
                <p className="text-2xl font-bold text-white">
                  {empresa?.nombre ? empresa.nombre[0].toLocaleUpperCase() : ''}
                </p>
              )}
              
              {/* Overlay con efecto hover */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-full transition-opacity duration-300 flex items-center justify-center">
                <img className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" src={camara} alt="Cambiar logo" />
              </div>
              
              {/* Indicador de carga */}
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            
            {/* Input de archivo oculto */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
          </div>
          
          <div className="text-white mt-4 md:mt-0">
            <h2 className="text-2xl font-bold">
              {empresa?.nombre || 'Empresa'}
            </h2>
            <p className="text-gray-200">Representante: {propietario?.nombre && propietario?.apellido ? `${propietario.nombre} ${propietario.apellido}` : 'Propietario'}</p>
            <p className="text-gray-200">{propietario?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileHeader;